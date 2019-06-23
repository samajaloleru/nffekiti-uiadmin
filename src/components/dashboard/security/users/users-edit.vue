<template>
		<section class="pa2 pa3-l">
			<div class="w-100 pa2 bg-light-gray br4 cf inline-flex items-center relative">
				<div class="fl bg-light-gray pa2 pb fw5 tracked ttu f7 black ">
					User / Edit
				</div>
				<router-link :to="{name:'users-view',params:{id:record.ID}}" class="fl right-1 absolute ph2 pv1 br4 bg-red hover-bg-dark-red grow-ns pointer f6 white tc no-underline">
					Go Back
				</router-link>
			</div>


			<notify class="mv2" :notifications="notifications"></notify>

			<div v-if="isFound" class="pa2 bg-light-gray br4 cf">
				<div class="fl w-20-l w-25-m w-100 tc pa2">
					<input type="file" class="dn" @change="uploadImageDisplay('Image')" ref="userImage"/>
					<img :src="record.Image" @error="record.Image = userIcon" class="w4 br-100 bg-near-white pa1" @click="uploadImage('userImage')" />
				</div>

				<div class="fl w-80-l w-75-m w-100 pa2">

					<div class="fl mt3 mt0-l w-100 pa1">
						<label class="db fw4 lh-copy f7 black">Select Status </label>
						<select class="pa1 ba b--silver br2 bg-white  " v-model="record.Workflow">
							<option></option>
							<option>enabled</option>
							<option>disabled</option>
						</select>
					</div>

					<div class="fl w-100">
						<div class="fl mt3 w-20">
							<label class="fw4 lh-copy f6 black">Is Admin: </label>
							<input class="pa2 ba b--silver br2 bg-white " type="checkbox" disabled="disabled" v-model="record.IsAdmin">
						</div>
						<div class="fl mt3 w-20">
							<label class="fw4 lh-copy f6 black">Is Support: </label>
							<input class="pa2 ba b--silver br2 bg-white " type="checkbox" disabled="disabled" v-model="record.IsSupport">
						</div>
						<div class="fl mt3 w-20">
							<label class="fw4 lh-copy f6 black">Is Staff: </label>
							<input class="pa2 ba b--silver br2 bg-white " type="checkbox" disabled="disabled" v-model="record.IsStaff">
						</div>
						<div class="fl mt3 w-20">
							<label class="fw4 lh-copy f6 black">Is Partner: </label>
							<input class="pa2 ba b--silver br2 bg-white " type="checkbox" disabled="disabled" v-model="record.IsPartner">
						</div>
						<div class="fl mt3 w-20">
							<label class="fw4 lh-copy f6 black">Is Customer: </label>
							<input class="pa2 ba b--silver br2 bg-white " type="checkbox" disabled="disabled" v-model="record.IsCustomer">
						</div>
					</div>

					<div class="fl w-100">
						<div class="mt3 w-100">
							<label class=" fw4 lh-copy f6 black"> Profile</label>
							<label class=" fw4 lh-copy f7 red fr" @click="profileList=[],record.Profile='',record.ProfileID=0">- clear</label>
							<input class="pa2 ba b--silver br2 bg-white w-100 " @keyup="searchProfile" type="text" v-model="record.Profile">
							<div class="relative w-100">
								<small>
									<ul class="bg-white absolute w-100 pa0 br2 br--bottom mt0 list overflow-scroll" style="max-height:6em">
										<li class="pa2 black bt b--near-white" @click="record.ProfileID = profile.ID, record.Profile=profile.Fullname, profileList = []" v-for="(profile, index) in profileList" :key="index">
											<span class="f7">#{{index+1}}</span> {{profile.Fullname}}
										</li>
									</ul>
								</small>
							</div>
						</div>
						
						<div class="mt3 w-100">
							<label class="db fw4 lh-copy f6 black" for="Username">Username </label>
							<input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Username">
						</div>
					</div>

					<div class="fl w-100">
						<div class="mt3 w-100">
							<label class="db fw4 lh-copy f6 black" for="Email">Email Address</label>
							<input class="pa2 ba b--silver br2 bg-white w-100 " type="email" v-model="record.Email">
						</div>
						<div class="mt3 w-100">
							<label class="db fw4 lh-copy f6 black" for="Password">Password</label>
							<input class="pa2 ba b--silver br2 bg-white w-100 " type="Password" v-model="record.Password">
						</div>
					</div>

					

					<div class="fl w-100 mt3">
						<div class="fr ph3 pv2 br4 bg-green grow-ns pointer f6 white tc no-underline"  @click="save" >
							Save
						</div>
					</div>
				</div>
			</div>
			<div v-else>
				<p class="black f6 tc ma5">Please Wait, Searching...</p>
			</div>

		</section>
</template>

<script type="text/javascript">
	import {HTTP} from "@/common"
	import {displayImage} from "@/common"
	import {checkRedirect} from "@/common"
	import notify from "@/components/notify"
	import userIcon from "@/assets/user.png"

	export default {
		data() {return{
			url: "/api/users", 
			record: {}, 
			notifications:[], 
			profileList:[],
			isFound:false,
			isSave:true,
			userIcon
		}},
		components: { notify },
		created () { 
			this.getRecord(this.$route.params.id) 
		},
		methods: {
			searchProfile() {
				const app = this;
				const url = "/api/profiles/search";
				const search = {text: app.record.Profile, field: "Title", limit: 20, skip: 0};
				HTTP.post(url, search,{withCredentials: true}).then((response) => {
					app.profileList = response.data.Body
				}).catch((e) => { console.log(e) })
			},
			uploadImageDisplay(field) {
				displayImage(event, this, field)
			},
			uploadImage(imageRef) {
				this.$refs[imageRef].click()
			},
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
			save () {
				const app = this;
				app.isSave = false;
				HTTP.post(app.url, app.record, {withCredentials: true})
				.then((response) => {
					this.notifications.push(response.data)
					setTimeout(checkRedirect(response.data),1500)

					if(response.data.Body !== null){
						setTimeout(function(){
							app.$router.push({name:"users-view",params:{id:response.data.Body}})
						},1000)
					} else {
						app.isSave = true;
					}
				}).catch((e) => {
					console.log(e)
				})
			},
		}
	}
</script>