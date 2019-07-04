<template>
    <section>
      <div class="w-100 pa2 bg-light-gray br2 cf inline-flex items-center relative">
        <div class="fl bg-light-gray pa2 pb fw5 tracked ttu f7 black ">
          Reports / Attendances / Search
        </div>
      </div>

      <div class="cf pv3"></div>
    
        <div class="w-100 fl tc pa2 pb tracked black">
            <small class=" fw6 f4 i"> ATTENDANCES REPORT </small>
            <small class="db fw5 i"> 
                From
                <input class="pa2 ba b--silver br2 bg-white" type="date" v-model="search.filter.start">
                to
                <input class="pa2 ba b--silver br2 bg-white" type="date" v-model="search.filter.stop">

                <select class="f5 pv2"  v-model="search.filter.attendance">
                    <option>PRESENT</option>
                    <option>ABSENT</option>
                </select>

                <span @click="searchRecords" class="oi bg-dark-green white b pa2 br2" data-glyph="magnifying-glass"></span>

                <span @click="printRecords('tableReport')" class="ml3 oi bg-dark-red white b pa2 br2" data-glyph="print"></span>
            </small>
        </div>

       
        <div class="cf w-100">
            <div class="black fl w-50 dib tl pt2 h2 f7">
            <span class="bg-black white pa1 br1 fl">page: 
                <input type="number" class="w3 black bn tc br2 bg-white " @click="searchRecords" min="1" v-model.number="search.page">
            </span>
            </div>
            <div class="black fr w-50 dib tr pt2 h2 f7">
            <span class="bg-black white pa1 br1 fr">
                <input type="number" class="w3 black bn tc br2 bg-white " v-model.number="search.limit">
                records
            </span>
            </div>
        </div>
        <table-display id="tableReport">
            <template slot="tableHead">
            <tr class="tl bg-black white">
                <td class="pa2 tc w-05"></td>
                <td class="pa2">Tag No</td>
                <td class="pa2 w-table-m">Service</td>
                <td class="pa2 w-table-m">Profile</td>
                <td class="pa2 w-table">Wing</td>
                <td class="pa2 w-table">Group</td>
                <td class="pa2 w-table-m">Unit</td>
                <td class="pa2 w-table">Date</td>
            </tr>
            <tr class="tl bg-white black f7">
                <td class="tc pt1"> # </td>
                <td class="">
                    <input type="text" v-model="search.filter.title" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                </td>
                <td class="">
                    <input type="text" v-model="search.filter.service" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                </td>
                <td class="">
                    <input type="text" v-model="search.filter.profile" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                </td>
                <td class="">
                    <input type="text" v-model="search.filter.wing" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                </td>
                <td class="">
                    <input type="text" v-model="search.filter.group" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                </td>
                <td class="">
                    <input type="text" v-model="search.filter.unit" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                </td>
                <td class="">
                    <input type="text" v-model="search.filter.createdate" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                </td>
            </tr>
            </template>
            <template slot="tableBody" v-if="recordList.length > 0">
            <tr class="stripe-dark" v-for="(attendance, index) in recordList" :key="index">
                <td class=" pa2 tr pr2">
                <router-link data-glyph="eye" class="oi br-pill bg-green hover-bg-dark-green ph1 pt1 near-white" :to="{name:'attendances-view',params:{id:attendance.ID}}" >
                </router-link>
                </td>
                <td class=" pa2">
                <span class="f7">#{{index+1}}.</span> {{attendance.Title}}
                </td>
                <td class=" pa2 f7">{{search.filter.attendance}} <span v-if="attendance.Service !== undefined">at {{attendance.Service}}</span> </td>
                <td class=" pa2 f7">{{attendance.Profile}}</td>
                <td class=" pa2 f7">{{attendance.Wing}} <small>- {{attendance.Location}}</small>  <span v-if="attendance.Phone !== undefined"> {{attendance.Phone}}</span> </td>
                <td class=" pa2 f7">{{attendance.Group}}</td>
                <td class=" pa2 f7">{{attendance.Unit}}</td>
                <td class=" pa2 f7">{{attendance.Createdate}}</td>
                
            </tr>
            </template>
        </table-display>

        <div v-if="recordList.length < 1">
            <h1 class="black f6 tc ma2">There are currently no records </h1>
        </div>

    </section>
</template>

<script type="text/javascript">
  import {HTTP} from "@/common"
  import tableDisplay from "@/components/dashboard/tableDisplay"
  import {humanTime} from "@/common"
  import {printRecords} from "@/common"

  export default {
    data() {return{
        url: "/api/attendances", recordList: [],
        search: {text: "", field: "Title", limit: 50, page:1, skip: 0,filter:{start:"",stop:"",attendance:"PRESENT"}},
        setStatsIntervalId:{},
    }},
    components: { tableDisplay },
    created() {
        var today = new Date().toJSON().slice(0,10);
        this.search.filter.start = today
        this.search.filter.stop = today
        this.searchRecords()	
    },
    beforeDestroy(){
        clearInterval(this.setStatsIntervalId);
    },
    methods: {
        humanTime,
        printRecords(elementID) {
            printRecords(elementID, this)
        },
        searchRecords() {
            const app = this;
            app.isSearch = true
            app.recordList = []
            app.search.skip = app.search.page-1;
            
            if (app.search.filter.start !== "" && app.search.filter.stop !== "") {
                HTTP.post(app.url+'/search', app.search,{withCredentials: true}).then((response) => {
                if (response.data.Body !== null && response.data.Body !== undefined ) {
                    app.recordList = response.data.Body
                }
                }).catch((e) => { console.log(e) })
            }
        },
    }
  }
</script>