<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import invoicesRoutes from "@/components/dashboard/accountings/invoices/routes.vue"
  import accountsRoutes from "@/components/dashboard/accountings/accounts/routes.vue"
  
  
  export default {
    children: [
		{
			path: 'invoices',
			component: invoicesRoutes,
			children: invoicesRoutes.children
		},
			{
			path: 'accounts',
			component: accountsRoutes,
			children: accountsRoutes.children
		},
    ],
  }
</script>