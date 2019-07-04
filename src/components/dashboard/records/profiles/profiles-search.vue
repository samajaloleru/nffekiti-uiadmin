<template>
    <section>

        <div class="w-100 pa2 bg-green fixed z-999 cf inline-flex-ns items-center-ns relative">
            <div class="fl w-100 pa1 tc tl-ns pb fw5 tracked ttu f7 white ">
                Records / Profile Manager / Search
            </div>

            <div class="white pa2 br1 tc tr-ns f7 fl w-100 db dib-ns absolute-ns left-0-ns w-80-l">
                <span class="pr4">
                    1 -
                    <input type="number" class="b w2 white bn tc br2 bg-green" v-model.number="search.limit">
                    of page
                    <input type="number" class="b w2 white bn tc br2 bg-green" @click="searchRecords" min="1" v-model.number="search.page"> 
                </span>
                <router-link :to="{'name':'profiles-new'}" class="ph2 br1 bg-yellow near-black b pointer f6 tc no-underline">
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
                                <input type="text" v-model="search.filter.fullname" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                            </td>
                            <td class="">
                                <input type="text" v-model="search.filter.mobile" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                            </td>
                            <td class="">
                                <input type="text" v-model="search.filter.email" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                            </td>
                            <td class="">
                                <input type="text" v-model="search.filter.rank" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                            </td>
                            <td class="">
                                <input type="text" v-model="search.filter.workflow" placeholder="Filter" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                            </td>
                            <td class="">
                                <span class="tl">
                                    Player: <input class="pa2 ba b--silver br2 bg-white " type="checkbox" v-model="search.filter.IsPlayer"> 
                                </span>
                                <span class="fr">
                                    Club Official: <input class="pa2 ba b--silver br2 bg-white " type="checkbox" v-model="search.filter.IsClubOfficial">
                                </span>
                            </td>
                        </tr>
                        <tr class="tl bg-black white">
                            <td class=""></td>
                            <td class="pa2 ">Fullname</td>
                            <td class="pa2 ">Mobile</td>
                            <td class="pa2 ">Email</td>
                            <td class="pa2 ">Rank</td>
                            <td class="pa2 ">Status</td>
                            <td class="pa2 ">Player /or/ Club Official</td>
                        </tr>
                    </template>
                    <template slot="tableBody" v-if="recordList.length > 0">
                        <tr class="stripe-dark" v-for="(profile, index) in recordList" :key="index">
                            <td class="">
                                <router-link data-glyph="eye" class="f7 oi br-pill bg-green hover-bg-dark-green ph1 pt1 near-white" :to="{name:'profiles-view',params:{id:profile.ID}}" ></router-link>
                            </td>
                            <td class=" pa2">
                                <span class="f7">#{{(index+1)+(search.skip*search.limit)}}.</span> {{profile.Fullname}}
                            </td>
                            <td class=" pa2 f7">{{profile.Mobile}}</td>
                            <td class=" pa2 f7">{{profile.Email}}</td>
                            <td class=" pa2 f7">{{profile.Occupation}}</td>
                            <td class=" pa2 f7">{{profile.Workflow}}</td>
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
      url: "/api/staffs", recordList: [],
      search: {text: "", field: "Fullname", limit: 50, page:1, skip: 0, 
          filter:{fullname:"",phone:"",station:"",state:"",workstatus:"",IsPlayer:true, IsClubOfficial:false}
        },
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
