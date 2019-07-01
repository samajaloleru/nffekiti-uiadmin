<template>
    <section class="pa2 pa3-l">
      <div class="w-100 pa2 bg-light-gray br2 cf inline-flex items-center relative">
        <div class="fl bg-light-gray pa2 pb fw5 tracked ttu f7 black ">
          Permissions / View 
        </div>
        <router-link :to="{name:'permissions-search'}" class="fl right-1 absolute ph2 pv1 br4 bg-dark-red grow-ns pointer f6 white tc no-underline">
          Back
        </router-link>
      </div>


      <notify class="mv2" :notifications="notifications"></notify>

      <div v-if="isFound" class="pa2 bg-light-gray br2 black cf">
        
        <div class="mt3 pa2 dib">
          <label class="db fw4 lh-copy f7 black">Workflow </label>
          <div class="pa2 ba b--silver br2 bg-white w-100 ">{{record.Workflow}}&nbsp;</div>
        </div>

        <div class="mt3 pa2 dib">
          <label class="db fw4 lh-copy f7 black"> Method </label>
          <div class="pa2 ba b--silver br2 bg-white w-100 ">{{record.Method}}&nbsp;</div>
        </div>

        <div class="fl w-100">
          <div class="fl pa2 mt3 mt0-ns w-100 w-30-l">
            <label class="db fw4 lh-copy f6 black"> Title</label>
            <div class="pa2 ba b--silver br2 bg-white w-100 ">{{record.Title}}&nbsp;</div>
          </div>

          <div class="fl pa2 mt3 mt0-ns w-100 w-50-m w-20-l">
            <label class="db fw4 lh-copy f6 black"> Action</label>
            <div class="pa2 ba b--silver br2 bg-white w-100 ">{{record.Action}}&nbsp;</div>
          </div>

          <div class="fl pa2 mt3 mt0-ns w-100 w-50-m w-50-l">
            <label class="db fw4 lh-copy f6 black"> Url Code</label>
            <div class="pa2 ba b--silver br2 bg-white w-100 ">{{record.Code}}&nbsp;</div>
          </div>
        </div>

        <div class="fl w-100">
          <div class="fl pa2 mt3 mt0-ns w-100">
            <label class="db fw4 lh-copy f6 black"> Description</label>
            <div class="pa2 ba b--silver br2 bg-white w-100 ">{{record.Description}}&nbsp;</div>
          </div>
        </div>

        <div class="fl w-100 w-50-ns pa2 ">
          <div class="fl pv2 w-100"></div>
          <label class="fw4 lh-copy f6 black">Permission applies to {{userPermissionList.length}} User(s):</label>
          <label class=" fw4 lh-copy f7 red fr" @click="userPermissionList=[]">- clear</label>
          <ul class="h5 w-100 tl ma0 ba b--silver br2 bg-white overflow-y-scroll f6 list mb3">
            <li class="pa2 black bt b--near-white" v-for="(user, index) in userPermissionList" :key="index">
              <span class="f7">#{{index+1}}</span> {{user.Username}} - {{user.Email}}
            </li>
          </ul>
        </div>

        <div class="fl w-100 w-50-ns pa2 ">
          <div class="fl pv2 w-100"></div>
          <label class="fw4 lh-copy f6 black">Permission applies to {{rolePermissionList.length}} Role(s):</label>
          <label class=" fw4 lh-copy f7 red fr" @click="rolePermissionList=[]">- clear</label>
          <ul class="h5 w-100 tl ma0 ba b--silver br2 bg-white overflow-y-scroll f6 list mb3">
            <li class="pa2 black bt b--near-white" v-for="(role, index) in rolePermissionList" :key="index">
              <span class="f7">#{{index+1}}</span> {{role.Title}}
            </li>
          </ul>
        </div>

        <div class="fl w-100 mt3">
          <router-link :to="{name:'permissions-edit',params:{id:record.ID}}" class="fr ph3 pv2 br1 bg-near-black near-white grow-ns pointer f6 tc no-underline" >
            <i class="fas fa-edit"></i> Edit
          </router-link>
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
  
  export default {
    data() {return{
      url: "/api/permissions", 
      record: {}, 
      notifications:[], 
      rolePermissionList:[],
      userPermissionList:[],
      isFound:false
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