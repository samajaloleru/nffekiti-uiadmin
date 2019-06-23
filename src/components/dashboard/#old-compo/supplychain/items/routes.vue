<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import itemsNew from "@/components/dashboard/supplychain/items/items-new"
  import itemsView from "@/components/dashboard/supplychain/items/items-view"
  import itemsEdit from "@/components/dashboard/supplychain/items/items-edit"
  import itemsSearch from "@/components/dashboard/supplychain/items/items-search"

  export default {
    children: [
      { path: '', component: itemsSearch, name:"items-search"},
      { path: 'new', component: itemsNew, name:"items-new"},
      { path: ':id', component: itemsView, name:"items-view"},
      { path: ':id/edit', component: itemsEdit, name:"items-edit"},
    ],
  }
</script>