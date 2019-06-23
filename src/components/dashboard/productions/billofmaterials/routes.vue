<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import billofmaterialsNew from "@/components/dashboard/productions/billofmaterials/billofmaterials-new"
  import billofmaterialsView from "@/components/dashboard/productions/billofmaterials/billofmaterials-view"
  import billofmaterialsEdit from "@/components/dashboard/productions/billofmaterials/billofmaterials-edit"
  import billofmaterialsSearch from "@/components/dashboard/productions/billofmaterials/billofmaterials-search"

  export default {
    children: [
      { path: '', component: billofmaterialsSearch, name:"billofmaterials-search"},
      { path: 'new', component: billofmaterialsNew, name:"billofmaterials-new"},
      { path: ':id', component: billofmaterialsView, name:"billofmaterials-view"},
      { path: ':id/edit', component: billofmaterialsEdit, name:"billofmaterials-edit"},
    ],
  }
</script>
