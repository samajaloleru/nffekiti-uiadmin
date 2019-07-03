<template>
	<section class="pa2 pa3-l">
		<div class="w-100 pa2 bg-light-gray br2 cf inline-flex items-center relative">
			<div class="fl bg-light-gray pa2 pb fw5 tracked ttu f7 black ">
				Documents / View 
			</div>
			<router-link :to="{name:'documents-search'}" class="fl right-1 absolute ph2 pv1 br4 bg-dark-red grow-ns pointer f6 white tc no-underline">
				Back
			</router-link>
		</div>

		<notify class="mv2" :notifications="notifications"></notify>

		<div v-if="isFound" class="pa2 bg-washed-yellow br1 cf">
			<div class="fl w-20-l w-25-m w-100 tc pa2">
				<a class="pointer link" :href="record.Filepath" target="_blank">
					<img :src="documentIcon" class="w4 br-100 bg-near-white pa1" />
				</a>

				<div class="mt3 pa2 w-100">
					<label class="db fw4 lh-copy f6 black">Document Type</label>
					<input disabled="disabled" class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Doctype">
				</div>
				
			</div>

			<div class="fl w-80-l w-75-m w-100 pa2">

				<div class="mt3 pa2 w-100">
					<label class="db fw4 lh-copy f7 black">Select Status </label>
					<select disabled="disabled" class="pa1 ba b--silver br2 bg-white  " v-model="record.Workflow">
						<option></option>
						<option>enabled</option>
						<option>disabled</option>
					</select>
				</div>

				<div class="w-100">
					<div class="fl pa2 mt3 mt0-ns w-100 w-50-ns">
						<label class="db fw4 lh-copy f6 black"> Title</label>
						<input disabled="disabled" class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Title">
					</div>

					<div class="fl pa2 mt3 mt0-ns w-100 w-50-ns">
						<label class=" fw4 lh-copy f6 black"> Owner</label>
						<input disabled="disabled" class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Owner">
					</div>
				</div>

				<div class="w-100">
					<div class="fl pa2 mt3 mt0-ns w-100">
						<label class="db fw4 lh-copy f6 black"> Description</label>
						<textarea disabled="disabled" class="pa2 ba b--silver br2 bg-white w-100 " v-model="record.Description"></textarea>
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

				<div class="fl w-100 mt3">
					<router-link :to="{name:'documents-edit',params:{id:record.ID}}" class="fr ph3 pv2 br1 bg-near-black near-white grow-ns pointer f6 tc no-underline" >
						<i class="fal fa-edit"></i> Edit
					</router-link>
				</div>
			</div>

		</div>
		<div v-else>
			<h1 class="black f6 tc ma2">Please Wait, Searching...</h1>
		</div>

	</section>
</template>

<script type="text/javascript">
  import {HTTP} from "@/common"
  import notify from "@/components/notify"
  import {checkRedirect} from "@/common"
  
  import documentIcon from "@/assets/document.png"

  export default {
	data() {return{
	  url: "/api/documents", 
	  record: {}, 
	  notifications:[], 
	  isFound:false,
	  documentIcon
	}},
	components: { notify },
	created () { 
	  this.getRecord(this.$route.params.id) 
	},
	methods: {
	  getRecord (id) {
		const app = this;
		HTTP.get(this.url+'?id='+id, {withCredentials: true}).then((response) => {
		  this.record = response.data.Body
		  this.notifications.push(response.data)
		  setTimeout(checkRedirect(response.data),1500)

		  if(response.data.Body.ID == id){
			app.isFound = true
		  }
		}).catch((e) => { console.log(e) })
	  },
	}
  }
</script>