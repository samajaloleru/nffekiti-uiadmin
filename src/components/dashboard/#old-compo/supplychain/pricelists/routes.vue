<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import pricelistsNew from "@/components/dashboard/supplychain/pricelists/pricelists-new"
  import pricelistsView from "@/components/dashboard/supplychain/pricelists/pricelists-view"
  import pricelistsEdit from "@/components/dashboard/supplychain/pricelists/pricelists-edit"
  import pricelistsSearch from "@/components/dashboard/supplychain/pricelists/pricelists-search"

  export default {
    children: [
      { path: '', component: pricelistsSearch, name:"pricelists-search"},
      { path: 'new', component: pricelistsNew, name:"pricelists-new"},
      { path: ':id', component: pricelistsView, name:"pricelists-view"},
      { path: ':id/edit', component: pricelistsEdit, name:"pricelists-edit"},
    ],
  }
</script>