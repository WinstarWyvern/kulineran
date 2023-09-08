<template>
  <div>
    <Navbar :updateKeranjang="cartsGetter"/>
    <div class="container" v-if="cartsGetter <= 0">
      <div class="row mt-4">
        <div class="col">
          <h1 class="text-center">There's no Food Yet here !</h1>
        </div>
      </div>
    </div>
    <div class="container" v-else>
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
                <span class="text-dark">Carts</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row" v-if="!isLoading">
        <div class="col">
          <h2>
            Keranjang
            <strong>Saya</strong>
          </h2>
          <div class="table-responsive mt-3">
            <table class="table">
              <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Foto</th>
                <th scope="col">Makanan</th>
                <th scope="col">Keterangan</th>
                <th scope="col">Jumlah</th>
                <th scope="col">Harga</th>
                <th scope="col">Total Harga</th>
                <th scope="col">Hapus</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in cartsGetter" :key="item.id">
                <th>{{ index + 1 }}</th>
                <td>
                  <img
                      :src="
                        require('../assets/images/' + item.products.gambar) ||
                        require('../assets/images/default.png')
                      "
                      class="img-fluid shadow"
                      width="250"
                  />
                </td>
                <td>
                  <strong>{{ item.products.nama }}</strong>
                </td>
                <td>
                  {{ item.keterangan || "-" }}
                </td>
                <td>{{ item.order_count }}</td>
                <td>
                  Rp.
                  {{
                    item.products.harga
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                  }}
                </td>
                <td>
                  <strong
                  >Rp.
                    {{
                      multiplication(item.products.harga, item.order_count)
                    }}</strong
                  >
                </td>
                <td align="center" class="text-danger">
                  <b-icon-trash
                      @click="hapusKeranjang(item.id)"
                  ></b-icon-trash>
                </td>
              </tr>

              <tr>
                <td colspan="6" align="right">
                  <strong>Total Harga :</strong>
                </td>
                <td align="right">
                  <strong>Rp. {{ totalHarga }}</strong>
                </td>
                <td></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="row justify-content-end mt-3">
        <div class="col-md-4">
          <form class="mt-4" v-on:submit.prevent>
            <div class="form-group my-2">
              <label for="nama">Nama :</label>
              <input type="text" class="form-control" v-model="order.nama"/>
            </div>
            <div class="form-group my-2">
              <label for="noMeja">Nomor Meja :</label>
              <input type="text" class="form-control" v-model="order.noMeja"/>
            </div>

            <button
                type="submit"
                class="btn btn-success float-right my-2"
                @click="checkout"
            >
              <b-icon-cart></b-icon-cart>
              Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "CartView",
  components: {
    Navbar,
  },

  data() {
    return {
      isLoading: true,
      order: {},
    };
  },

  mounted() {
    this.getCartsInAction();
    this.isLoading = false;
  },

  methods: {
    ...mapActions("product", [
      "getOrdersInAction",
      "getCartsInAction",
      "deleteSingleCartInAction",
      "postOrderInAction",
    ]),
    hapusKeranjang(id) {
      this.deleteSingleCartInAction(id);
      this.$toast.error("Sukses Hapus Keranjang", {
        type: "error",
        position: "top-right",
        duration: 3000,
        dismissible: true,
      });
      this.getCartsInAction();
    },
    multiplication(a, b) {
      return this.addDot(a * b);
    },
    addDot(string) {
      return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    checkout() {
      if (this.order.nama && this.order.noMeja) {
        this.order.cart = this.cartsGetter;
        console.log(this.order);
        this.postOrderInAction(this.order);

        this.cartsGetter.forEach((element) => {
          this.deleteSingleCartInAction(element.id);
        });

        this.$router.push({path: "/pesanan-sukses"});
        this.$toast.success("Sukses Dipesan", {
          type: "success",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      } else {
        this.$toast.error("Nama dan Nomor Meja Harus diisi", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      }
    },
  },
  computed: {
    totalHarga() {
      return this.cartsGetter
          .reduce(function (items, data) {
            return items + data.products.harga * data.order_count;
          }, 0)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    ...mapGetters("product", ["cartsGetter", "ordersGetter"]),
  },
};
</script>

<style lang="scss" scoped></style>
