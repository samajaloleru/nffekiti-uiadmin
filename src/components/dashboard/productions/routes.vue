<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import billofmaterialsRoutes from "@/components/dashboard/productions/billofmaterials/routes.vue"
  import workordersRoutes from "@/components/dashboard/productions/workorders/routes.vue"
  
  
  export default {
    children: [
		{
			path: 'billofmaterials',
			component: billofmaterialsRoutes,
			children: billofmaterialsRoutes.children
		},
		
		{
			path: 'workorders',
			component: workordersRoutes,
			children: workordersRoutes.children
		},
		
    ],
  }
</script>