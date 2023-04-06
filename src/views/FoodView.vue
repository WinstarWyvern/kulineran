<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="row mt-4">
        <div class="col">
          <h2>
            Daftar
            <strong>Makanan</strong>
          </h2>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col">
          <div class="input-group mb-3">
            <input
              v-model="search"
              type="text"
              class="form-control"
              placeholder="Cari Makanan Kesukaan Anda .."
              aria-label="Cari"
              aria-describedby="basic-addon1"
            />
            <button
              class="input-group-text btn btn-primary"
              @click="searchFood"
            >
              <b-icon-search></b-icon-search>
            </button>
          </div>
        </div>
      </div>

      <div class="row mb-4">
        <div
          class="col-md-4 mt-4"
          v-for="product in productsGetter"
          :key="product.id"
        >
          <CardProduct :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import CardProduct from "@/components/CardProduct.vue";
import { mapActions, mapGetters } from "vuex";
import router from "@/router";

export default {
  name: "FoodComponent",
  components: {
    Navbar,
    CardProduct,
  },
  data() {
    return {
      search: "",
    };
  },
  methods: {
    searchFood() {
      this.getProductsInAction(this.search);
    },
    ...mapActions("product", ["getProductsInAction"]),
    // getData() {
    // this.$store.dispatch("product/getProductsInAction");
    // this.setProducts(this.$store.state.product.products);
    // }
  },
  mounted() {
    // this.getData();
    this.getProductsInAction();
  },
  computed: {
    ...mapGetters("product", ["productsGetter"]),
  },
  watch: {
    search() {
      router.push({ path: "foods", query: { search: this.search } });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>