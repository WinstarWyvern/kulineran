<template>
  <div class="home">
    <NavbarComponent />
    <div class="container">
      <hero-component />
    </div>
  </div>
</template>

<script>
import NavbarComponent from "@/components/Navbar.vue";
import HeroComponent from "@/components/Hero.vue";
// @ is an alias to /src

export default {
  name: "HomeView",
  components: {
    NavbarComponent,
    HeroComponent,
  },
};
</script>
