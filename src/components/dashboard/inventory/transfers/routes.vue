<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import salesNew from "@/components/dashboard/orders/sales/sales-new"
  import salesView from "@/components/dashboard/orders/sales/sales-view"
  import salesEdit from "@/components/dashboard/orders/sales/sales-edit"
  import salesSearch from "@/components/dashboard/orders/sales/sales-search"

  export default {
    children: [
      { path: '', component: salesSearch, name:"sales-search"},
      { path: 'new', component: salesNew, name:"sales-new"},
      { path: ':id', component: salesView, name:"sales-view"},
      { path: ':id/edit', component: salesEdit, name:"sales-edit"},
    ],
  }
</script>
