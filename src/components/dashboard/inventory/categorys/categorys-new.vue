<template>
		<section class="pa2 pa3-l">
			<div class="w-100 pa2 bg-light-gray br4 cf inline-flex items-center relative">
				<div class="fl bg-light-gray pa2 pb fw5 tracked ttu f7 black ">
					Categorys / New
				</div>
				<router-link :to="{name:'categorys-search'}" class="fl right-1 absolute ph2 pv1 br4 bg-dark-red grow-ns pointer f6 white tc no-underline">
					Go Back
				</router-link>
			</div>  

			<notify class="mv2" :notifications="notifications"></notify>

			<div class="pa2 bg-light-gray br4 cf w-100">
				
					
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
						<label class="db fw4 lh-copy f6 black"> Code</label>
						<input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Code">
					</div>
					<div class="fl pa2 mt3 mt0-ns w-100 w-50-ns">
						<label class="db fw4 lh-copy f6 black"> Title</label>
						<input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Title">
					</div>
				</div>


				<div class="w-100">
					<div class="fl pa2 mt3 mt0-ns w-100 w-50-ns">
						<label class=" fw4 lh-copy f6 black">Parent Category</label>
						<label class=" fw4 lh-copy f7 red fr" @click="profileList=[],record.Category='',record.CategoryID=0">- clear</label>
						<input class="pa2 ba b--silver br2 bg-white w-100 " @keyup="searchCategory" type="text" v-model="record.Category">
						<div class="relative w-100">
							<small>
								<ul class="bg-white absolute w-100 pa0 br2 br--bottom mt0 list overflow-scroll" style="max-height:6em">
									<li class="pa2 black bt b--near-white" @click="record.CategoryID = category.ID, record.Category=category.Title, categoryList = []" v-for="(category, index) in categoryList" :key="index">
										<span class="f7">#{{index+1}}</span> {{category.Title}}
									</li>
								</ul>
							</small>
						</div>
					</div>

					<div class="fl pa2 mt3 mt0-ns w-100 w-50-ns">
						<label class=" fw4 lh-copy f6 black"> Profile</label>
						<label class=" fw4 lh-copy f7 red fr" @click="profileList=[],record.Profile='',record.ProfileID=0">- clear</label>
						<input class="pa2 ba b--silver br2 bg-white w-100 " @keyup="searchProfile" type="text" v-model="record.Profile">
						<div class="relative w-100">
							<small>
								<ul class="bg-white absolute w-100 pa0 br2 br--bottom mt0 list overflow-scroll" style="max-height:6em">
									<li class="pa2 black bt b--near-white" @click="record.ProfileID = partner.ID, record.Profile=partner.Fullname, profileList = []" v-for="(partner, index) in profileList" :key="index">
										<span class="f7">#{{index+1}}</span> {{partner.Fullname}}
									</li>
								</ul>
							</small>
						</div>
					</div>
				</div>
		
				<div class="fl pa2 mt3 mt0-ns w-100">
					<label class="db fw4 lh-copy f6 black"> Description</label>
					<textarea class="pa2 ba b--silver br2 bg-white w-100" v-model="record.Description"></textarea>
				</div>


				<div class="fl w-100 mt3">
					<div v-if="isSave" class="fr ph3 pv2 br4 bg-green grow-ns pointer f6 white tc no-underline"  @click="save" >
						Submit
					</div>
				</div>
					
			</div>

		</section>
</template>

<script type="text/javascript">
	import {HTTP} from "@/common"
	import {checkRedirect} from "@/common"
	import notify from "@/components/notify"
	
	export default {
		data() {return{
			url: "/api/categorys", 
			record: {}, 
			notifications:[], 
			categoryList:[],
			profileList:[],
			isSave:true,
		}},
		components: { notify },
		methods: {
			searchCategory() {
				const app = this;
				const url = "/api/categorys/search";
				const search = {text: app.record.Category, field: "Title", limit: 20, skip: 0};
				HTTP.post(url, search,{withCredentials: true}).then((response) => {
					app["profileCategory"] = response.data.Body
				}).catch((e) => { console.log(e) })
			},
			searchProfile() {
				const app = this;
				const url = "/api/profiles/search";
				const search = {text: app.record.Category, field: "Fullname", limit: 20, skip: 0};
				HTTP.post(url, search,{withCredentials: true}).then((response) => {
					app["profileList"] = response.data.Body
				}).catch((e) => { console.log(e) })
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
						app.record = {}
					}
				}).catch((e) => {
					console.log(e)
				})
			},
		}
	}
</script>