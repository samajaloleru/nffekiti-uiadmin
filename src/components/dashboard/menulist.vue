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
                      <ul class="bg-washed-green absolute w-100 pa0 br2 br--bottom mt0 list " style="max-height:18em">
                        <li class="" v-for="(menu, index) in menuList" :key="index" @click="$parent.toggleMenu">
                            <span @click="menuList=[], searchtext=''">
                                <router-link class="link mid-gray w-100 fl pa2 bt b--washed-green f7" :to="menu.to">
                                    #{{index+1}} <span class="oi mh1" :data-glyph="menu.icon"></span> {{menu.title}}
                                </router-link>
                            </span>
                        </li>
                      </ul>
                  </div>
                </li>

                <li class="ph2 bg-near-black pointer" >
                    <router-link to="/admin" class="no-underline ">
                        <p class="h3 f7 inline-flex items-center mv0 light-green ">
                            <span class="oi mr2" data-glyph="dashboard"></span>
                            Dashboard
                        </p>
                    </router-link>
                </li>

                <menulistgroup title="Records" :submenu="submenu.records"/>        
                <menulistgroup title="Reports" :submenu="submenu.reports"/>
                <menulistgroup title="Maintenance" :submenu="submenu.maintenance"/>
                <menulistgroup title="System Security" :submenu="submenu.security"/>

                <li class="ph2 bg-near-black dim" >
                    <router-link  class="no-underline" to="/">
                    <p class="h3 f7 inline-flex items-center mv0 light-green ">
                        <span  class="mr2 fas sign-out-alt"></span> Logout
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
            {to:"/admin/records/teams",icon:"people",title:"Team List"},
            {to:"/admin/records/clubs",icon:"people",title:"Club Form"},
            {to:"/admin/records/players",icon:"people",title:"Players License"},
            {to:"/admin/records/agreements",icon:"people",title:"Player Agreement Form"},
            {to:"/admin/records/matchdetails",icon:"people",title:"Match Venue & Team Colours"},
        ],

        reports: [
            {to:"/admin/reports/clubs",icon:"print",title:"Club Report"},
            {to:"",icon:"print",title:"Match Report"},
            {to:"",icon:"print",title:"Player Report"},
            {to:"",icon:"print",title:"League Report"},
            {to:"/admin/reports/birthdays",icon:"print",title:"Birthday Report"},
            {to:"",icon:"print",title:"Performance Report"},
        ],


        maintenance: [
            {to:"",icon:"people",title:"Venue Setup"},
            {to:"",icon:"people",title:"League Management"},
        ],

        security: [
            {to:"/admin/security/users",icon:"people",title:"Users"},
            {to:"/admin/security/roles",icon:"cog",title:"Roles"},
            {to:"/admin/security/permissions",icon:"lock-locked",title:"Permissions"},
            {to:"/admin/security/database",icon:"cloudy",title:"Database Admin"},
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