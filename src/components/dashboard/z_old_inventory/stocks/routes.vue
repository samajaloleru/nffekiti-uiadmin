<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import stocksNew from "@/components/dashboard/inventory/stocks/stocks-new"
  import stocksView from "@/components/dashboard/inventory/stocks/stocks-view"
  import stocksEdit from "@/components/dashboard/inventory/stocks/stocks-edit"
  import stocksSearch from "@/components/dashboard/inventory/stocks/stocks-search"

  export default {
    children: [
      { path: '', component: stocksSearch, name:"stocks-search"},
      { path: 'new', component: stocksNew, name:"stocks-new"},
      { path: ':id', component: stocksView, name:"stocks-view"},
      { path: ':id/edit', component: stocksEdit, name:"stocks-edit"},
    ],
  }
</script>
