<template>
  <div>
    <navbar-component />
    <h2>Daftar Makanan</h2>
  </div>
</template>

<script>
import NavbarComponent from "@/components/Navbar.vue";
// @ is an alias to /src

export default {
  name: "FoodView",
  components: {
    NavbarComponent,
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
</style>