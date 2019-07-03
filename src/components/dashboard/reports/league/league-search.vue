<template>
    <section>
        <div class="w-100 pa2 bg-green fixed z-999 cf inline-flex-ns items-center-ns relative">
            <div class="fl w-100 pa1 tc tl-ns pb fw5 tracked ttu f7 white ">
                Reports / League / Search
            </div>

            <div class="white pa2 br1 tc tr-ns f7 fl w-100 db dib-ns absolute-ns left-0-ns w-80-l">
                <span class="pr4">
                    Display
                    <input type="number" class="w3 b white bn tc br2 bg-transparent" v-model.number="search.limit" @change="searchRecords"> 
                    Records
                </span>
                <span @click="printRecords('tableReport')" class="ph2  br1 bg-near-white near-black pointer f6 tc no-underline">
                    <i class="fas fa-print"></i> Print
                </span>
            </div>
        </div>

        <div class="cf h2 w-100 db dn-ns"></div>
        <div class="pv2 mt4 dib w-100" id="tableReport">

            <div class="cf w-100 near-black tracked tc b f3" colspan="5">LEAGUE REPORT</div>

                <table-display>
                    <template slot="tableHead">
                        <tr class="tl bg-near-lack black f7">
                            <td class=" tc bg-near-white">
                            <i @click="searchRecords" class="fas near-black fa-search"></i>
                            </td>
                            <td class="">
                            <input type="text" v-model="search.filter.dob" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                            </td>
                            <td class="">
                            <input type="text" v-model="search.filter.fullname" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                            </td>
                            <td class="">
                            <input type="text" v-model="search.filter.phone" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                            </td>
                            <td class="">
                            <input type="text" v-model="search.filter.description" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                            </td>
                        </tr>
                        <tr class="tl bg-near-white near-black">
                            <td class="pa2 tc w-05"></td>
                            <td class="pa2">Birthday</td>
                            <td class="pa2 w-table-m">Profile</td>
                            <td class="pa2">Phone</td>
                            <td class="pa2 w-table-m">Description</td>
                        </tr>
                    </template>
                    <template slot="tableBody" v-if="recordList.length > 0">
                        <tr class="stripe-dark" v-for="(birthday, index) in recordList" :key="index">
                            <td class=" pa2 tr pr2">
                            <router-link data-glyph="eye" class="oi br-pill bg-green hover-bg-dark-green ph1 pt1 near-white" :to="{name:'league-view',params:{id:birthday.ID}}" >
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
                    <h1 class="black f6 tc ma2">There are currently no league report within the system for the period specified</h1>
                </div>
            
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
        search: {text: "", field: "Title", limit: 1000, page:1, skip: 0,filter:{start:"",stop:"",attendance:"BIRTHDAY"}},
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
                if (response.data.Body !== null && response.data.Body !== undefined ) {
                    app.recordList = response.data.Body
                }
                }).catch((e) => { console.log(e) })
            }
        },
    }
  }
</script>