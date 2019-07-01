<template>
  <div class="w-50 w-30-m w-20-l fl-l">
    <nav class="vh-100 overflow-y-scroll w-20-l fixed bg-near-white">
      <ul class="list pt0 ph0 mt0">
        <slot ></slot>

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
</script>