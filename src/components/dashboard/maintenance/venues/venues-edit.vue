<template>
    <section>
        <div class="w-100 pa2 bg-green fixed z-999 cf inline-flex-ns items-center-ns relative">
            <div class="fl w-100 pa1 tc tl-ns pb fw5 tracked ttu f7 white ">
                Maintenance / Venue Setup / Edit
            </div>

            <div class="white pa2 br1 tc tr-ns f7 fl w-100 db dib-ns absolute-ns left-0-ns w-80-l">
                <router-link :to="{name:'venues-view',params:{id:record.ID}}" class="ph2 br1 bg-near-white pointer f6 near-black tc no-underline">
                    <i class="fal fa-chevron-left"></i> Back
                </router-link>
            </div>
        </div>

        <div class="w-100 fl h3"></div>

        <div class="pa2 fl w-100">

            <notify class="mv2" :notifications="notifications"></notify>

            <div v-if="isFound" class="pa2 bg-washed-yellow br1 cf">
                <div class="fl w-20-l w-25-m w-100 tc pa2">
                    <input type="file" class="dn" @change="uploadImageDisplay('Image')" ref="venueImage"/>
                    <img :src="record.Image" @error="record.Image = venueIcon" class="w4 br-100 bg-near-white pa1" @click="uploadImage('venueImage')" />
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

                    <div class="fl w-100 ph1">
                        <div class="fl mt3 tr w-third w-20-l">
                            <label class="fw4 lh-copy f6 black">Is Fan: </label>
                            <input class="pa2 ba b--silver br2 bg-white " type="checkbox" v-model="record.IsFan">
                        </div>

                        <div class="fl mt3 tr w-third w-20-l">
                            <label class="fw4 lh-copy f6 black">Is Club: </label>
                            <input class="pa2 ba b--silver br2 bg-white " type="checkbox" v-model="record.IsClub">
                        </div>
                        <div class="fl mt3 tr w-third w-20-l">
                            <label class="fw4 lh-copy f6 black">Is Player: </label>
                            <input class="pa2 ba b--silver br2 bg-white " type="checkbox" v-model="record.IsPlayer">
                        </div>
                        <div class="fl mt3 tr w-third w-20-l">
                            <label class="fw4 lh-copy f6 black">Is Official: </label>
                            <input class="pa2 ba b--silver br2 bg-white " type="checkbox" v-model="record.IsOfficial">
                        </div>
                        
                        <div class="fl mt3 tr w-two-thirds w-20-l">
                            <label class="fw4 lh-copy f6 black">Is Club Official: </label>
                            <input class="pa2 ba b--silver br2 bg-white " type="checkbox" v-model="record.IsClubOfficial">
                        </div>
                    </div>

                    <div class="fl w-100">
                        <div class="fl ph1 mt3 w-100 w-50-l">
                            <label class=" fw4 lh-copy f6 black"> Profile</label>
                            <label class=" fw4 lh-copy f7 red fr" @click="profileList=[],record.Profile='',record.ProfileID=0">- clear</label>
                            <input class="pa2 ba b--silver br2 bg-white w-100 " @keyup="searchProfile" type="text" v-model="record.Profile">
                            <div class="relative w-100">
                                <small>
                                    <ul class="bg-white absolute w-100 pa0 br2 br--bottom mt0 list overflow-scroll-auto" style="max-height:6em">
                                        <li class="pa2 black bt b--near-white" @click="record.ProfileID = profile.ID, record.Profile=profile.Fullname, profileList = []" v-for="(profile, index) in profileList" :key="index">
                                            <span class="f7">#{{index+1}}</span> {{profile.Fullname}}
                                        </li>
                                    </ul>
                                </small>
                            </div>
                        </div>
                        
                        <div class="fl ph1 mt3 w-100 w-50-l">
                            <label class="db fw4 lh-copy f6 black" for="Email">Email Address</label>
                            <input class="pa2 ba b--silver br2 bg-white w-100 " type="email" v-model="record.Email">
                        </div>
                        
                    </div>

                    <div class="fl w-100">
                        <div class="fl ph1 mt3 w-100 w-50-ns">
                            <label class="db fw4 lh-copy f6 black" for="Venuename">Venuename </label>
                            <input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Venuename">
                        </div>
                        <div class="fl ph1 mt3 w-100 w-50-ns">
                            <label class="db fw4 lh-copy f6 black" for="Password">Password</label>
                            <input class="pa2 ba b--silver br2 bg-white w-100 " type="Password" v-model="record.Password">
                        </div>
                    </div>

                    

                    <div class="fl w-100 mt3">
                        <div class="fr ph3 pv2 br1 bg-near-black near-white grow-ns pointer f6 tc no-underline"  @click="save" >
                            <i class="fal fa-check"></i> Save
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <p class="black f6 tc ma5">Please Wait, Searching...</p>
            </div>
        </div>

    </section>
</template>

<script type="text/javascript">
	import {HTTP} from "@/common"
	import {displayImage} from "@/common"
	import {checkRedirect} from "@/common"
	import notify from "@/components/notify"
	import venueIcon from "@/assets/user.png"

	export default {
		data() {return{
			url: "/api/venues", 
			record: {}, 
			notifications:[], 
			profileList:[],
			isFound:false,
			isSave:true,
			venueIcon
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

					if(response.data.Body !== null && response.data.Body !== undefined ){
						setTimeout(function(){
							app.$router.push({name:"venues-view",params:{id:response.data.Body}})
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