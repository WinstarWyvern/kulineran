<template>
  <div class="food-detail">
    <Navbar />
    <div class="container">
      <!-- breadcrumb -->
      <div class="row mt-4">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-dark">Home</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/foods" class="text-dark">Foods</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                <span class="text-dark">{{ product.nama }}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-md-6">
          <img
            :src="require('../assets/images/' + product.gambar)"
            class="img-fluid shadow"
          />
        </div>
        <div class="col-md-6">
          <h2>
            <strong>{{ product.nama }}</strong>
          </h2>
          <hr />
          <h4>
            Harga :
            <strong>Rp. {{ product.harga }}</strong>
          </h4>
          <form class="my-4" v-on:submit.prevent>
            <div class="form-group my-2">
              <label for="order_count">Jumlah</label>
              <input
                type="number"
                class="form-control"
                v-model="order.order_count"
              />
            </div>
            <div class="form-group my-2">
              <label for="keterangan">Keterangan</label>
              <textarea
                v-model="order.keterangan"
                class="form-control"
                placeholder="Keterangan spt : Pedes, Nasi Setengah .."
              ></textarea>
            </div>

            <b-button
              type="submit"
              class="btn btn-success mt-5"
              @click="pemesanan"
            >
              <b-icon-cart></b-icon-cart>Pesan
            </b-button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";

export default {
  name: "FoodDetailView",
  components: {
    Navbar,
  },
  data() {
    return {
      product: {},
      order: {},
    };
  },
  methods: {
    setProduct(data) {
      this.product = data;
    },
    pemesanan() {
      if (this.order.order_count) {
        this.order.products = this.product;
        axios
          .post("http://localhost:3000/cart", this.order)
          .then(() => {
            this.$toast.success("Sukses Masuk Keranjang", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
          })
          .catch((err) => console.log(err))
          .finally(() => {
            this.$router.push({ path: "/cart" });
          });
      } else {
        this.$toast.error("Jumlah Pesanan Harus diisi", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      }
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/products/" + this.$route.params.id)
      .then((response) => this.setProduct(response.data))
      .catch((error) => console.log(error));
  },
};
</script>

<style lang="scss" scoped>
</style>