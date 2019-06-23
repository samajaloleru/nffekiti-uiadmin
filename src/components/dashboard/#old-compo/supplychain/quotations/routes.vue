<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import quotationsNew from "@/components/dashboard/supplychain/quotations/quotations-new"
  import quotationsView from "@/components/dashboard/supplychain/quotations/quotations-view"
  import quotationsEdit from "@/components/dashboard/supplychain/quotations/quotations-edit"
  import quotationsSearch from "@/components/dashboard/supplychain/quotations/quotations-search"

  export default {
    children: [
      { path: '', component: quotationsSearch, name:"quotations-search"},
      { path: 'new', component: quotationsNew, name:"quotations-new"},
      { path: ':id', component: quotationsView, name:"quotations-view"},
      { path: ':id/edit', component: quotationsEdit, name:"quotations-edit"},
    ],
  }
</script>