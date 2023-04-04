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
                <span class="text-dark">{{ productGetter.nama }}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-md-6">
          <img :src="image" class="img-fluid shadow" />
        </div>
        <div class="col-md-6">
          <h2>
            <strong>{{ productGetter.nama }}</strong>
          </h2>
          <hr />
          <h4>
            Harga :
            <strong>Rp. {{ productGetter.harga }}</strong>
          </h4>
          <form class="my-4" v-on:submit.prevent>
            <div class="form-group my-2">
              <label for="order_count">Jumlah</label>
              <input type="number" class="form-control" v-model="order.order_count" />
            </div>
            <div class="form-group my-2">
              <label for="keterangan">Keterangan</label>
              <textarea v-model="order.keterangan" class="form-control"
                placeholder="Keterangan spt : Pedes, Nasi Setengah .."></textarea>
            </div>

            <b-button type="submit" class="btn btn-success mt-5" @click="pemesanan">
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
import { mapActions, mapGetters } from "vuex";


export default {
  name: "FoodDetailView",
  components: {
    Navbar,
  },
  data() {
    return {
      order: {
        keterangan: '',
        order_count: 0
      },
    };
  },
  methods: {
    ...mapActions("product", ["getSingleProductInAction", "postCartInAction"]),
    pemesanan() {
      if (this.order.order_count) {
        this.order.products = this.productGetter;
        const data = this.postCartInAction(this.order);

        if (data) {
          this.$toast.success("Sukses Masuk Keranjang", {
            type: "success",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });

          this.$router.push({ path: "/cart" });
        }
        else {
          this.$toast.danger("Gagal Masuk Keranjang", {
            type: "danger",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });
        }
      }
      // axios
      //   .post("http://localhost:3000/cart", this.order)
      //   .then(() => {
      //     this.$toast.success("Sukses Masuk Keranjang", {
      //       type: "success",
      //       position: "top-right",
      //       duration: 3000,
      //       dismissible: true,
      //     });
      //   })
      //   .catch((err) => console.log(err))
      //   .finally(() => {
      //     this.$router.push({ path: "/cart" });
      //   });
      else {
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
    this.getSingleProductInAction(this.$route.params.id);
  },
  computed: {
    ...mapGetters("product", ["productGetter"]),
    image() {
      return this.productGetter.gambar ? require('../assets/images/' + this.productGetter.gambar) : require('../assets/images/default.png')
    }
  },
};
</script>

<style lang="scss" scoped></style>