<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import salesRoutes from "@/components/dashboard/orders/sales/routes.vue"
  import pricelistsRoutes from "@/components/dashboard/orders/pricelists/routes.vue"
  import purchasesRoutes from "@/components/dashboard/orders/purchases/routes.vue"
  import receivingsRoutes from "@/components/dashboard/orders/receivings/routes.vue"
  
  
  export default {
    children: [
      {
        path: 'sales',
        component: salesRoutes,
        children: salesRoutes.children
      },
      {
        path: 'pricelists',
        component: pricelistsRoutes,
        children: pricelistsRoutes.children
      },
      {
        path: 'purchases',
        component: purchasesRoutes,
        children: purchasesRoutes.children
      },
      {
        path: 'receivings',
        component: receivingsRoutes,
        children: receivingsRoutes.children
      },
    ],
  }
</script>