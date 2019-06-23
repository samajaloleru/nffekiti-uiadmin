<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import itemsRoutes from "@/components/dashboard/supplychain/items/routes.vue"
  import pricelistsRoutes from "@/components/dashboard/supplychain/pricelists/routes.vue"
  import quotationsRoutes from "@/components/dashboard/supplychain/quotations/routes.vue"
  import ordersRoutes from "@/components/dashboard/supplychain/orders/routes.vue"
  import invoicesRoutes from "@/components/dashboard/supplychain/invoices/routes.vue"
  import categorysRoutes from "@/components/dashboard/supplychain/categorys/routes.vue"


  export default {
    children: [
        {
          path: 'items',
          component: itemsRoutes,
          children: itemsRoutes.children
        },
        {
          path: 'pricelists',
          component: pricelistsRoutes,
          children: pricelistsRoutes.children
        },
        {
          path: 'quotations',
          component: quotationsRoutes,
          children: quotationsRoutes.children
        },
        {
          path: 'orders',
          component: ordersRoutes,
          children: ordersRoutes.children
        },
        {
          path: 'invoices',
          component: invoicesRoutes,
          children: invoicesRoutes.children
        },
        {
          path: 'categorys',
          component: categorysRoutes,
          children: categorysRoutes.children
        },
    ],
  }
</script>