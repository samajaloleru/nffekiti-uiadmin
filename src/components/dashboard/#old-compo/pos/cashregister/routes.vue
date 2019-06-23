<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import cashregisterNew from "@/components/dashboard/pointofsale/cashregister/cashregister-new"
  import cashregisterView from "@/components/dashboard/pointofsale/cashregister/cashregister-view"
  import cashregisterEdit from "@/components/dashboard/pointofsale/cashregister/cashregister-edit"
  import cashregisterSearch from "@/components/dashboard/pointofsale/cashregister/cashregister-search"

  export default {
    children: [
      { path: '', component: cashregisterSearch, name:"cashregister-search"},
      { path: 'new', component: cashregisterNew, name:"cashregister-new"},
      { path: ':id', component: cashregisterView, name:"cashregister-view"},
      { path: ':id/edit', component: cashregisterEdit, name:"cashregister-edit"},
    ],
  }
</script>