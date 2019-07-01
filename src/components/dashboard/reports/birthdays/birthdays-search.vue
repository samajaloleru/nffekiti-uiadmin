<template>
    <section>
      <div class="w-100 pa2 bg-green fixed z-999 cf inline-flex-ns items-center-ns relative">
            <div class="fl w-100 pa1 tc tl-ns pb fw5 tracked ttu f7 white ">
                Reports / Birthdays / Search
            </div>

            <div class="white pa2 br1 tc tr-ns f7 fl w-100 db dib-ns absolute-ns left-0-ns w-80-l">
                <span class="pr4">
                    1 -
                    <input type="number" class="w2 green bn tc br2 bg-white" v-model.number="search.limit">
                    of page
                    <input type="number" class="w2 green bn tc br2 bg-white" @click="searchRecords" min="1" v-model.number="search.page"> 
                </span>
                <router-link :to="{'name':'users-new'}" class="ph2  br1 bg-near-black near-white pointer f6 tc no-underline">
                    <i class="fas fa-plus"></i> New
                </router-link>
            </div>
        </div>

      <div class="cf pv3"></div>
    
        <div class="w-100 fl tc pa2 pb tracked black">
            <small class=" fw6 f4 i"> BIRTHDAYS REPORT </small>
            <small class="db fw5 i mt3"> 
                <select class="pa2 ba b--silver br2 bg-white f4" v-model="search.filter.dob">
                    <option value="-01-">January "-"</option>
                    <option value="/01/">January "/"</option>

                    <option value="-02-">February "-"</option>
                    <option value="/02/">February "/"</option>

                    <option value="-03-">March "-"</option>
                    <option value="/03/">March "/"</option>

                    <option value="-04-">April "-"</option>
                    <option value="/04/">April "/"</option>

                    <option value="-05-">May "-"</option>
                    <option value="/05/">May "/"</option>

                    <option value="-06-">June "-"</option>
                    <option value="/06/">June "/"</option>

                    <option value="-07-">July "-"</option>
                    <option value="/07/">July "/"</option>

                    <option value="-08-">August "-"</option>
                    <option value="/08/">August "/"</option>

                    <option value="-09-">September "-"</option>
                    <option value="/09/">September "/"</option>

                    <option value="-10-">October "-"</option>
                    <option value="/10/">October "/"</option>

                    <option value="-11-">November "-"</option>
                    <option value="/11/">November "/"</option>

                    <option value="-12-">December "-"</option>
                    <option value="/12/">December "/"</option>
                </select>

                <span @click="searchRecords" class="oi bg-dark-green white b pa2 br2" data-glyph="magnifying-glass"></span>

                <span @click="printRecords('tableReport')" class="ml3 oi bg-dark-red white b pa2 br2" data-glyph="print"></span>
            </small>
        </div>

       
        <div class="cf w-100">
            
        </div>
        <table-display id="tableReport">
            <template slot="tableHead">
            <tr class="tl bg-black white">
                <td class="pa2 tc w-05"></td>
                <td class="pa2">Birthday</td>
                <td class="pa2 w-table-m">Profile</td>
                <td class="pa2 ">Phone</td>
                <td class="pa2 w-table-m">Unit</td>
                <td class="pa2 w-table-m">Group</td>
            </tr>
            <tr class="tl bg-white black f7">
                <td class="tc pt1">
                #
                </td>
                <td class="">
                    <input type="text" v-model="search.filter.dob" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                </td>
                <td class="">
                    <input type="text" v-model="search.filter.title" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                </td>
                <td class="">
                    <input type="text" v-model="search.filter.profile" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                </td>
                <td class="">
                    <input type="text" v-model="search.filter.unit" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                </td>
                <td class="">
                    <input type="text" v-model="search.filter.group" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                </td>
            </tr>
            </template>
            <template slot="tableBody" v-if="recordList.length > 0">
            <tr class="stripe-dark" v-for="(birthday, index) in recordList" :key="index">
                <td class=" pa2 tr pr2">
                <router-link data-glyph="eye" class="oi br-pill bg-green hover-bg-dark-green ph1 pt1 near-white" :to="{name:'birthdays-view',params:{id:birthday.ID}}" >
                </router-link>
                </td>
                <td class=" pa2">
                    <small class="f7">#{{index+1}}.</small>  {{birthday.Dob}}
                </td>
                <td class=" pa2 f7">{{birthday.Profile}}</td>
                <td class=" pa2 f7">{{birthday.Phone}}</td>
                <td class=" pa2 f7">{{birthday.Unit}}</td>
                <td class=" pa2 f7">{{birthday.Group}}</td>
                
            </tr>
            </template>
        </table-display>

        <div v-if="recordList.length < 1">
            <h1 class="black f6 tc ma5">There are currently no birthdays within the system for the period specified</h1>
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
        search: {text: "", field: "Title", limit: 50, page:1, skip: 0,filter:{start:"",stop:"",attendance:"BIRTHDAY"}},
        setStatsIntervalId:{},
    }},
    components: { tableDisplay },
    created() {
        var month = new Date().toJSON().slice(5,7);
        this.search.filter.dob = "-"+month+"-"
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
            
            if (app.search.filter.dob !== "" && app.search.filter.attendance !== "") {
                HTTP.post(app.url+'/search', app.search,{withCredentials: true}).then((response) => {
                if (response.data.Body !== null) {
                    app.recordList = response.data.Body
                }
                }).catch((e) => { console.log(e) })
            }
        },
    }
  }
</script>