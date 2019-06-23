<template>
  <section class="pa2 pa3-l">
    <div class="w-100 pa2 bg-light-gray br4 cf inline-flex items-center relative">
      <div class="fl bg-light-gray pa2 pb fw5 tracked ttu f7 black ">
        Trial Balance / New
      </div>
      <router-link :to="{name:'postings-search'}" class="fl right-1 absolute ph2 pv1 br4 bg-dark-red grow-ns pointer f6 white tc no-underline">
        Go Back
      </router-link>
    </div>

    <notify class="mv2" :notifications="notifications"></notify>


    <div class="f6 w-100 bg-light-gray gray bb bt  b--white-40 br4 br--top cf inline-flex items-center relative">
      <span class="w-50 tc pointer dim pa3-ns pa2 br4 br--left br--top " :class="tabProps.serviceClass" @click="toggleTab('service')">
        <span class="oi" data-glyph="book"></span>
        <label class="db dib-ns">Service</label>
      </span>
      
      <span class="w-50 tc pointer dim pa3-ns pa2 bl b--white-40 br4 br--right br--top " :class="tabProps.postingClass" @click="toggleTab('posting')">
        <span class="oi" data-glyph="print"></span>
        <label class="db dib-ns">Postings</label>
      </span>
    </div>
    
    <div class="bg-light-gray ph2 pb2 br4 br--bottom cf black">
      <div class="" v-if="tabProps.serviceShow">
        <p class="w-100 ph1 cf f7 gray tracked"> <span class="fw6">Ongoing</span> Service:</p>
        <table-display>
          <template slot="tableHead">
            <tr class="tl bg-gray white">
              <td class="pa1 w-table-m">Service</td>
              <td class="pa1 w-table">Date</td>
              <td class="pa1 w-table-m" colspan="2">Start</td>
            </tr>
          </template>
          <template slot="tableBody">
            <tr class="stripe-light">
              <td class=" pa1"> 
                {{serviceOngoing.Title}}
              </td>
              <td class=" pa1">{{serviceOngoing.Date}}</td>
              <td class=" pa1 ">
                {{humanTime(serviceOngoing.Start)}}
              </td>
              <td class=" pa1 ">
                <span v-if="isStop" class="fr ml4 center dib ph2 pv1 br4 bg-dark-red dim pointer f7 white tc" @click="stopService" >
                  Stop Service
                </span>
              </td>
            </tr>
          </template>
        </table-display>

        <p class="w-100 ph1 cf f7 gray tracked mt3"> <span class="fw6">Upcoming</span> Service:</p>
        <div class="fl pa1 inline-flex items-center">
          <select class="f7 pa1 ba b--silver br2 bg-white " v-model="serviceUpcoming.Day">
            <option value="">-select-</option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
            <option>Sunday</option>
          </select>
        </div>

        <div class="fl pa1 inline-flex items-center">
          <select class="f7 pa1 ba b--silver br2 bg-white " v-model="serviceUpcoming.Type">
            <option value="">-select-</option>
            <option>Weekly</option>
            <option>Special</option>
            <option>Vigil</option>
          </select>
        </div>    

        <div class="fl pa1 inline-flex items-center">
          <select class="f7 pa1 ba b--silver br2 bg-white " v-model="serviceUpcoming.Schedule">
            <option value="">-select-</option>
            <option>1st Service</option>
            <option>2nd Service</option>
            <option>3rd Service</option>
            <option>4th Service</option>
            <option>5th Service</option>
          </select>
        </div>    

        <div class="fl w-100 ph1 pv2">
          <span v-if="isSave" class="center dib pv1 ph2 f7 br4 bg-dark-green dim pointer white tc"  @click="startService">
            Start Service
          </span>
        </div>    
      </div>

      <div class="" v-if="tabProps.postingShow">
        <div class="fl pa1 w-100 w-50-m w-third-l">
          <label class=" fw4 lh-copy f7 black">find printer</label>
          <label class=" fw4 lh-copy f7 red fr" @click="printerList=[], printerCur={}">- clear</label>
          <input class="pa1 ba b--silver br2 bg-white w-100 " @keyup="searchPrinter" type="text" v-model="printerCur.Title">
          <div class="relative w-100">
            <small>
              <ul class="bg-white absolute w-100 pa0 br2 br--bottom mt0 list f7">
                <li class="pa2 black bt b--near-white" @click="printerCur = printer, printerList = []" v-for="(printer, index) in printerList" :key="index">
                  <small>#{{index+1}} {{printer.Title}} </small>
                </li>
              </ul>
            </small>
          </div>
        </div>
        
        <span class="w-100 ph1 fl f7 gray tracked mt3"> 
          <span class="fw6">Printer:</span> {{printerCur.Title}}
        </span>
        <div class="fl w-100">
          <table-display>
            <template slot="tableHead">
              <tr class="tl bg-gray white">
                <td class="pa1 w-third">Wing</td>
                <td class="pa1 w-third">Unit</td>
                <td class="pa1 w-third">User</td>
              </tr>
            </template>
            <template slot="tableBody">
              <tr class="stripe-light">
                <td class="pa1">{{printerCur.Wing}}</td>
                <td class="pa1">{{printerCur.Unit}}</td>
                <td class="pa1">{{printerCur.User}}</td>
              </tr>
            </template>
          </table-display>
        </div>
        
        <div class="fl w-100 mt2">
          <table-display>
            <template slot="tableHead">
              <tr class="tl bg-gray white">
                <td class="pa1 w-third">Type</td>
                <td class="pa1 w-third">Port</td>
                <td class="pa1 w-third">Address</td>
              </tr>
            </template>
            <template slot="tableBody">
              <tr class="stripe-light">
                <td class="pa1">{{printerCur.Type}}</td>
                <td class="pa1">{{printerCur.Port}}</td>
                <td class="pa1">{{printerCur.Address}}</td>
              </tr>
            </template>
          </table-display>
          
          
        </div>

        <div v-if="printerCur.ID > 0">
          <div v-if="printerCur.Workflow=='on'" class="fl pa1 w-50 w-third-l">
            <span @click="stopPrinting" v-if="isSave" class="center dib pa2 f7 br4 bg-dark-red dim pointer white tc">
              Stop Printing
            </span>
          </div>

          <div v-else class="fl pa1 w-50 w-third-l">
            <span @click="startPrinting" v-if="isSave" class="center dib pa2 f7 br4 bg-dark-green dim pointer white tc">
              Start Printing
            </span>
            
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
  
  import {dayofWeek} from "@/common"
  import {humanTime} from "@/common"

  import tableDisplay from "@/components/dashboard/tableDisplay"

  export default {
    created(){this.toggleTab("posting"), this.getUser() },
    data() {return{
      url: "/api/postings",
      user:{},
      printerCur: {},
      printerList: [],
      unitList: [],
      wingList: [],
      serviceOngoing: {},
      serviceUpcoming: {Workflow:"ongoing",},
      notifications:[],
      isSave:true,
      isStop:false,
      isPrinting:true,
      tabProps:{},
    }},
    components: { notify, tableDisplay },
    methods: {
      humanTime,
      searchPrinter() {
        const app = this;
        const url = "/api/printers/search";
        const search = {text: app.printerCur.Printer, field: "Title", limit: 20, skip: 0};
        HTTP.post(url, search,{withCredentials: true}).then((response) => {
          app.printerList = response.data.Body
        }).catch((e) => { console.log(e) })
      },
      searchWing() {
        const app = this;
        const url = "/api/wings/search";
        const search = {text: app.printerCur.Wing, field: "Title", limit: 20, skip: 0};
        HTTP.post(url, search,{withCredentials: true}).then((response) => {
          app.wingList = response.data.Body
        }).catch((e) => { console.log(e) })
      },
      searchUnit() {
        const app = this;
        const url = "/api/units/search";
        const search = {text: app.printerCur.Unit, field: "Title", limit: 20, skip: 0};
        HTTP.post(url, search,{withCredentials: true}).then((response) => {
          app.unitList = response.data.Body
        }).catch((e) => { console.log(e) })
      },
      stopService() {
        const app = this;
        app.isStop = false;

        var dt = new Date();
        app.serviceOngoing.Workflow = "completed"
        app.serviceOngoing.Stop = dt.toLocaleTimeString();

        HTTP.post("/api/services", app.serviceOngoing, {withCredentials: true})
        .then((response) => {
          app.notifications.push(response.data)
          setTimeout(checkRedirect(response.data),1500)
          if(response.data.Body !== null){
            app.searchServices("ongoing")

            //Stop All Printers Here
            HTTP.get('/api/printers/stop',{withCredentials: true}).then((response) => {
              // app.notifications.push(response.data)
              // setTimeout(checkRedirect(response.data),1500)
            }).catch((e) => { console.log(e) })
            //Stop All Printers Here
          

          }
        }).catch((e) => {
          console.log(e)
        })
      },
      startService() {
        const app = this;
        app.isStart = false;
        app.serviceUpcoming.Title = app.serviceUpcoming.Day+' '
        app.serviceUpcoming.Title += app.serviceUpcoming.Type+' '
        app.serviceUpcoming.Title += app.serviceUpcoming.Schedule

        var dt = new Date();
        app.serviceUpcoming.Date = dt.toLocaleDateString();
        app.serviceUpcoming.Start = dt.toLocaleTimeString();


        HTTP.post("/api/services", app.serviceUpcoming, {withCredentials: true})
        .then((response) => {
          app.notifications.push(response.data)
          setTimeout(checkRedirect(response.data),1500)
          app.isStart = true;
          if(response.data.Body !== null){
            app.serviceUpcoming = {Workflow:"ongoing"}
            app.searchServices("ongoing")
          }

        }).catch((e) => {
          console.log(e)
        })
      },
      searchServices(status) {
        const app = this
        app.serviceOngoing = {}
        HTTP.post('/api/services/search', {Workflow:status,Text:"",Limit:50},{withCredentials: true}).then((response) => {
          app.notifications.push(response.data)
          setTimeout(checkRedirect(response.data),1500)

          app.serviceUpcoming.Day = dayofWeek()
          if (app.serviceUpcoming.Schedule == undefined ) {
            app.serviceUpcoming.Schedule = "1st Service"
          }
          if (response.data.Body !== null){
            if (response.data.Body.length > 0) {
              app.isStop = true;
              app.serviceOngoing = response.data.Body[0];
              app.serviceUpcoming.Day = app.serviceOngoing.Day
              app.serviceUpcoming.Type = app.serviceOngoing.Type
              if (app.serviceOngoing.Schedule.length > 0) {
                var schedule = parseInt(app.serviceOngoing.Schedule.slice(0,1)) + 1
                var scheduleList = ['',"1st Service","2nd Service","3rd Service","4th Service","5th Service"]
                app.serviceUpcoming.Schedule = scheduleList[schedule]
              }
            }
          }
        }).catch((e) => { console.log(e) })
      },
      getUser(){
        const app = this
        HTTP.get('/api/myprofile',{withCredentials: true}).then((response) => {
          app.notifications.push(response.data)
          setTimeout(checkRedirect(response.data),1500)
          if (response.data.Body !== null){
            app.user = response.data.Body
          }
        }).catch((e) => { console.log(e) })
      },
      getPrinter() {
        const app = this;
        HTTP.get('/api/printers/fetch',{withCredentials: true}).then((response) => {
          app.notifications.push(response.data)
          setTimeout(checkRedirect(response.data),1500)
          if (response.data.Body !== null){
            app.printerCur = response.data.Body
          }
        }).catch((e) => { console.log(e) })
      },
      stopPrinting() {
        const app = this;
        const printer = app.printerCur;
        printer.Workflow = "off"
        printer.UserID = 0
        app.printerCur = {}

        HTTP.post("/api/printers", printer, {withCredentials: true})
        .then((response) => {
          app.notifications.push(response.data)
          setTimeout(checkRedirect(response.data),1500)
          if(response.data.Body !== null){
            app.getPrinter()
          }
        }).catch((e) => {
          console.log(e)
        })
      },
      startPrinting() {
        const app = this;
        const printer = app.printerCur;
        printer.Workflow = "on"
        printer.UserID = app.user.ID
        app.printerCur = {}

        HTTP.post("/api/printers", printer, {withCredentials: true})
        .then((response) => {
          app.notifications.push(response.data)
          setTimeout(checkRedirect(response.data),1500)
          app.getPrinter()
        }).catch((e) => {
          console.log(e)
        })
      },
      toggleTab(tabname) {
        switch(tabname) {
          default:
            this.tabProps = {serviceClass:"bg-gray white",serviceShow:true}
            this.searchServices("ongoing")
            break;
          case "posting":
            this.tabProps = {postingClass:"bg-gray white",postingShow:true}
            this.getPrinter()
            break;
        }
      }
    }
  }
</script>
