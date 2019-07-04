<template>
    <section class="pa2 pa3-l">
      <div class="w-100 pa2 bg-light-gray br2 cf inline-flex items-center relative">
        <div class="fl bg-light-gray pa2 pb fw5 tracked ttu f7 black ">
          Player / Search
        </div>

        <router-link :to="{'name':'players-new'}" class="fl right-1 absolute ph2 pv1 br4 bg-red hover-bg-dark-red grow-ns pointer f6 white tc no-underline">
          + New
        </router-link>
      </div>

      <div class="cf pv3"></div>

      <div class="cf w-100">
        <div class="black fl w-50 dib tl h2 f7">
          <span class="bg-black white pa2 br1 fl">page: 
            <input type="number" class="w3 black bn tc br2 bg-white " @click="searchRecords" min="1" v-model.number="search.page">
          </span>
        </div>
        <div class="black fr w-50 dib tr h2 f7">
          <span class="bg-black white pa2 br1 fr">
            <input type="number" class="w3 black bn tc br2 bg-white " v-model.number="search.limit">
            records
          </span>
        </div>
      </div>

      <table-display>
        <template slot="tableHead">
          <tr class="tl bg-black black f7">
            <td class="tc">
              <span @click="searchRecords" class="oi bg-green white pv1 b db" data-glyph="magnifying-glass"></span>
            </td>
            <td class="">
              <input type="text" v-model="search.filter.fullname" placeholder="Fullname" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
            </td>
            <td class="">
              <input type="text" v-model="search.filter.mobile" placeholder="Mobile" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
            </td>
            <td class="">
              <input type="text" v-model="search.filter.email" placeholder="Email" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
            </td>
            <td class="">
              <input type="text" v-model="search.filter.city" placeholder="City" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
            </td>
            <td class="">
              <input type="text" v-model="search.filter.workflow" placeholder="Status" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
            </td>
          </tr>
          <tr class="tl bg-black white">
            <td class=""></td>
            <td class="pa2 ">Fullname</td>
            <td class="pa2 ">Mobile</td>
            <td class="pa2 ">Email</td>
            <td class="pa2 ">City</td>
            <td class="pa2 ">Status</td>
          </tr>
        </template>
        <template slot="tableBody" v-if="recordList.length > 0">
          <tr class="stripe-dark" v-for="(customer, index) in recordList" :key="index">
            <td class="">
              <router-link data-glyph="eye" class="f7 oi br-pill bg-green hover-bg-dark-green ph1 pt1 near-white" :to="{name:'customers-view',params:{id:customer.ID}}" >
              </router-link>
            </td>
            <td class=" pa2">
              <span class="f7">#{{(index+1)+(search.skip*search.limit)}}.</span> {{customer.Fullname}}
            </td>
            <td class=" pa2 f7">{{customer.Mobile}}</td>
            <td class=" pa2 f7">{{customer.Email}}</td>
            <td class=" pa2 f7">{{customer.City}}</td>
            <td class=" pa2 f7">{{customer.Workflow}}</td>
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
