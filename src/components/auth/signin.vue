<template>
  <section class="">

    <loadingscreen/>
    
      <template>
        <div class="center mw7 mw6-l" >
          <article class="dt center tc vh-100 min-vh-100 w-100 ph0-l pa3" style="max-width:350px">

                   <img src="@/assets/logo.png" class="pb2 pt4 h4 tc " />

              <div class="cf bg-transparent ba b--near-white br2 center pa3 " style="" >

                <div class="w-100 fl">
                  <p class="cf db w-100 f5 pt2 pb2 black fw4">Sign in to your Plus-Fab account</p>
                </div>


                <notify :notifications="notifications"></notify>

                <div  class="center">

                  <div class="cf w-100 pv3">
                    <input class="signin f6 fw3 bn pa2 dib w-100 black" type="text" placeholder="Username" @keyup="keyUp" v-model="username" />
                  </div>

                  <div class="cf w-100 pv3">
                    <input class="signin f6 fw3 bn pa2 dib w-100 black" type="password" placeholder="Password" @keyup="keyUp" v-model="password" />
                    <router-link to="/forgot" class="cf no-underline">
                      <p class="fr gray f7">Forgot Password?</p>
                    </router-link>
                  </div>

                  <span class="cf tl no-underline inline-flex items-center pa2 white button relative pointer"  @click="login()">
                      SIGN IN
                      <img src="@/assets/arrow-right.png" class="pl3 fr"/>
                  </span>

                  <div class="cf w-100 pt4">
                      <p class="f7"> 2019 © Plus-fab</p>
                  </div>
                </div>
              </div>

          </article>
        </div>
      </template>
      
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
      lLoading:true, notifications:[], username:'',password:'',
    }},
    methods: {
        keyUp(event){
			if(event.code == "Enter") {
				this.login()
			}
		},
        login() {
            HTTP.post('/api/login', {
            username:this.username,
            password:this.password
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
