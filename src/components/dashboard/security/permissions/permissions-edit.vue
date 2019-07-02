<template>
    <section>
      <div class="w-100 pa2 bg-green fixed z-999 cf inline-flex-ns items-center-ns relative">
        <div class="fl w-100 pa1 tc tl-ns pb fw5 tracked ttu f7 white ">
          System Security / Permission / Edit
        </div>

        <div class="white pa2 br1 tc tr-ns f7 fl w-100 db dib-ns absolute-ns left-0-ns w-80-l">
          <router-link :to="{name:'permissions-view',params:{id:record.ID}}" class="ph2 br1 bg-near-white pointer f6 near-black tc no-underline">
            <i class="fas fa-chevron-left"></i> Back
          </router-link>
        </div>
      </div>

      <div class="w-100 fl h3"></div>

      <div class="pa2 fl w-100">

        <notify class="mv2" :notifications="notifications"></notify>

        <div v-if="isFound" class="pa2 bg-washed-yellow br1 cf">
          <div class="ph3 w-100 cf">
            <div class="mt3 pa2 dib">
              <label class="db fw4 lh-copy f7 black">Select Status </label>
              <select class="pa1 ba b--silver br2 bg-white  " v-model="record.Workflow">
                <option></option>
                <option>enabled</option>
                <option>disabled</option>
              </select>
            </div>

            <div class="mt3 pa2 dib">
              <label class="db fw4 lh-copy f7 black"> Method </label>
              <select class="pa1 ba b--silver br2 bg-white  " v-model="record.Method">
                <option></option>
                <option>get</option>
                <option>post</option>
              </select>
            </div>
        
            <div class="fl w-100">
              <div class="fl pa2 mt3 mt0-ns w-100 w-30-l">
                <label class="db fw4 lh-copy f6 black"> Title</label>
                <input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Title">
              </div>

              <div class="fl pa2 mt3 mt0-ns w-100 w-50-m w-20-l">
                <label class="db fw4 lh-copy f6 black"> Action</label>
                <input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Action">
              </div>

              <div class="fl pa2 mt3 mt0-ns w-100 w-50-m w-50-l">
                <label class="db fw4 lh-copy f6 black"> Url Code</label>
                <input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Code">
              </div>
            </div>

            <div class="fl w-100">
              <div class="fl pa2 mt3 mt0-ns w-100">
                <label class="db fw4 lh-copy f6 black"> Description</label>
                <input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Description">
              </div>
            </div>

            <div class="fl w-100 w-50-ns pa2 ">
              <label class=" fw4 lh-copy f6 black">Add User to Permission</label>
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
              <div class="fl pv2 w-100"></div>
              <label class="fw4 lh-copy f6 black">Permission applies to {{userPermissionList.length}} User(s):</label>
              <label class=" fw4 lh-copy f7 red fr" @click="userPermissionList=[]">- clear</label>
              <ul class="h3 w-100 tl ma0 ba b--silver br2 bg-white overflow-y-scroll f6 list mb3">
                <li class="pa2 black bt b--near-white" v-for="(user, index) in userPermissionList" :key="index">
                  <span class="f7">#{{index+1}}</span> {{user.Username}} - {{user.Email}}
                </li>
              </ul>
            </div>

            <div class="fl w-100 w-50-ns pa2 ">
              <label class=" fw4 lh-copy f6 black">Add Role to Permission</label>
              <label class=" fw4 lh-copy f7 red fr" @click="userList=[],record.Role='',record.RoleID=0">- clear</label>
              <input class="pa2 ba b--silver br2 bg-white w-100 " @keyup="searchRole" type="text" v-model="record.Role">
              <div class="relative w-100">
                <small>
                  <ul class="bg-white absolute w-100 pa0 br2 br--bottom mt0 list overflow-auto" style="max-height:8em">
                    <li class="pa2 black bt b--near-white" @click="record.RoleID = user.ID, record.Role=user.Fullname, userList = []" v-for="(user, index) in userList" :key="index">
                      <span class="f7">#{{index+1}}</span> {{user.Rolename}}
                    </li>
                  </ul>
                </small>
              </div>
              <div class="fl pv2 w-100"></div>
              <label class="fw4 lh-copy f6 black">Permission applies to {{rolePermissionList.length}} Role(s):</label>
              <label class=" fw4 lh-copy f7 red fr" @click="rolePermissionList=[]">- clear</label>
              <ul class="h3 w-100 tl ma0 ba b--silver br2 bg-white overflow-y-scroll f6 list mb3">
                <li class="pa2 black bt b--near-white" v-for="(role, index) in rolePermissionList" :key="index">
                  <span class="f7">#{{index+1}}</span> {{role.Title}}
                </li>
              </ul>
            </div>  
            

            <div class="fl w-100 mv3">
              <div class="fr ph3 pv2 br1 bg-near-black near-white grow-ns pointer f6 tc no-underline"  @click="save" >
                <i class="fas fa-check"></i> Save
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
  
  export default {
    data() {return{
      url: "/api/permissions", 
      record: {}, 
      notifications:[], 
      roleList:[], rolePermissionList:[],
      userList:[], userPermissionList:[],
      isFound:false,
      isSave:true
    }},
    components: { notify },
    created () { 
      this.getRecord(this.$route.params.id) 
    },
    methods: {
      searchUser() {
        const app = this;
        const url = "/api/users/search";
        const search = {text: app.record.Role, field: "Username", limit: 20, skip: 0};
        HTTP.post(url, search,{withCredentials: true}).then((response) => {
          app.userList = response.data.Body
        }).catch((e) => { console.log(e) })
      },
      searchRole() {
        const app = this;
        const url = "/api/roles/search";
        const search = {text: app.record.Role, field: "Title", limit: 20, skip: 0};
        HTTP.post(url, search,{withCredentials: true}).then((response) => {
          app.roleList = response.data.Body
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
              app.$router.push({name:"permissions-view",params:{id:response.data.Body}})
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