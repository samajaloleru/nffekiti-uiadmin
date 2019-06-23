<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import inventoryNew from "@/components/dashboard/pointofsale/inventory/inventory-new"
  import inventoryView from "@/components/dashboard/pointofsale/inventory/inventory-view"
  import inventoryEdit from "@/components/dashboard/pointofsale/inventory/inventory-edit"
  import inventorySearch from "@/components/dashboard/pointofsale/inventory/inventory-search"

  export default {
    children: [
      { path: '', component: inventorySearch, name:"inventory-search"},
      { path: 'new', component: inventoryNew, name:"inventory-new"},
      { path: ':id', component: inventoryView, name:"inventory-view"},
      { path: ':id/edit', component: inventoryEdit, name:"inventory-edit"},
    ],
  }
</script>