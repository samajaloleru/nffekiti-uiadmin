<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import itemsRoutes from "@/components/dashboard/inventory/items/routes.vue"
  import stocksRoutes from "@/components/dashboard/inventory/stocks/routes.vue"
  import materialsRoutes from "@/components/dashboard/inventory/materials/routes.vue"
  import assetsRoutes from "@/components/dashboard/inventory/assets/routes.vue"
  import othersRoutes from "@/components/dashboard/inventory/others/routes.vue"
  import categorysRoutes from "@/components/dashboard/inventory/categorys/routes.vue"
  
  
  export default {
    children: [
		{
			path: 'items',
			component: itemsRoutes,
			children: itemsRoutes.children
		},
		{
		  path: 'stocks',
		  component: stocksRoutes,
		  children: stocksRoutes.children
		},
		{
		  path: 'materials',
		  component: materialsRoutes,
		  children: materialsRoutes.children
        },
        {
		  path: 'assets',
		  component: assetsRoutes,
		  children: assetsRoutes.children
        },
        {
		  path: 'others',
		  component: othersRoutes,
		  children: othersRoutes.children
		},
		{
			path: 'categorys',
			component: categorysRoutes,
			children: categorysRoutes.children
		},
	
    ],
  }
</script>