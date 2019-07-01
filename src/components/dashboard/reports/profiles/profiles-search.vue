<template>
    <section>
        <div class="w-100 pa2 bg-light-gray br2 cf inline-flex items-center relative">
            <div class="fl bg-light-gray pa2 pb fw5 tracked ttu f7 black ">
            Reports / Profiles / Search
            </div>
        </div>

        <div class="cf pv3"></div>

        <div class="w-100 mw5 cf tc black center">
            <p class=" fw6 f4 i"> PROFILES REPORT </p>
            <div class="tc bg-gray cf br2 pointer">
                <div class="w-25 fl tc pa2 pb1 br2 br--left br b--near-white" :class="{'bg-silver':lList,'bg-black':!lList,}">
                    <div @click="toggleView" class="oi white" data-glyph="grid-three-up"></div>
                </div>

                <div class="w-25 fl tc pa2 pb1 br b--near-white" :class="{'bg-black':lList,'bg-silver':!lList,}">
                    <div @click="toggleView" class="oi white" data-glyph="list"></div>
                </div>

                <div class="w-25 fl tc pa2 pb1 bg-dark-green br b--near-white">
                    <div @click="searchRecords" class="oi white" data-glyph="magnifying-glass"></div>
                </div>

                <div class="w-25 fl tc pa2 pb1 bg-red br2 br--right">
                    <span @click="printRecords('tableReport')" class="oi white" data-glyph="print"></span>
                </div>
            </div>
        </div>

        
        <section id="tableReport">
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
                    <td class="pa2 w-table">Tag</td>
                    <td class="pa2 w-table-m">Unit</td>
                    <td class="pa2 w-table-m">Fullname</td>
                    <td class="pa2 w-table-m">Gender</td>
                    <td class="pa2 w-table-m">Created</td>
                </tr>
                <tr class="tl bg-white black f7">
                    <td class="">
                        <input type="text" v-model="search.filter.title" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                    </td>
                    <td class="">
                        <input type="text" v-model="search.filter.unit" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                    </td>
                    <td class="">
                        <input type="text" v-model="search.filter.fullname" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                    </td>
                    <td class="">
                        <input type="text" v-model="search.filter.profession" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                    </td>
                    <td class="">
                        <input type="text" v-model="search.filter.createdate" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                    </td>
                    
                </tr>
                </template>
                <template slot="tableBody" v-if="recordList.length > 0 && lList">
                    <tr class="stripe-dark" v-for="(record, index) in recordList" :key="index">
                        <td class=" pa2 f7">  <small>#{{index+1}}.</small> {{record.Title}} </td>
                        <td class=" pa2 f7">{{record.Unit}}</td>
                        <td class=" pa2 f7">{{record.Profile}}</td>
                        <td class=" pa2 f7">{{record.Gender}}</td>
                        <td class=" pa2 f7">{{record.Createdate}}</td>
                    </tr>
                </template>
            </table-display>

            <div v-if="recordList.length > 0 && !lList">
                <div class="tc pa2 w-20-l w-25-m w-third fl" v-for="(record, index) in recordList" :key="index">
                    <div class=" hide-child relative center">
                        <div class="h4">
                            <img class="h4" :src="record.Image" v-if="record.Image.length>0"/>
                            <img height="8rem" class="h4" :src="profileIcon" v-else/>
                        </div>
                        <div class="h3 pa1 mt2 ba b--black-20">
                            <p class="f7 black mv1 fw5">
                                {{record.Profile}} <small class="i">{{record.Gender}}</small>
                            </p>
                            <p class="f7 black mv1"></p>
                            <p class="f7 black mv1">{{record.Unit}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
            
        

    </section>
</template>

<script type="text/javascript">
  import {HTTP} from "@/common"
  import tableDisplay from "@/components/dashboard/tableDisplay"
  import {humanTime} from "@/common"
  import {printRecords} from "@/common"

  import profileIcon from "@/assets/user.png"

  export default {
    data() {return{
        url: "/api/members", recordList: [], profileIcon,
        search: {text: "", field: "Title", limit: 50, page:1, skip: 0,  filter:{Workflow:'enabled'}},
        lList:true
    }},
    components: { tableDisplay },
    created() {
        this.searchRecords()	
    },
    methods: {
        humanTime,
        setDefault(record) {
            console.log(record)
        },
        printRecords(elementID) {
            printRecords(elementID, this)
        },
        toggleView() {
            this.lList = !this.lList
        },
        searchRecords() {
            const app = this;
            app.isSearch = true
            app.recordList = []
            app.search.skip = app.search.page-1;
            
            HTTP.post(app.url+'/search', app.search,{withCredentials: true}).then((response) => {
            if (response.data.Body !== null) {
                app.recordList = response.data.Body
            }
            }).catch((e) => { console.log(e) })
        },
    }
  }
</script>