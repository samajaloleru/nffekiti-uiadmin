<template>
  <section class="">

    <loadingscreen/>
    
        <div class="center mw7 mw6-l" >
          <article class="dt min-vh-100 w-100 ph0-l pa3 center" style="max-width:350px">

              <div class="dtc v-mid tc center " style="" >

                <img src="@/assets/logo.png" class="h4 tc " />

                <div class="w-100 fl">
                  <p class="cf db w-100 f5 pt2 pb2 mid-gray tracked fw4">Reset your NFF Ekiti account</p>
                </div>


                <notify :notifications="notifications"></notify>

                <div  class="center">

                  <div class="cf w-100 pv3">
                    <input class="f6 fw3 bn pa2 dib w-100 black br1 bg-washed-green" type="email" placeholder="Enter your registered email"  v-model="email" />
                  </div>

                  <span class="cf tl no-underline inline-flex items-center pa2 white bg-green br1 relative pointer" @click="forgot()">
                      Reset
                      <i class="pl1 fas fa-tools"></i>
                  </span>

                  <div class="cf w-100 pv3">
                    <router-link to="/signin" class="cf no-underline">
                      <p class="fr gray f7"> Sign Me In</p>
                    </router-link>
                  </div>

                  <div class="cf w-100 mid-gray">
                      <p class="f7"> 2019 © NFF Ekiti State</p>
                  </div>
                </div>
              </div>

          </article>
        </div>
      
  </section>
</template>

<script type="text/javascript">
  import {HTTP} from '@/common';
  import {checkRedirect} from '@/common';
  import notify from "@/components/notify"
  import loadingscreen from "@/components/loading"

  export default {
    components: {
      "notify": notify,
      "loadingscreen": loadingscreen,
    },
    data() {return{
      lLoading:true, notifications:[], email:'',
    }},
    methods: {
      forgot() {
        HTTP.post('/api/forgot', {
          Email:this.email
        },{withCredentials: true}).then(response => {
          this.notifications.push(response.data)
          setTimeout(checkRedirect(response.data),2000)
        }).catch(e => {
          console.log(e)
          this.error = e
          // this.errors.push(e)
        })
      }
    }
  }
</script>
