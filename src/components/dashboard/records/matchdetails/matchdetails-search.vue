<template>
    <section>
      <div class="w-100 pa2 bg-green fixed z-999 cf inline-flex-ns items-center-ns relative">
        <div class="fl w-100 pa1 tc tl-ns pb fw5 tracked ttu f7 white ">
          Records / Match Venue & Team Colours / Search
        </div>

        <div class="white pa2 br1 tc tr-ns f7 fl w-100 db dib-ns absolute-ns left-0-ns w-80-l">
          <span class="pr4">
            1 -
            <input type="number" class="w2 green bn tc br2 bg-white" v-model.number="search.limit">
            of page
            <input type="number" class="w2 green bn tc br2 bg-white" @click="searchRecords" min="1" v-model.number="search.page"> 
          </span>
          <router-link :to="{'name':'matchdetails-new'}" class="ph2  br1 bg-near-black near-white pointer f6 tc no-underline">
            <i class="fas fa-plus"></i> New
          </router-link>
        </div>
      </div>

      <div class="cf h2 w-100 db dn-ns"></div>
      <div class="pv2 mt4 dib w-100">
        <div class="overflow-auto">
          <table-display>
            <template slot="tableHead">
              <tr class="tl bg-near-lack black f7">
                <td class="ph2 tc bg-near-black">
                  <i @click="searchRecords" class="fas near-white fa-search"></i>
                </td>
                <td class="">
                  <input type="text" v-model="search.filter.clubname" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                </td>
                <td class="">
                  <input type="text" v-model="search.filter.venue" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                </td>
                <td class="">
                  <input type="text" v-model="search.filter.stadium" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                </td>
                <td class="">
                  <input type="text" v-model="search.filter.firstcolour" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                </td>
                <td class="">
                  <input type="text" v-model="search.filter.secondcolour" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                </td>
              </tr>
              <tr class="tl bg-gray white">
                <td class=""></td>
                <td class="pa2">Club Name</td>
                <td class="pa2">Venue</td>
                <td class="pa2">Stadium Capacity</td>
                <td class="pa2">First Colour</td>
                <td class="pa2">Alternative Colour</td>
              </tr>
            </template>
            <template slot="tableBody" v-if="recordList.length > 0">
              <tr class="stripe-dark" v-for="(matchdetail, index) in recordList" :key="index">
                <td classrole="tc">
                  <router-link class="mid-gray hover-green" :to="{name:'matchdetails-view',params:{id:matchdetail.ID}}">
                    <i class="fas fa-circle"></i>
                  </router-link>
                </td>
                <td class=" pa2"> 
                  <span class="f7">#{{(index+1)+(search.skip*search.limit)}}.</span> {{matchdetail.clubname}}
                </td>
                <td class=" pa2">{{matchdetail.venue}}</td>
                <td class=" pa2">{{matchdetail.stadium}}</td>  
                <td class=" pa2">{{matchdetail.firstcolour}}</td>  
                <td class=" pa2">{{matchdetail.secondcolour}}</td>  
              </tr>
            </template>
          </table-display>
        </div>
        <div v-if="recordList.length < 1">
          <h1 class="black f6 tc ma2">There are currently no records </h1>
        </div>
      </div>
    </section>
</template>

<script type="text/javascript">
  import {HTTP} from "@/common"
  import tableDisplay from "@/components/dashboard/tableDisplay"

  export default {
    data() {return{
      url: "/api/customers", recordList: [],
      search: {text: "", field: "Fullname", limit: 50, page:1, skip: 0, filter:{}},
    }},
    components: { tableDisplay },
    created() {this.searchRecords()},
    methods: {
      searchRecords() {
        const app = this 
        app.isSearch = true
        this.recordList = []
        app.search.skip = app.search.page-1;

        HTTP.post(app.url+'/search', app.search,{withCredentials: true}).then((response) => {
          
          if (response.data.Body !== null && response.data.Body !== undefined ) {
            app.recordList = response.data.Body
          }
        }).catch((e) => { console.log(e) })
      },
    }
  }
</script>
