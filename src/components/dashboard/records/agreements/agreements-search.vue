<template>
    <section>
      <div class="w-100 pa2 bg-green fixed z-999 cf inline-flex-ns items-center-ns relative">
        <div class="fl w-100 pa1 tc tl-ns pb fw5 tracked ttu f7 white ">
          Records / Player Agreement / Search
        </div>

        <div class="white pa2 br1 tc tr-ns f7 fl w-100 db dib-ns absolute-ns left-0-ns w-80-l">
          <span class="pr4">
            1 -
            <input type="number" class="b w2 white bn tc br2 bg-green" v-model.number="search.limit">
            of page
            <input type="number" class="b w2 white bn tc br2 bg-green" @click="searchRecords" min="1" v-model.number="search.page"> 
          </span>
          <router-link :to="{'name':'club-new'}" class="ph2 br1 bg-yellow near-black b pointer f6 tc no-underline">
            <i class="fal fa-plus"></i> NEW
          </router-link>
        </div>
      </div>

      <div class="cf h2 w-100 db dn-ns"></div>
      <div class="pv2 mt4 dib w-100">
        <div class="overflow-auto">
          <table-display>
            <template slot="tableHead">
              <tr class="tl black f7">
                <td class="w1 ph2 tc bg-near-white">
                  <i @click="searchRecords" class="fas near-black fa-search"></i>
                </td>
                <td class="">
                  <input type="text" v-model="search.filter.playername" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                </td>
                <td class="">
                  <input type="text" v-model="search.filter.licenseno" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                </td>
                <td class="">
                  <input type="text" v-model="search.filter.playerno" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                </td>
                <td class="">
                  <input type="text" v-model="search.filter.yearfounded" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                </td>
                <td class="">
                  <input type="text" v-model="search.filter.club" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                </td>
              </tr>
              <tr class="tl bg-near-white near-black">
                <td class=""></td>
                <td class="pa2">Player Name</td>
                <td class="pa2">License No</td>
                <td class="pa2">Player ID</td>
                <td class="pa2">Year Founded</td>
                <td class="pa2">Club</td>
              </tr>
            </template>
            <template slot="tableBody" v-if="recordList.length > 0">
              <tr class="stripe-dark" v-for="(club, index) in recordList" :key="index">
                <td class="tc">
                  <router-link class="mid-gray hover-green" :to="{name:'clubs-view',params:{id:club.ID}}">
                    <i class="fas fa-circle"></i>
                  </router-link>
                </td>
                <td class=" pa2"> 
                  <span class="f7">#{{(index+1)+(search.skip*search.limit)}}.</span> {{club.playername}}
                </td>
                <td class=" pa2">{{club.licenseno}}</td>
                <td class=" pa2">{{club.playerno}}</td>  
                <td class=" pa2">{{club.yearfounded}}</td>  
                <td class=" pa2">{{club.club}}</td>  
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
