<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import blogsNew from "@/components/dashboard/marketing/blogs/blogs-new"
  import blogsView from "@/components/dashboard/marketing/blogs/blogs-view"
  import blogsEdit from "@/components/dashboard/marketing/blogs/blogs-edit"
  import blogsSearch from "@/components/dashboard/marketing/blogs/blogs-search"

  export default {
    children: [
      { path: '', component: blogsSearch, name:"blogs-search"},
      { path: 'new', component: blogsNew, name:"blogs-new"},
      { path: ':id', component: blogsView, name:"blogs-view"},
      { path: ':id/edit', component: blogsEdit, name:"blogs-edit"},
    ],
  }
</script>