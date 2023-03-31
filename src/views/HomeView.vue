<template>
  <div class="home">
    <NavbarComponent />
    <div class="container">
      <hero-component />

      <div class="row mt-4 mb-4">
        <div class="col">
          <h2>Best <strong>Food</strong></h2>
        </div>
        <div class="col">
          <router-link to="/foods" class="btn btn-lg btn-success float-end">
            <b-icon-eye-fill /> Lihat Semua
          </router-link>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-md-4" v-for="product in products" :key="product.id">
          <CardProductComponent :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavbarComponent from "@/components/Navbar.vue";
import HeroComponent from "@/components/Hero.vue";
import CardProductComponent from "@/components/CardProduct.vue";
import axios from "axios";

export default {
  name: "HomeView",
  components: {
    NavbarComponent,
    HeroComponent,
    CardProductComponent,
  },
  data() {
    return {
      products: [],
    };
  },
  async mounted() {
    await axios
      .get("http://localhost:3000/best-products")
      .then((response) => this.setProduct(response.data))
      .catch((error) => console.log(error));
  },
  methods: {
    setProduct(data) {
      this.products = data;
    },
  },
};
</script>
