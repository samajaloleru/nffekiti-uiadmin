<template>
	<section class="pa2 pa3-l">
		<div class="w-100 pa2 bg-light-gray br4 cf inline-flex items-center relative">
			<div class="fl bg-light-gray pa2 pb fw5 tracked ttu f7 black ">
				Documents / New
			</div>
			<router-link :to="{name:'documents-search'}" class="fl right-1 absolute ph2 pv1 br4 bg-dark-red grow-ns pointer f6 white tc no-underline">
				Go Back
			</router-link>
		</div>  

		<notify class="mv2" :notifications="notifications"></notify>

		<div class="pa2 bg-light-gray br4 cf">
			<div class="fl w-20-l w-25-m w-100 tc pa2">
				<a class="pointer link" :href="record.Filepath" target="_blank">
					<img :src="documentIcon" class="w4 br-100 bg-near-white pa1" />
				</a>
				<div class="pv3">
					<input type="file" class="dn" @change="uploadDocument" ref="documentFile"/>
					<span class="pointer f6 link pv1 pr2 bg-green br2" @click="$refs['documentFile'].click()" >
						<span class="oi mr1 ph2 pv1 bg-white dark-green br2 br--left" data-glyph="cloud-upload"></span>
						Upload File
					</span>

					<div class="mt3 pa2 w-100">
						<label class="db fw4 lh-copy f6 black">Document Type</label>
						<input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Doctype">
					</div>
				</div>
			</div>

			<div class="fl w-80-l w-75-m w-100 pa2">
			
				<div class="mt3 pa2 w-100">
					<label class="db fw4 lh-copy f7 black">Select Status </label>
					<select class="pa1 ba b--silver br2 bg-white  " v-model="record.Workflow">
						<option></option>
						<option>enabled</option>
						<option>disabled</option>
					</select>
				</div>

				<div class="w-100">
					<div class="fl pa2 mt3 mt0-ns w-100 w-50-ns">
						<label class="db fw4 lh-copy f6 black"> Title</label>
						<input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Title">
					</div>

					<div class="fl pa2 mt3 mt0-ns w-100 w-50-ns">
						<label class=" fw4 lh-copy f6 black"> Owner</label>
						<label class=" fw4 lh-copy f7 red fr" @click="ownerList=[],record.Owner='',record.OwnerID=0">- clear</label>
						<input class="pa2 ba b--silver br2 bg-white w-100 " @keyup="searchOwner" type="text" v-model="record.Owner">
						<div class="relative w-100">
							<small>
							<ul class="bg-white absolute w-100 pa0 br2 br--bottom mt0 list overflow-scroll" style="max-height:6em">
								<li class="pa2 black bt b--near-white" @click="record.OwnerID = owner.ID, record.Owner=owner.Fullname, ownerList = []" v-for="(owner, index) in ownerList" :key="index">
								<span class="f7">#{{index+1}}</span> {{owner.Fullname}}
								</li>
							</ul>
							</small>
						</div>
					</div>
				</div>

				<div class="w-100">
					<div class="fl pa2 mt3 mt0-ns w-100">
						<label class="db fw4 lh-copy f6 black"> Description</label>
						<textarea class="pa2 ba b--silver br2 bg-white w-100 " v-model="record.Description"></textarea>
					</div>
				</div>

				<div class="w-100">
					<div class="fl pa2 mt3 mt0-ns w-100 w-50-l">
						<label class="db fw4 lh-copy f6 black"> Filename</label>
						<input disabled="disabled" class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Filename">
					</div>

					<div class="fl pa2 mt3 mt0-ns w-100 w-50-m w-30-l">
						<label class="db fw4 lh-copy f6 black"> Filetype</label>
						<input disabled="disabled" class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Filetype">
					</div>

					<div class="fl pa2 mt3 mt0-ns w-100 w-50-m w-20-l">
						<label class="db fw4 lh-copy f6 black"> Filesize</label>
						<input disabled="disabled" class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Filesize">
					</div>
				</div>

				<div class="dl w-100 mt3">
					<div v-if="isSave" class="fr ph3 pv2 br4 bg-green grow-ns pointer f6 white tc no-underline"  @click="save" >
						Submit
					</div>
				</div>

			</div>
		</div>
	  

	</section>
</template>

<script type="text/javascript">
	import {HTTP} from "@/common"
	import {checkRedirect} from "@/common"
	import notify from "@/components/notify"

	import {uploadDocument} from "@/common"
	import documentIcon from "@/assets/document.png"

	export default {
		data() {return{
		url: "/api/documents", 
		record: {Filepath:"",Filesize:"",Filetype:"",Filename:""}, 
		notifications:[], 
		ownerList:[],
		isSave:true,
		documentIcon
		}},
		components: { notify },
		methods: {
		searchOwner() {
			const app = this;
			const url = "/api/profiles/search";
			const search = {text: app.record.Owner, field: "Fullname", limit: 20, skip: 0};
			HTTP.post(url, search,{withCredentials: true}).then((response) => {
			app.ownerList = response.data.Body
			}).catch((e) => { console.log(e) })
		},
		uploadDocument() {
			uploadDocument(event, this)
		},
		save () {
			const app = this;
			app.isSave = false;
			HTTP.post(app.url, app.record, {withCredentials: true})
			.then((response) => {
			this.notifications.push(response.data)
			setTimeout(checkRedirect(response.data),1500)

			app.isSave = true;
			if(response.data.Body !== null){
				app.record = {Filepath:"",Filesize:"",Filetype:"",Filename:""}
			}
			}).catch((e) => {
			console.log(e)
			})
		},
		}
	}
</script>