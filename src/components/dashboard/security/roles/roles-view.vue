<template>
    <section>
      <div class="w-100 pa2 bg-green fixed z-999 cf inline-flex-ns items-center-ns relative">
          <div class="fl w-100 pa1 tc tl-ns pb fw5 tracked ttu f7 white ">
              System Security / Roles / View
          </div>

          <div class="white pa2 br1 tc tr-ns f7 fl w-100 db dib-ns absolute-ns left-0-ns w-80-l">
              <router-link :to="{'name':'roles-search'}" class="ph2 br1 bg-near-white pointer f6 near-black tc no-underline">
                  <i class="fas fa-chevron-left"></i> Back
              </router-link>
          </div>
      </div>

      <div class="w-100 fl h3"></div>

      <div class="pa2 fl w-100">

        <notify class="mv2" :notifications="notifications"></notify>

        <div v-if="isFound" class="pa2 bg-washed-yellow br1 cf">
          <div class="mt3 pa2 dib">
            <label class="db fw4 lh-copy f7 black">Workflow </label>
            <div class="pa2 ba b--silver br2 bg-white w-100 ">{{record.Workflow}}&nbsp;</div>
          </div>
            
          <div class="fl w-100">
            <div class="fl pa2 mt3 mt0-ns w-100 w-50-ns">
              <label class="db fw4 lh-copy f6 black"> Title</label>
              <div class="pa2 ba b--silver br2 bg-white w-100 ">{{record.Title}}&nbsp;</div>
            </div>

            <div class="fl pa2 mt3 mt0-ns w-100 w-50-ns">
              <label class="db fw4 lh-copy f6 black"> Description</label>
              <div class="pa2 ba b--silver br2 bg-white w-100 ">{{record.Description}}&nbsp;</div>
            </div>
          </div>

          <div class="fl w-100 w-50-ns pa2 ">
            <label class="fw4 lh-copy f6 black"> {{roleuserList.length}} User(s):</label>
            <ul class="h5 w-100 tl ma0 ba b--silver br2 bg-white overflow-y-scroll f6 list mb3">
              <li class="pa2 black bt b--near-white" v-for="(roleuser, index) in roleuserList" :key="index">
                <span class="f7">#{{index+1}}</span> {{roleuser.Username}} - {{roleuser.Email}}
              </li>
            </ul>
          </div>

          <div class="w-100 mt3">
            <router-link :to="{name:'roles-edit',params:{id:record.ID}}" class="fr ph3 pv2 br1 bg-near-black near-white grow-ns pointer f6 tc no-underline" >
              <i class="fas fa-edit"></i> Edit
            </router-link>
          </div>
        </div>
        <div v-else>
          <h1 class="black f6 tc ma5">Please Wait, Searching...</h1>
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
      isFound:false,
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