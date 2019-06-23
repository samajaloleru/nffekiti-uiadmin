<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import cashregisterRoutes from "@/components/dashboard/pointofsale/cashregister/routes.vue"
  import inventoryRoutes from "@/components/dashboard/pointofsale/inventory/routes.vue"
  import receiptsRoutes from "@/components/dashboard/pointofsale/receipts/routes.vue"
  import salesRoutes from "@/components/dashboard/pointofsale/sales/routes.vue"

  export default {
    children: [
        {
          path: 'cashregister',
          component: cashregisterRoutes,
          children: cashregisterRoutes.children
        },
        {
          path: 'inventory',
          component: inventoryRoutes,
          children: inventoryRoutes.children
        },
        {
          path: 'receipts',
          component: receiptsRoutes,
          children: receiptsRoutes.children
        },
        {
          path: 'sales',
          component: salesRoutes,
          children: salesRoutes.children
        },
    ],
  }
</script>