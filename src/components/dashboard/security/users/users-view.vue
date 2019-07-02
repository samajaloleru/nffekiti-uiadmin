<template>
	<section>

        <div class="w-100 pa2 bg-green fixed z-999 cf inline-flex-ns items-center-ns relative">
            <div class="fl w-100 pa1 tc tl-ns pb fw5 tracked ttu f7 white ">
                System Security / Users / View
            </div>

            <div class="white pa2 br1 tc tr-ns f7 fl w-100 db dib-ns absolute-ns left-0-ns w-80-l">
                <router-link :to="{'name':'users-search'}" class="ph2 br1 bg-near-white pointer f6 near-black tc no-underline">
                    <i class="fas fa-chevron-left"></i> Back
                </router-link>
            </div>
        </div>

        <div class="w-100 fl h3"></div>

        <div class="pa2 fl w-100">

            <notify class="mv2" :notifications="notifications"></notify>

            <div v-if="isFound" class="pa2 bg-washed-yellow br1 cf">
                <div class="fl w-20-l w-25-m w-100 tc pa2">
                <img :src="record.Image" @error="record.Image = userIcon" class="w4 br-100 bg-near-white pa1"/>
                </div>

                <div class="fl w-80-l w-75-m w-100 pa2 pl4-l">
                
                <div class="fl mt3 mt0-l w-100 pa1">
                    <label class="db fw4 lh-copy f7 black">Select Status </label>
                    <select disabled="disabled" class="pa1 ba b--silver br2 bg-white  " v-model="record.Workflow">
                    <option></option>
                    <option>enabled</option>
                    <option>disabled</option>
                    </select>
                </div>

                
                <div class="fl w-100 ph1">
                    <div class="fl mt3 tr w-third w-20-l">
                        <label class="fw4 lh-copy f6 black">Is Fan: </label>
                        <input class="pa2 ba b--silver br2 bg-white " type="checkbox" disabled="disabled" v-model="record.IsFan">
                    </div>

                    <div class="fl mt3 tr w-third w-20-l">
                        <label class="fw4 lh-copy f6 black">Is Club: </label>
                        <input class="pa2 ba b--silver br2 bg-white " type="checkbox" disabled="disabled" v-model="record.IsClub">
                    </div>
                    <div class="fl mt3 tr w-third w-20-l">
                        <label class="fw4 lh-copy f6 black">Is Player: </label>
                        <input class="pa2 ba b--silver br2 bg-white " type="checkbox" disabled="disabled" v-model="record.IsPlayer">
                    </div>
                    <div class="fl mt3 tr w-third w-20-l">
                        <label class="fw4 lh-copy f6 black">Is Official: </label>
                        <input class="pa2 ba b--silver br2 bg-white " type="checkbox" disabled="disabled" v-model="record.IsOfficial">
                    </div>
                    
                    <div class="fl mt3 tr w-two-thirds w-20-l">
                        <label class="fw4 lh-copy f6 black">Is Club Official: </label>
                        <input class="pa2 ba b--silver br2 bg-white " type="checkbox" disabled="disabled" v-model="record.IsClubOfficial">
                    </div>
                </div>

                <div class="fl w-100">
                    <div class="fl ph1 mt3 w-100 w-50-l">
                        <label class=" fw4 lh-copy f6 black"> Profile</label>
                        <input class="pa2 ba b--silver br2 bg-white w-100 " disabled="disabled" type="text" v-model="record.Profile">
                    </div>
                    <div class="fl ph1 mt3 w-100 w-50-l">
                        <label class="db fw4 lh-copy f6 black" for="Email">Email Address</label>
                        <input class="pa2 ba b--silver br2 bg-white w-100 " disabled="disabled" type="email" v-model="record.Email">
                    </div>
                </div>

                <div class="fl w-100">
                    <div class="fl ph1 mt3 w-100 w-50-ns">
                        <label class="db fw4 lh-copy f6 black" for="Username">Username </label>
                        <input class="pa2 ba b--silver br2 bg-white w-100 " disabled="disabled" type="text" v-model="record.Username">
                    </div>

                    <div class="fl ph1 mt3 w-100 w-50-ns">
                        <label class="db fw4 lh-copy f6 black" for="Password">Password</label>
                        <input class="pa2 ba b--silver br2 bg-white w-100 " disabled="disabled" type="Password" v-model="record.Password">
                    </div>
                </div>

                <div class="fl w-100 mt3">
                    <router-link :to="{name:'users-edit',params:{id:record.ID}}" class="fr ph3 pv2 br1 bg-near-black near-white grow-ns pointer f6 tc no-underline" >
                    <i class="fas fa-edit"></i> Edit
                    </router-link>
                </div>

                </div>
            </div>
            <div v-else>
                <h1 class="black f6 tc ma2">Please Wait, Searching...</h1>
            </div>
        </div>

	</section>
</template>

<script type="text/javascript">
  import {HTTP} from "@/common"
  import {checkRedirect} from "@/common"
  import notify from "@/components/notify"
  import userIcon from "@/assets/user.png"

  export default {
	data() {return{
	  url: "/api/users", 
	  record: {}, 
	  notifications:[], 
	  isFound:false,
	  userIcon
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