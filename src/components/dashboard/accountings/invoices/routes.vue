<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import invoicesNew from "@/components/dashboard/accountings/invoices/invoices-new"
  import invoicesView from "@/components/dashboard/accountings/invoices/invoices-view"
  import invoicesEdit from "@/components/dashboard/accountings/invoices/invoices-edit"
  import invoicesSearch from "@/components/dashboard/accountings/invoices/invoices-search"

  export default {
    children: [
      { path: '', component: invoicesSearch, name:"invoices-search"},
      { path: 'new', component: invoicesNew, name:"invoices-new"},
      { path: ':id', component: invoicesView, name:"invoices-view"},
      { path: ':id/edit', component: invoicesEdit, name:"invoices-edit"},
    ],
  }
</script>
