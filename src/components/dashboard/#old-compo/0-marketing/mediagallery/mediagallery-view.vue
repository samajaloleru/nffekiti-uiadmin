<template>
    <section class="pa2 pa3-l">
      <div class="w-100 pa2 bg-light-gray br4 cf inline-flex items-center relative">
        <div class="fl bg-light-gray pa2 pb fw5 tracked ttu f7 black ">
          Media Gallery / View 
        </div>
        <router-link :to="{name:'printers-search'}" class="fl right-1 absolute ph2 pv1 br4 bg-dark-red grow-ns pointer f6 white tc no-underline">
          Go Back
        </router-link>
      </div>


      <notify class="mv2" :notifications="notifications"></notify>

      <div v-if="isFound" class="pa2 bg-light-gray br4 cf">
        
        <div class="fl w-100 ">
          
          <div class="w-100 black">
            <div class="fl w-100">
              <div class="fl pa1 pa2-ns">
                <label class="fw4 lh-copy f7 fl w-100">Status: </label>
                {{record.Workflow}}
              </div>

              <div class="fl pa1 pa2-ns">
                <label class="fw4 lh-copy f7 fl w-100">Printer Type: </label>
                {{record.Type}}
              </div>
            </div>

            <div class="fl pa1 pa2-ns w-100 w-50-m w-50-l">
              <label class="fw4 lh-copy f7 fl w-100"> Printer Name:</label>
              {{record.Title}}
            </div>

            <div class="fl pa1 pa2-ns w-50 w-25-m w-25-l">
              <label class="fw4 lh-copy f7 fl w-100"> Port:</label>
              {{record.Port}}
            </div>

            <div class="fl pa1 pa2-ns w-50 w-25-m w-25-l">
              <label class="fw4 lh-copy f7 fl w-100"> Address:</label>
              {{record.Address}}
            </div>

            <div class="fl pa1 pa2-ns w-100 w-third-m w-third-l">
              <label class="fw4 lh-copy f7 fl w-100"> User</label>
              {{record.User}}
            </div>

            <div class="fl pa1 pa2-ns w-100 w-third-m w-third-l">
              <label class="fw4 lh-copy f7 fl w-100"> Unit</label>
              {{record.Unit}}
            </div>

            <div class="fl pa1 pa2-ns w-100 w-third-m w-third-l">
              <label class="fw4 lh-copy f7 fl w-100"> Wing</label>
              {{record.Wing}}
            </div>

            <div class="fl pa1 pa2-ns w-100">
              <label class="db fw4 lh-copy f7 black"> Description</label>
              {{record.Description}}
            </div>

          </div>
            
          <div class="w-100 mt3">
              <router-link :to="{name:'printers-edit',params:{id:record.ID}}" class="fr ph3 pv2 br4 bg-green grow-ns pointer f6 white tc no-underline" >
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

  export default {
    data() {return{
      url: "/api/printers", 
      record: {}, 
      notifications:[], 
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