<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import receiptsNew from "@/components/dashboard/pointofsale/receipts/receipts-new"
  import receiptsView from "@/components/dashboard/pointofsale/receipts/receipts-view"
  import receiptsEdit from "@/components/dashboard/pointofsale/receipts/receipts-edit"
  import receiptsSearch from "@/components/dashboard/pointofsale/receipts/receipts-search"

  export default {
    children: [
      { path: '', component: receiptsSearch, name:"receipts-search"},
      { path: 'new', component: receiptsNew, name:"receipts-new"},
      { path: ':id', component: receiptsView, name:"receipts-view"},
      { path: ':id/edit', component: receiptsEdit, name:"receipts-edit"},
    ],
  }
</script>