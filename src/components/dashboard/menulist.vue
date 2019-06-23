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
        
        <menulistgroup title="Profiles" :submenu="submenu.profiles"/>        
        <menulistgroup title="Inventory" :submenu="submenu.inventory"/>
        <menulistgroup title="Production Manager" :submenu="submenu.production"/>
        <menulistgroup title="Order Manager" :submenu="submenu.orders"/>
        <menulistgroup title="Financial Accounting" :submenu="submenu.accounting"/>
        <menulistgroup title="System Security" :submenu="submenu.security"/>

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
   
    profiles: [
        {to:"/admin/profiles/players",icon:"people",title:"Players"},
        {to:"/admin/profiles/suppliers",icon:"people",title:"Suppliers"},
        {to:"/admin/profiles/staffs",icon:"people",title:"Staffs"},
        {to:"/admin/profiles/documents",icon:"box",title:"Documents"},
        {to:"/admin/profiles/settings",icon:"cog",title:"Settings"},
    ],

    orders: [
        {to:"/admin/orders/pricelists",icon:"list-rich",title:"Pricelists"},
        {to:"/admin/orders/sales",icon:"list-rich",title:"Sales Order"},
        {to:"/admin/orders/purchases",icon:"list-rich",title:"Purchase Orders"},
        {to:"/admin/orders/receivings",icon:"list-rich",title:"Order Receivings"},
    ],

    inventory: [
    //   {to:"/admin/inventory/items",icon:"list-rich",title:"Items"},
      {to:"/admin/inventory/stocks",icon:"list-rich",title:"Stock Inventory"},
      {to:"/admin/inventory/materials",icon:"list-rich",title:"Material Inventory"},
      {to:"/admin/inventory/assets",icon:"list-rich",title:"Asset Inventory"},
      {to:"/admin/inventory/others",icon:"list-rich",title:"Others Inventory"},
    //   {to:"/admin/inventory/categorys",icon:"list-rich",title:"Categories"},
    ],

    production: [
      {to:"/admin/productions/billofmaterials",icon:"list-rich",title:"Product Bible"},
      {to:"/admin/productions/workorders",icon:"document",title:"Cutting Sheet"},
      {to:"/admin/productions/workorders",icon:"document",title:"Work Orders"},
    ],
    
    productionOLD: [
      {to:"/admin/productions/billofmaterials",icon:"list-rich",title:"Bill of Materials"},
      {to:"/admin/productions/workorders",icon:"document",title:"Work Orders"},
      {to:"/admin/productions/processing",icon:"loop-circular",title:"Processing"},
    ],

    accounting: [
      {to:"/admin/accountings/invoices",icon:"list-rich",title:"Invoices"},
      {to:"/admin/accountings/accounts",icon:"list-rich",title:"Accounts"},
      {to:"/admin/accountings/journals",icon:"list-rich",title:"Journals"},
      {to:"/admin/accountings/ledgers",icon:"loop-circular",title:"Ledgers"},
    ],

    security: [
      {to:"/admin/security/users",icon:"people",title:"Users"},
			{to:"/admin/security/roles",icon:"cog",title:"Roles"},
			{to:"/admin/security/permissions",icon:"lock-locked",title:"Permissions"},
			// {to:"/admin/security/sshserver",icon:"terminal",title:"SSH Server"},
			// {to:"/admin/security/caddyserver",icon:"globe",title:"Caddy Server"},
			{to:"/admin/security/database",icon:"cloudy",title:"Database Admin"},
    ],

    //REMOVE BELOW MENUS

    marketing: [
      {to:"/admin/marketing/seocontents",icon:"graph",title:"SEO"},
			{to:"/admin/marketing/blogs",icon:"bullhorn",title:"Blogs"},
			{to:"/admin/marketing/campaigns",icon:"browser",title:"Campaigns"},
			{to:"/admin/marketing/newsletters",icon:"envelope-open",title:"Newsletters"},
			{to:"/admin/marketing/medias",icon:"image",title:"Media Gallery"},
    ],

    accountingOLD: [
      {to:"/admin/accounting/charts",icon:"box",title:"Ledgers"},
			{to:"/admin/accounting/accounts",icon:"book",title:"Accounts"},
			{to:"/admin/accounting/journals",icon:"document",title:"Journals"},
			{to:"/admin/accounting/reports",icon:"print",title:"Reports"},
    ],

    supplychain: [
      {to:"/admin/supplychain/items",icon:"list-rich",title:"Items"},
			{to:"/admin/supplychain/pricelists",icon:"list-rich",title:"Pricelists"},
			{to:"/admin/supplychain/quotations",icon:"document",title:"Quotations"},
			{to:"/admin/supplychain/orders",icon:"document",title:"Orders"},
			{to:"/admin/supplychain/invoices",icon:"document",title:"Invoices"},
			{to:"/admin/supplychain/categorys",icon:"cog",title:"Categorys"}, 
    ],

    analytics: [
      {to:"/admin/analytics/hits",icon:"target",title:"Hits"},
			{to:"/admin/analytics/blacklists",icon:"ban",title:"Blacklists"},
			{to:"/admin/analytics/activations",icon:"task",title:"Activations"},
    ],

    communications: [
      {to:"/admin/communications/sms",icon:"phone",title:"SMS"},
			{to:"/admin/communications/ssh",icon:"terminal",title:"SSH"},
			{to:"/admin/communications/smtp",icon:"envelope-closed",title:"SMTP"},
			{to:"/admin/communications/domains",icon:"globe",title:"Domains"},
			{to:"/admin/communications/documentations",icon:"document",title:"Documentations"},
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