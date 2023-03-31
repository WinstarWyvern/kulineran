<template>
  <div id="app">
    <router-view />
    <footer-component />
  </div>
</template>

<script>
import FooterComponent from "./components/Footer.vue";


export default {
  components: {
    FooterComponent,
  },
};
</script>

