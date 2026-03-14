<template>
  <AppNavbar v-if="!$route.meta.hideNavber" />
  <RouterView />
  <Suspense>
    <AppFooter v-if="!$route.meta.hideFooter" />
  </Suspense>
</template>

<script setup>
import AppNavbar from "@/components/Navbar.vue";
import AppFooter from "@/components/AppFooter.vue";
</script>
