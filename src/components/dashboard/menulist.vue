<template>
    <div class="w-80 w-40-m w-20-l fl-l">
        <div class="cf h3 w-100 dn db-l"></div>
        <nav class="vh-100 overflow-y-auto w-100 w-20-l fixed">
            <ul class="list pt0 ph0 mt0">
                <slot></slot>

                <li class="bg-light-gray"> 
                    <div class="pa2 bg-green fl w-100">
                        <input class="fl f7 bn pa1 br1 bg-white mid-gray w-100 " type="text" placeholder="Search Menu" @keyup="searchMenu" v-model="searchtext">
                    </div>
                    <div class="fl relative w-100">
                      <ul class="bg-near-white absolute w-100 pa0 br2 br--bottom mt0 list " style="max-height:18em">
                        <li class="" v-for="(menu, index) in menuList" :key="index" @click="$parent.toggleMenu">
                            <span @click="menuList=[], searchtext=''">
                                <router-link class="link mid-gray w-100 fl pa2 bt b--light-gray f7" :to="menu.to">
                                    #{{index+1}} <i class="mh1 fal" :class="menu.icon"></i> {{menu.title}}
                                </router-link>
                            </span>
                        </li>
                      </ul>
                  </div>
                </li>

                <li class="ph2 bg-mid-gray pointer" >
                    <router-link to="/admin" class="no-underline ">
                        <p class="h3 f7 inline-flex items-center mv0 near-white ">
                            <i class="mr1 fal fa-home" ></i>
                            Dashboard
                        </p>
                    </router-link>
                </li>

                <menulistgroup title="Records" :submenu="submenu.records"/>        
                <menulistgroup title="Reports" :submenu="submenu.reports"/>
                <menulistgroup title="Maintenance" :submenu="submenu.maintenance"/>
                <menulistgroup title="System Security" :submenu="submenu.security"/>

                <li class="ph2 bg-mid-gray dim" >
                    <router-link  class="no-underline" to="/">
                    <p class="h3 f7 inline-flex items-center mv0 near-white ">
                        <i class="mr1 fal fa-sign-out-alt" ></i>
                        Logout
                    </p>
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script type="text/javascript">
    import menulistgroupComponent from "@/components/dashboard/menulistgroup"
    
    const submenu = {
        records: [
            {to:"/admin/records/teams",icon:"fa-clipboard-list",title:"Team List"},
            {to:"/admin/records/clubs",icon:"fa-folders",title:"Club Form"},
            {to:"/admin/records/players",icon:"fa-id-card",title:"Players License"},
            {to:"/admin/records/agreements",icon:"fa-handshake",title:"Player Agreement Form"},
            {to:"/admin/records/matchdetails",icon:"fa-futbol",title:"Match Venue & Team Colours"},
        ],

        reports: [
            {to:"/admin/reports/clubs",icon:"fa-print-search",title:"Club Report"},
            {to:"",icon:"fa-print-search",title:"Match Report"},
            {to:"",icon:"fa-print-search",title:"Player Report"},
            {to:"",icon:"fa-print-search",title:"League Report"},
            {to:"/admin/reports/birthdays",icon:"fa-print-search",title:"Birthday Report"},
            {to:"",icon:"fa-print-search",title:"Performance Report"},
        ],


        maintenance: [
            {to:"/admin/maintenance/venues",icon:"fa-futbol",title:"Venue Setup"},
            {to:"/admin/maintenance/leagues",icon:"fa-sitemap",title:"League Management"},
        ],

        security: [
            {to:"/admin/security/users",icon:"fa-users",title:"Users"},
            {to:"/admin/security/roles",icon:"fa-user-tag",title:"Roles"},
            {to:"/admin/security/permissions",icon:"fa-user-lock",title:"Permissions"},
            {to:"/admin/security/database",icon:"fa-database",title:"Database Admin"},
        ],
    }

    export default {
        data() {return{
            submenu, searchtext:"", menuList:[],
        }},
        components: {
            "menulistgroup": menulistgroupComponent,
        },
        methods:{
            searchMenu(){
                this.menuList = []
                var menuList = []
                
                if (this.searchtext.length > 2 ){
                    for (var menu in submenu) {
                        for (var j=0; j < submenu[menu].length; j++){
                            var searchString = submenu[menu][j].title
                            if (searchString.toLowerCase().indexOf(this.searchtext.toLowerCase()) != -1){
                                menuList.push(submenu[menu][j]);
                            }
                        }
                    }
                }
                this.menuList = menuList
            }
        
        }
    }
</script>