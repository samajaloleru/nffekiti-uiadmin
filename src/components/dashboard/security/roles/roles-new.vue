<template>
    <section>
      <div class="w-100 pa2 bg-green fixed z-999 cf inline-flex-ns items-center-ns relative">
        <div class="fl w-100 pa1 tc tl-ns pb fw5 tracked ttu f7 white ">
          System Security / Roles / New
        </div>

        <div class="white pa2 br1 tc tr-ns f7 fl w-100 db dib-ns absolute-ns left-0-ns w-80-l">
          <router-link :to="{'name':'roles-search'}" class="ph2 br1 bg-near-white pointer f6 near-black tc no-underline">
            <i class="fal fa-chevron-left"></i> Back
          </router-link>
        </div>
      </div>
      
      <div class="w-100 fl h3"></div>

      <div class="pa2 fl w-100">

        <notify class="mv2" :notifications="notifications"></notify>

        <div class="pa2 bg-washed-yellow br2 cf">
          <div class="ph3 w-100 cf">
            <div class="w-100">
              <div class="mt3 pa2">
                <label class="db fw4 lh-copy f7 black">Select Status </label>
                <select class="pa1 ba b--silver br2 bg-white  " v-model="record.Workflow">
                  <option></option>
                  <option>enabled</option>
                  <option>disabled</option>
                </select>
              </div>
              <div class="fl pa2 mt3 mt0-ns w-100 w-50-ns">
                <label class="db fw4 lh-copy f6 black"> Title</label>
                <input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Title">
              </div>
              <div class="fl pa2 mt3 mt0-ns w-100 w-50-ns">
                <label class="db fw4 lh-copy f6 black"> Description</label>
                <input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Description">
              </div>
            </div>

            <div class="fl w-100 w-50-ns pa2 ">
              <label class=" fw4 lh-copy f6 black">Add User to Role</label>
              <label class=" fw4 lh-copy f7 red fr" @click="userList=[],record.User='',record.UserID=0">- clear</label>
              <input class="pa2 ba b--silver br2 bg-white w-100 " @keyup="searchUser" type="text" v-model="record.User">
              <div class="relative w-100">
                <small>
                  <ul class="bg-white absolute w-100 pa0 br2 br--bottom mt0 list overflow-auto" style="max-height:8em">
                    <li class="pa2 black bt b--near-white" @click="record.UserID = user.ID, record.User=user.Fullname, userList = []" v-for="(user, index) in userList" :key="index">
                      <span class="f7">#{{index+1}}</span> {{user.Username}}
                    </li>
                  </ul>
                </small>
              </div>
            </div>

            <div class="fl w-100 w-50-ns pa2 "> 
              <label class="fw4 lh-copy f6 black"> {{roleuserList.length}} User(s):</label>
              <label class=" fw4 lh-copy f7 red fr" @click="userList=[]">- clear</label>
              <ul class="h3 w-100 tl ma0 ba b--silver br2 bg-white overflow-y-scroll f6 list mb3">
                <li class="pa2 black bt b--near-white" v-for="(roleuser, index) in roleuserList" :key="index">
                  <span class="f7">#{{index+1}}</span> {{roleuser.Username}} - {{roleuser.Email}}
                </li>
              </ul>
            </div>

            <div class="fl w-100 mv3">
              <div v-if="isSave" class="fr ph3 pv2 br1 bg-near-black near-white grow-ns pointer f6 tc no-underline"  @click="save" >
                <i class="fal fa-save"></i> Submit
              </div>
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
  
  export default {
    data() {return{
      url: "/api/roles", 
      record: {}, 
      notifications:[], 
      roleuserList:[],
      userList:[],
      isSave:true,
    }},
    components: { notify },
    methods: {
      searchUser() {
        const app = this;
        const url = "/api/users/search";
        const search = {text: app.record.Role, field: "Username", limit: 20, skip: 0};
        HTTP.post(url, search,{withCredentials: true}).then((response) => {
          app.userList = response.data.Body
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
          if(response.data.Body !== null && response.data.Body !== undefined ){
            app.record = {}
          }
        }).catch((e) => {
          console.log(e)
        })
      },
    }
  }
</script>