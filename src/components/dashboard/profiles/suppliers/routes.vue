<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import suppliersNew from "@/components/dashboard/profiles/suppliers/suppliers-new"
  import suppliersView from "@/components/dashboard/profiles/suppliers/suppliers-view"
  import suppliersEdit from "@/components/dashboard/profiles/suppliers/suppliers-edit"
  import suppliersSearch from "@/components/dashboard/profiles/suppliers/suppliers-search"

  export default {
    children: [
      { path: '', component: suppliersSearch, name:"suppliers-search"},
      { path: 'new', component: suppliersNew, name:"suppliers-new"},
      { path: ':id', component: suppliersView, name:"suppliers-view"},
      { path: ':id/edit', component: suppliersEdit, name:"suppliers-edit"},
    ],
  }
</script>
