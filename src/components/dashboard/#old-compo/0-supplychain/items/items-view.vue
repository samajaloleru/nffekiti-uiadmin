<template>
  <section class="pa2 pa3-l">
    <div class="w-100 pa2 bg-light-gray br4 cf inline-flex items-center relative">
      <div class="fl bg-light-gray pa2 pb fw5 tracked ttu f7 black ">
        Items / View 
      </div>
      <router-link :to="{name:'services-search'}" class="fl right-1 absolute ph2 pv1 br4 bg-dark-red grow-ns pointer f6 white tc no-underline">
        Go Back
      </router-link>
    </div>

    <notify class="mv2" :notifications="notifications"></notify>

    <div v-if="isFound" class="pa2 bg-light-gray br4 cf">
      
      <div class="fl w-100 pa2 black">

        <div class="w-100 fl">
          <div class="fl pa1 pa2-ns ">
            <label class="db fw4 lh-copy f7 black">Workflow: </label>
            {{record.Workflow}}
          </div>
        </div>

        <div class="fl pa1 pa2-ns w-100">
          <label class="db fw4 lh-copy f6 black"> Service:</label>
          {{record.Title}}
        </div>

        
        <div class="fl pa1 pa2-ns w-100 w-50-m w-25-l">
          <label class="db fw4 lh-copy f6 black"> Service Code:</label>
          {{record.Code}}
        </div>

        <div class="fl pa1 pa2-ns w-100 w-50-m w-25-l">
          <label class="db fw4 lh-copy f6 black"> Date:</label>
          {{record.Date}}
        </div>

        <div class="fl pa1 pa2-ns w-100 w-50-m w-25-l">
          <label class="db fw4 lh-copy f6 black"> Start Time:</label>
          {{humanTime(record.Start)}}
        </div>

        <div class="fl pa1 pa2-ns w-100 w-50-m w-25-l">
          <label class="db fw4 lh-copy f6 black"> Stop Time:</label>
          {{humanTime(record.Stop)}}
        </div>
      </div>

      <div class="fl w-100 black pa2">
        <div class="fl pa1 pa2-ns ">
          <label class="db fw4 lh-copy f7 black">Service Day: </label>
          {{record.Day}}
        </div>

        <div class="fl pa1 pa2-ns ">
          <label class="db fw4 lh-copy f7 black">Service Type: </label>
          {{record.Type}}
        </div>

        <div class="fl pa1 pa2-ns ">
          <label class="db fw4 lh-copy f7 black">Service Schedule: </label>
          {{record.Schedule}}
        </div>
      </div>

      <div class="w-100 mt3">
        <router-link :to="{name:'services-edit',params:{id:record.ID}}" class="fr ph3 pv2 br4 bg-green grow-ns pointer f6 white tc no-underline" >
          Edit
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
  import {humanTime} from "@/common"

  export default {
    data() {return{
      url: "/api/services", 
      record: {}, 
      notifications:[], 
      isFound:false,
    }},
    components: { notify },
    created () { 
      this.getRecord(this.$route.params.id) 
    },
    methods: {
      humanTime,
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