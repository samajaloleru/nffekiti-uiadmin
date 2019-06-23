import Vue from "vue"
import Router from "vue-router"

//splash-screen
// import loadingComponent from "@/components/loading"

//sign-up&in
import signinComponent from "@/components/auth/signin"
import forgotComponent from "@/components/auth/forgot"

//dashboard
import menuBasedComponent from "@/components/menuBased"

import dashboardComponent from "@/components/dashboard/home"

import profilesRoutes from "@/components/dashboard/profiles/routes.vue"
import ordersRoutes from "@/components/dashboard/orders/routes.vue"
import productionsRoutes from "@/components/dashboard/productions/routes.vue"
import accountingsRoutes from "@/components/dashboard/accountings/routes.vue"
import inventoryRoutes from "@/components/dashboard/inventory/routes.vue"



// import reportsRoutes from "@/components/dashboard/reports/routes.vue"
// import supplychainRoutes from "@/components/dashboard/supplychain/routes.vue"
// import pointofsaleRoutes from "@/components/dashboard/pointofsale/routes.vue"
// import marketingRoutes from "@/components/dashboard/marketing/routes.vue"
// import maintenanceRoutes from "@/components/dashboard/maintenance/routes.vue"
import securityRoutes from "@/components/dashboard/security/routes.vue"


import {
  checkPermissions
} from "@/common.js"

Vue.use(Router)
const router =  new Router({
    mode: "hash",
    routes: [
      { path: '', component: signinComponent },
      { path: '/signin', component: signinComponent },
      { path: '/forgot', component: forgotComponent },

      { path: '/admin', component: menuBasedComponent,
        children: [
			{ path: '', component: dashboardComponent, name: 'dashboard'},
			
			{
				path: 'profiles',
				component: profilesRoutes,
				children: profilesRoutes.children
			}, 
			
			{
				path: 'orders',
				component: ordersRoutes,
				children: ordersRoutes.children
			},
			
			{
				path: 'inventory',
				component: inventoryRoutes,
				children: inventoryRoutes.children
			},
			
			{
				path: 'productions',
				component: productionsRoutes,
				children: productionsRoutes.children
			},
			
			{
				path: 'accountings',
				component: accountingsRoutes,
				children: accountingsRoutes.children
			},
			
			{
			path: 'security',
			component: securityRoutes,
			children: securityRoutes.children
			},
      ] }

    ]
  })

router.beforeResolve((to, from, next) => {
//   checkPermissions();
  setTimeout(function () {
    next();
  }, 150);
  
})

export {router}