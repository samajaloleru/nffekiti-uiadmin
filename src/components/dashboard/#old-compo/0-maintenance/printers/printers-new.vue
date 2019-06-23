<template>
    <section class="pa2 pa3-l">
      <div class="w-100 pa2 bg-light-gray br4 cf inline-flex items-center relative">
        <div class="fl bg-light-gray pa2 pb fw5 tracked ttu f7 black ">
          Printers / New
        </div>
        <router-link :to="{name:'printers-search'}" class="fl right-1 absolute ph2 pv1 br4 bg-dark-red grow-ns pointer f6 white tc no-underline">
          Go Back
        </router-link>
      </div>  

      <notify class="mv2" :notifications="notifications"></notify>

      <div class="pa2 bg-light-gray br4 cf">
        <div class="fl w-100">
          <div class="w-100">
            <div class="fl w-100">
              <div class="fl pa1 pa2-ns">
                <label class="db fw4 lh-copy f7 black">Status </label>
                <select class="pa1 ba b--silver br2 bg-white  " v-model="record.Workflow">
                  <option></option>
                  <option>off</option>
                  <option>on</option>
                </select>
              </div>

              <div class="fl pa1 pa2-ns">
                <label class="db fw4 lh-copy f7 black">Printer Type </label>
                <select class="pa1 ba b--silver br2 bg-white  " v-model="record.Type">
                  <option></option>
                  <option>USB</option>
                  <option>Bluetooth</option>
                </select>
              </div>
            </div>

            <div class="fl pa1 pa2-ns w-100 w-50-m w-50-l">
              <label class="db fw4 lh-copy f6 black"> Printer Name</label>
              <input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Title">
            </div>

            <div class="fl pa1 pa2-ns w-50 w-25-m w-25-l">
              <label class="db fw4 lh-copy f6 black"> Port</label>
              <input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Port">
            </div>

            <div class="fl pa1 pa2-ns w-50 w-25-m w-25-l">
              <label class="db fw4 lh-copy f6 black"> Address</label>
              <input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Address">
            </div>

            <div class="fl pa1 pa2-ns w-100 w-third-m w-third-l">
              <label class=" fw4 lh-copy f6 black"> Select User</label>
              <label class=" fw4 lh-copy f7 red fr" @click="userList=[],record.User='',record.UserID=0">- clear</label>
              <input class="pa2 ba b--silver br2 bg-white w-100 " @keyup="searchUser" type="text" v-model="record.User">
              <div class="relative w-100">
                <small>
                  <ul class="bg-white absolute w-100 pa0 br2 br--bottom mt0 list overflow-scroll" style="max-height:6em">
                    <li class="pa2 black bt b--near-white" @click="record.UserID = user.ID, record.User=user.Username, userList = []" v-for="(user, index) in userList" :key="index">
                      <span class="f7">#{{index+1}}</span> {{user.Username}}
                    </li>
                  </ul>
                </small>
              </div>
            </div>

            <div class="fl pa1 pa2-ns w-100 w-third-m w-third-l">
              <label class=" fw4 lh-copy f6 black"> Select Wing</label>
              <label class=" fw4 lh-copy f7 red fr" @click="wingList=[],record.Wing='',record.WingID=0">- clear</label>
              <input class="pa2 ba b--silver br2 bg-white w-100 " @keyup="searchWing" type="text" v-model="record.Wing">
              <div class="relative w-100">
                <small>
                  <ul class="bg-white absolute w-100 pa0 br2 br--bottom mt0 list overflow-scroll" style="max-height:6em">
                    <li class="pa2 black bt b--near-white" @click="record.WingID = wing.ID, record.Wing=wing.Title, wingList = []" v-for="(wing, index) in wingList" :key="index">
                      <span class="f7">#{{index+1}}</span> {{wing.Title}}
                    </li>
                  </ul>
                </small>
              </div>
            </div>

            <div class="fl pa1 pa2-ns w-100 w-third-m w-third-l">
              <label class=" fw4 lh-copy f6 black"> Select Unit</label>
              <label class=" fw4 lh-copy f7 red fr" @click="unitList=[],record.Unit='',record.UnitID=0">- clear</label>
              <input class="pa2 ba b--silver br2 bg-white w-100 " @keyup="searchUnit" type="text" v-model="record.Unit">
              <div class="relative w-100">
                <small>
                  <ul class="bg-white absolute w-100 pa0 br2 br--bottom mt0 list overflow-scroll" style="max-height:6em">
                    <li class="pa2 black bt b--near-white" @click="record.UnitID = unit.ID, record.Unit=unit.Title, unitList = []" v-for="(unit, index) in unitList" :key="index">
                      <span class="f7">#{{index+1}}</span> {{unit.Title}}
                    </li>
                  </ul>
                </small>
              </div>
            </div>

            <div class="fl pa1 pa2-ns w-100">
              <label class="db fw4 lh-copy f6 black"> Description</label>
              <textarea class="pa2 ba b--silver br2 bg-white w-100 h4" v-model="record.Description"></textarea>
            </div>

          </div>

          <div class="fl w-100 pa1">
            <div v-if="isSave" class="fr ph3 pv2 br4 bg-green grow-ns pointer f6 white tc no-underline"  @click="save" >
              Submit
            </div>
          </div>
        </div>
      </div>

      

    </section>
</template>

<script type="text/javascript">
  import {HTTP} from "@/common"
  import {checkRedirect} from "@/common"
  import {displayImage} from "@/common"
  import notify from "@/components/notify"

  export default {
    data() {return{
      url: "/api/printers", 
      record: {Wing:"",Unit:"",User:""}, 
      wingList: [], unitList: [], userList: [],
      notifications:[], 
      isSave:true
    }},
    components: { notify },
    methods: {
      searchUser() {
        const app = this;
        const url = "/api/users/search";
        const search = {text: app.record.User, field: "Username", limit: 20, skip: 0};
        HTTP.post(url, search,{withCredentials: true}).then((response) => {
          app.userList = response.data.Body
        }).catch((e) => { console.log(e) })
      },
      searchWing() {
        const app = this;
        const url = "/api/wings/search";
        const search = {text: app.record.Wing, field: "Title", limit: 20, skip: 0};
        HTTP.post(url, search,{withCredentials: true}).then((response) => {
          app.wingList = response.data.Body
        }).catch((e) => { console.log(e) })
      },
      searchUnit() {
        const app = this;
        const url = "/api/units/search";
        const search = {text: app.record.Unit, field: "Title", limit: 20, skip: 0};
        HTTP.post(url, search,{withCredentials: true}).then((response) => {
          app.unitList = response.data.Body
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
          if(response.data.Body !== null){
            app.record = {Wing:"",Unit:"",User:""}
          }
        }).catch((e) => {
          console.log(e)
        })
      },
    }
  }
</script>