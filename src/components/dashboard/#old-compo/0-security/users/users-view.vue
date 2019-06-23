<template>
    <section class="pa2 pa3-l">
      <div class="w-100 pa2 bg-light-gray br4 cf inline-flex items-center relative">
        <div class="fl bg-light-gray pa2 pb fw5 tracked ttu f7 black ">
          Users / View 
        </div>
        <router-link :to="{name:'users-search'}" class="fl right-1 absolute ph2 pv1 br4 bg-dark-red grow-ns pointer f6 white tc no-underline">
          Go Back
        </router-link>
      </div>


      <notify class="mv2" :notifications="notifications"></notify>

      <div v-if="isFound" class="pa2 bg-light-gray br4 cf">
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
              <label class="fw4 lh-copy f6 black">Is Member: </label>
              <input class="pa2 ba b--silver br2 bg-white " type="checkbox" disabled="disabled" v-model="record.IsMember">
            </div>
          </div>

          <div class="fl w-100">
            <div class="mt3 w-100">
              <label class=" fw4 lh-copy f6 black"> Profile</label>
              <input class="pa2 ba b--silver br2 bg-white w-100 " disabled="disabled" type="text" v-model="record.Profile">
            </div>
            
            <div class="mt3 w-100">
              <label class="db fw4 lh-copy f6 black" for="Username">Username </label>
              <input class="pa2 ba b--silver br2 bg-white w-100 " disabled="disabled" type="text" v-model="record.Username">
            </div>
          </div>

          <div class="fl w-100">
            <div class="mt3 w-100">
              <label class="db fw4 lh-copy f6 black" for="Email">Email Address</label>
              <input class="pa2 ba b--silver br2 bg-white w-100 " disabled="disabled" type="email" v-model="record.Email">
            </div>
            <div class="mt3 w-100">
              <label class="db fw4 lh-copy f6 black" for="Password">Password</label>
              <input class="pa2 ba b--silver br2 bg-white w-100 " disabled="disabled" type="Password" v-model="record.Password">
            </div>
          </div>

          <div class="fl w-100 mt3">
            <router-link :to="{name:'users-edit',params:{id:record.ID}}" class="fr ph3 pv2 br4 bg-green grow-ns pointer f6 white tc no-underline" >
              Edit
            </router-link>
          </div>

        </div>
      </div>
      <div v-else>
          <h1 class="black f6 tc ma5">Please Wait, Searching...</h1>
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