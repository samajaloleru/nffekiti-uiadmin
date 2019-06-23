<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import mediagalleryNew from "@/components/dashboard/marketing/mediagallery/mediagallery-new"
  import mediagalleryView from "@/components/dashboard/marketing/mediagallery/mediagallery-view"
  import mediagalleryEdit from "@/components/dashboard/marketing/mediagallery/mediagallery-edit"
  import mediagallerySearch from "@/components/dashboard/marketing/mediagallery/mediagallery-search"

  export default {
    children: [
      { path: '', component: mediagallerySearch, name:"mediagallery-search"},
      { path: 'new', component: mediagalleryNew, name:"mediagallery-new"},
      { path: ':id', component: mediagalleryView, name:"mediagallery-view"},
      { path: ':id/edit', component: mediagalleryEdit, name:"mediagallery-edit"},
    ],
  }
</script>