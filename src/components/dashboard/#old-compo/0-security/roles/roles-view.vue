<template>
    <section class="pa2 pa3-l">
      <div class="w-100 pa2 bg-light-gray br4 cf inline-flex items-center relative">
        <div class="fl bg-light-gray pa2 pb fw5 tracked ttu f7 black ">
          Roles / View 
        </div>
        <router-link :to="{name:'roles-search'}" class="fl right-1 absolute ph2 pv1 br4 bg-dark-red grow-ns pointer f6 white tc no-underline">
          Go Back
        </router-link>
      </div>


      <notify class="mv2" :notifications="notifications"></notify>

      <div v-if="isFound" class="pa2 bg-light-gray br4 cf">
        <div class="fl w-80-l w-75-m w-100 pa2 pl4-l">
          <form action="sign-up_submit" method="get" accept-charset="utf-8"  >
            <div class="mt3 w-100 tl">
              <label class="fw4 lh-copy f7 f6-l black"> Title:</label>
              <span class="br2 f5 f3-l black">{{record.Title}}</span>
            </div>
              
            <div class="mt3 w-100 tl">
              <label class="fw4 lh-copy f7 f6-l black">Rolename:</label>
              <span class="br2 f5 f3-l black">{{record.Rolename}}</span>
            </div>

            <div class="mt3 w-100 tl">
              <label class="fw4 lh-copy f7 f6-l black">Email Address:</label>
              <span class="br2 f5 f3-l black">{{record.Email}}</span>
            </div>


            <div class="w-100 mt3">
                <router-link :to="{name:'roles-edit',params:{id:record.ID}}" class="fr ph3 pv2 br4 bg-green grow-ns pointer f6 white tc no-underline" >
                  Edit
                </router-link>
              </div>
          </form>
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
      url: "/api/roles", 
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