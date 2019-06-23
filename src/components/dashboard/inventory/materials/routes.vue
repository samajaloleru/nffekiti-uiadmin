<template>
  <router-view></router-view>
</template>

<script type="text/javascript">
import materialsNew from "@/components/dashboard/inventory/materials/materials-new";
import materialsView from "@/components/dashboard/inventory/materials/materials-view";
import materialsEdit from "@/components/dashboard/inventory/materials/materials-edit";
import materialsSearch from "@/components/dashboard/inventory/materials/materials-search";

export default {
  children: [
    { path: "", component: materialsSearch, name: "materials-search" },
    { path: "new", component: materialsNew, name: "materials-new" },
    { path: ":id", component: materialsView, name: "materials-view" },
    { path: ":id/edit", component: materialsEdit, name: "materials-edit" }
  ]
};
</script>
