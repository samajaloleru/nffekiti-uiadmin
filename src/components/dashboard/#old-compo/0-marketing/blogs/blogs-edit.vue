<template>
    <section class="pa2 pa3-l">
      <div class="w-100 pa2 bg-light-gray br4 cf inline-flex items-center relative">
        <div class="fl bg-light-gray pa2 pb fw5 tracked ttu f7 black ">
          Blogs / Edit
        </div>
        <router-link :to="{name:'services-view',params:{id:record.ID}}" class="fl right-1 absolute ph2 pv1 br4 bg-red hover-bg-dark-red grow-ns pointer f6 white tc no-underline">
          Go Back
        </router-link>
      </div>


      <notify class="mv2" :notifications="notifications"></notify>

      <div v-if="isFound" class="pa2 bg-light-gray br4 cf">

        <div class="fl w-100">
          <form action="sign-up_submit" method="get" accept-charset="utf-8"  >
            <div class="w-100">
              <div class="w-100 fl">
                <div class="fl pa1 ">
                  <label class="db fw4 lh-copy f7 black">Select Status </label>
                  <select class="pa1 ba b--silver br2 bg-white  " v-model="record.Workflow">
                    <option></option>
                    <option>completed</option>
                    <option>ongoing</option>
                    <option>upcoming</option>
                    <option>template</option>
                  </select>
                </div>


                <div class="fl pa1 ">
                  <label class="db fw4 lh-copy f7 black">Service Day </label>
                  <select class="pa1 ba b--silver br2 bg-white  " v-model="record.Day">
                    <option></option>
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                    <option>Sunday</option>
                  </select>
                </div>

                <div class="fl pa1 ">
                  <label class="db fw4 lh-copy f7 black">Service Type </label>
                  <select class="pa1 ba b--silver br2 bg-white  " v-model="record.Type">
                    <option></option>
                    <option>Weekly</option>
                    <option>Special</option>
                    <option>Vigil</option>
                  </select>
                </div>

                <div class="fl pa1 ">
                  <label class="db fw4 lh-copy f7 black">Service Schedule </label>
                  <select class="pa1 ba b--silver br2 bg-white  " v-model="record.Schedule">
                    <option></option>
                    <option>1st Service</option>
                    <option>2nd Service</option>
                    <option>3rd Service</option>
                    <option>4th Service</option>
                    <option>5th Service</option>
                  </select>
                </div>    
              </div>
              
              <div class="fl pa1 w-100 w-50-m w-25-l">
                <label class="db fw4 lh-copy f6 black" for="Title"> Service Code</label>
                <input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Code">
              </div>

              <div class="fl pa1 w-100 w-50-m w-25-l">
                <label class="db fw4 lh-copy f6 black" for="Title"> Date</label>
                <input class="pa1 ba b--silver br2 bg-white w-100 " type="date" v-model="record.Date">
              </div>

              <div class="fl pa1 w-100 w-50-m w-25-l">
                <label class="db fw4 lh-copy f6 black" for="Title"> Start Time</label>
                <input class="pa1 ba b--silver br2 bg-white w-100 " type="time" v-model="record.Start">
              </div>

              <div class="fl pa1 w-100 w-50-m w-25-l">
                <label class="db fw4 lh-copy f6 black" for="Title"> Stop Time</label>
                <input class="pa1 ba b--silver br2 bg-white w-100 " type="time" v-model="record.Stop">
              </div>
            </div>

            <div class="fl w-100 mt3">
              <div class="fr ph3 pv2 br4 bg-green grow-ns pointer f6 white tc no-underline"  @click="save" >
                Save
              </div>
            </div>
          </form>
        </div>
      </div>
      <div v-else>
          <p class="black f6 tc ma5">Please Wait, Searching...</p>
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
      url: "/api/services", 
      record: {}, 
      notifications:[], 
      isFound:false,
      isSave:true,
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
      save () {
        const app = this;
        app.isSave = false;
        app.record.Title = app.record.Day+' '
        app.record.Title += app.record.Type+' '
        app.record.Title += app.record.Schedule
        HTTP.post(app.url, app.record, {withCredentials: true})
        .then((response) => {
          this.notifications.push(response.data)
          setTimeout(checkRedirect(response.data),1500)

          if(response.data.Body !== null){
            setTimeout(function(){
              app.$router.push({name:"services-view",params:{id:response.data.Body}})
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