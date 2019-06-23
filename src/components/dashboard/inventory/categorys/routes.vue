<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import categorysNew from "@/components/dashboard/inventory/categorys/categorys-new"
  import categorysView from "@/components/dashboard/inventory/categorys/categorys-view"
  import categorysEdit from "@/components/dashboard/inventory/categorys/categorys-edit"
  import categorysSearch from "@/components/dashboard/inventory/categorys/categorys-search"

  export default {
    children: [
      { path: '', component: categorysSearch, name:"categorys-search"},
      { path: 'new', component: categorysNew, name:"categorys-new"},
      { path: ':id', component: categorysView, name:"categorys-view"},
      { path: ':id/edit', component: categorysEdit, name:"categorys-edit"},
    ],
  }
</script>