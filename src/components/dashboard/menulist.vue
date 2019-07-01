<template>
    <div class="w-80 w-40-m w-20-l fl-l">
        <nav class="vh-100 overflow-y-auto w-100 w-20-l fixed">
            <ul class="list pt0 ph0 mt0">
                <slot></slot>

<<<<<<< HEAD
        <li class="ph2 bg-black dim" >
        <router-link to="/admin" class="no-underline ">
          <p class="h3 f7 inline-flex items-center mv0 white ">
            <span class="oi mr2" data-glyph="dashboard"></span>
            Dashboard
          </p>
        </router-link>
         </li>
        
        <menulistgroup title="Records" :submenu="submenu.records"/>        
        <menulistgroup title="Reports" :submenu="submenu.reports"/>
        <menulistgroup title="Maintenance" :submenu="submenu.maintenance"/>
        <menulistgroup title="Security" :submenu="submenu.security"/>


          <li class="ph2 bg-black-80 dim" >
            <router-link  class="no-underline" to="/">
              <p class="h3 f7 inline-flex items-center mv0 white ">
                <span class="oi mr2" data-glyph="account-logout"></span>
                Logout
              </p>
            </router-link>
          </li>
      </ul>
    </nav>
    
    <div class="menulist"></div>
  </div>
</template>
<script type="text/javascript">
  import menulistgroupComponent from "@/components/dashboard/menulistgroup"
  const submenu = {
   
    records: [
        {to:"/admin/records/matches",icon:"people",title:"Matches"},
        {to:"/admin/records/players",icon:"people",title:"Players"},
        {to:"/admin/records/clubs",icon:"people",title:"Clubs"},
    ],

    reports: [
        {to:"/admin/reports/club report",icon:"list-rich",title:"Club Report"},
        {to:"/admin/reports/match report",icon:"list-rich",title:"Match Report"},
        {to:"/admin/reports/player report",icon:"list-rich",title:"Player Report"},
        {to:"/admin/reports/league report",icon:"list-rich",title:"League Report"},
        {to:"/admin/reports/birthday report",icon:"list-rich",title:"Birthday Report"},
        {to:"/admin/reports/performance report",icon:"list-rich",title:"Performance Report"},
    ],


    maintenance: [
      {to:"/admin/maintenance/leagues",icon:"list-rich",title:"Leagues"},
      {to:"/admin/maintenance/stadiums",icon:"document",title:"Stadiums"},
      {to:"/admin/maintenance/printers",icon:"document",title:"Printers"},
    ],

    security: [
      {to:"/admin/security/users",icon:"people",title:"Users"},
			{to:"/admin/security/roles",icon:"cog",title:"Roles"},
			{to:"/admin/security/permissions",icon:"lock-locked",title:"Permissions"},
			// {to:"/admin/security/sshserver",icon:"terminal",title:"SSH Server"},
			// {to:"/admin/security/caddyserver",icon:"globe",title:"Caddy Server"},
			{to:"/admin/security/database",icon:"cloudy",title:"Database Admin"},
    ],

    
  }
  export default {
    data() {return{
      submenu
    }},
    components: {
      "menulistgroup": menulistgroupComponent,
    },
  }
=======
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
        
        <div class="menulist"></div>
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
            {to:"",icon:"print",title:"Club Report"},
            {to:"",icon:"print",title:"Match Report"},
            {to:"",icon:"print",title:"Player Report"},
            {to:"",icon:"print",title:"League Report"},
            {to:"",icon:"print",title:"Birthday Report"},
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
>>>>>>> 36bf25fdef33d13f0a94841b9ff88ec4774d3518
</script>