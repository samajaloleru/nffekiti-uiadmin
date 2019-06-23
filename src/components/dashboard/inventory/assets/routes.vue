<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import assetsNew from "@/components/dashboard/inventory/assets/assets-new"
  import assetsView from "@/components/dashboard/inventory/assets/assets-view"
  import assetsEdit from "@/components/dashboard/inventory/assets/assets-edit"
  import assetsSearch from "@/components/dashboard/inventory/assets/assets-search"

  export default {
    children: [
      { path: '', component: assetsSearch, name:"assets-search"},
      { path: 'new', component: assetsNew, name:"assets-new"},
      { path: ':id', component: assetsView, name:"assets-view"},
      { path: ':id/edit', component: assetsEdit, name:"assets-edit"},
    ],
  }
</script>
