<template>
    <section>
      <div class="w-100 pa2 bg-green fixed z-999 cf inline-flex-ns items-center-ns relative">
        <div class="fl w-100 pa1 tc tl-ns pb fw5 tracked ttu f7 white ">
            System Security / Permissions / Search
        </div>

        <div class="white pa2 br1 tc tr-ns f7 fl w-100 db dib-ns absolute-ns left-0-ns w-80-l">
          <span class="pr4">
            1 -
            <input type="number" class="w2 green bn tc br2 bg-white" v-model.number="search.limit">
            of page
            <input type="number" class="w2 green bn tc br2 bg-white" @click="searchRecords" min="1" v-model.number="search.page"> 
          </span>
          <router-link :to="{'name':'permissions-new'}" class="ph2  br1 bg-near-black near-white pointer f6 tc no-underline">
              <i class="fas fa-plus"></i> New
          </router-link>
        </div>
      </div>
      
      <div class="w-100 fl h3"></div>
      
      <div class="pv2 fl w-100">
        <table-display>
          <template slot="tableHead">
            <tr class="tl bg-near-lack black f7">
              <td class="tc bg-near-black">
                <i @click="searchRecords" class="fas near-white fa-search"></i>
              </td>
              <td class="">
                <input type="text" v-model="search.filter.title" placeholder="Title" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
              </td>
              <td class="">
                <input type="text" v-model="search.filter.status" placeholder="Status" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
              </td>
              <td class="">
                <input type="text" v-model="search.filter.code" placeholder="Url Code" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
              </td>
              <td class="">
                <input type="text" v-model="search.filter.method" placeholder="Method" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
              </td>
              <td class="">
                <input type="text" v-model="search.filter.workflow" placeholder="Action" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
              </td>
              <td class="">
                <input type="text" v-model="search.filter.workflow" placeholder="Description" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
              </td>
            </tr>
            <tr class="tl bg-gray white">
              <td class=""></td>
              <td class="pa2">Title</td>
              <td class="pa2">Status</td>
              <td class="pa2">Url Code</td>
              <td class="pa2">Method</td>
              <td class="pa2">Action</td>
              <td class="pa2">Description</td>
            </tr>
          </template>
          <template slot="tableBody" v-if="recordList.length > 0">
            <tr class="stripe-dark" v-for="(user, index) in recordList" :key="index">
              <td class="tc">
                <router-link class="mid-gray hover-green" :to="{name:'users-view',params:{id:user.ID}}">
                  <i class="fas fa-circle"></i>
                </router-link>
              </td>
              <td class=" pa2"> 
                <span class="f7">#{{(index+1)+(search.skip*search.limit)}}.</span> {{user.Title}}
              </td>
              <td class=" pa2">{{user.Status}}</td>
              <td class=" pa2">{{user.Code}}</td>
              <td class=" pa2">{{user.Method}}</td>  
              <td class=" pa2">{{user.Action}}</td>  
              <td class=" pa2">{{user.Description}}</td>  
            </tr>
          </template>
        </table-display>

        <div v-if="recordList.length < 1">
          <h1 class="black f6 tc ma5">There are currently no users record </h1>
        </div>
    </div>
      
    </section>
</template>

<script type="text/javascript">
  import {HTTP} from "@/common"
  import tableDisplay from "@/components/dashboard/tableDisplay"
  export default {
    data() {return{
      url: "/api/permissions", recordList: [],
      search: {text: "", field: "Title", limit: 50, page:1, skip: 0, filter:{}},
    }},
    components: { tableDisplay },
    created() {this.searchRecords()},
    methods: {
      searchRecords() {
        const app = this
        app.isSearch = true
        HTTP.post(app.url+'/search', app.search,{withCredentials: true}).then((response) => {
          if (response.data.Body !== null ) {
            app.recordList = response.data.Body
          }
        }).catch((e) => { console.log(e) })
      },
    }
  }
</script>