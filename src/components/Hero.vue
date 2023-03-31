<template>
  <div class="hero">
    <!-- Desktop -->
    <div class="d-none d-md-block">
      <div class="row d-flex justify-content-evenly align-items-center mt-4">
        <div class="col-md-6 text-center">
          <h2><strong>Delicious & Cheap Food Menu</strong>,</h2>
          <h2>In Your Gadget</h2>
          <p>Ayo Segera Pesan Makananmu</p>
          <router-link class="btn btn-lg btn-success" to="/food">
            <b-icon-arrow-right /> Pesan
          </router-link>
        </div>
        <div class="col-md-6">
          <img src="../assets/images/ilustrasi.png" width="100%" alt="" />
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <div class="d-sm-block d-md-none">
      <div class="row d-flex justify-content-evenly align-items-center mt-4">
        <div class="col-md-6">
          <img src="../assets/images/ilustrasi.png" width="100%" alt="" />
        </div>
        <div class="col-md-6 text-center">
          <h2><strong>Delicious & Cheap Food Menu</strong>,</h2>
          <h2>In Your Gadget</h2>
          <p>Ayo Segera Pesan Makananmu</p>
          <button class="btn btn-lg btn-success">
            <b-icon-arrow-right /> Pesan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeroComponent",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
