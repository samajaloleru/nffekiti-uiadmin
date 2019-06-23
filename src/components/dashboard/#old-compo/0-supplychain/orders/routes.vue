<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import ordersNew from "@/components/dashboard/supplychain/orders/orders-new"
  import ordersView from "@/components/dashboard/supplychain/orders/orders-view"
  import ordersEdit from "@/components/dashboard/supplychain/orders/orders-edit"
  import ordersSearch from "@/components/dashboard/supplychain/orders/orders-search"

  export default {
    children: [
      { path: '', component: ordersSearch, name:"orders-search"},
      { path: 'new', component: ordersNew, name:"orders-new"},
      { path: ':id', component: ordersView, name:"orders-view"},
      { path: ':id/edit', component: ordersEdit, name:"orders-edit"},
    ],
  }
</script>