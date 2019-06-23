<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import purchasesNew from "@/components/dashboard/orders/purchases/purchases-new"
  import purchasesView from "@/components/dashboard/orders/purchases/purchases-view"
  import purchasesEdit from "@/components/dashboard/orders/purchases/purchases-edit"
  import purchasesSearch from "@/components/dashboard/orders/purchases/purchases-search"

  export default {
    children: [
      { path: '', component: purchasesSearch, name:"purchases-search"},
      { path: 'new', component: purchasesNew, name:"purchases-new"},
      { path: ':id', component: purchasesView, name:"purchases-view"},
      { path: ':id/edit', component: purchasesEdit, name:"purchases-edit"},
    ],
  }
</script>
