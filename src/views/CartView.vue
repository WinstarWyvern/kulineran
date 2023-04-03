<template>
  <div>
    <Navbar :updateKeranjang="cart" />
    <div class="container">
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

      <div class="row">
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
                <tr v-for="(item, index) in cart" :key="item.id">
                  <th>{{ index + 1 }}</th>
                  <td>
                    <img
                      :src="require('../assets/images/' + item.products.gambar)"
                      class="img-fluid shadow"
                      width="250"
                    />
                  </td>
                  <td>
                    <strong>{{ item.products.nama }}</strong>
                  </td>
                  <td>
                    {{ item.keterangan ? item.keterangan : "-" }}
                  </td>
                  <td>{{ item.order_count }}</td>
                  <td>Rp. {{ item.products.harga }}</td>
                  <td>
                    <strong
                      >Rp. {{ item.products.harga * item.order_count }}</strong
                    >
                  </td>
                  <td align="center" class="text-danger">
                    <b-icon-trash
                      @click="hapusKeranjang(keranjang.id)"
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
              <input type="text" class="form-control" v-model="order.nama" />
            </div>
            <div class="form-group my-2">
              <label for="noMeja">Nomor Meja :</label>
              <input type="text" class="form-control" v-model="order.noMeja" />
            </div>

            <button
              type="submit"
              class="btn btn-success float-right my-2"
              @click="checkout"
            >
              <b-icon-cart></b-icon-cart>Pesan
            </button>
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
  name: "CartView",
  components: {
    Navbar,
  },

  data() {
    return {
      cart: [],
      order: {},
    };
  },

  mounted() {
    axios
      .get("http://localhost:3000/cart")
      .then((response) => this.setCart(response.data))
      .catch((error) => console.log(error));
  },

  methods: {
    setCart(data) {
      this.cart = data;
    },
    hapusKeranjang(id) {
      axios
        .delete("http://localhost:3000/cart/" + id)
        .then(() => {
          this.$toast.error("Sukses Hapus Keranjang", {
            type: "error",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });
          // Update Data keranjang
          axios
            .get("http://localhost:3000/cart")
            .then((response) => this.setCart(response.data))
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    },
    checkout() {
      if (this.order.nama && this.order.noMeja) {
        this.order.cart = this.cart;
        axios
          .post("http://localhost:3000/order", this.order)
          .then(() => {
            // Hapus Semua Keranjang
            this.cart.map(async function (item) {
              try {
                return await axios.delete(
                  "http://localhost:3000/cart/" + item.id
                );
              } catch (error) {
                return console.log(error);
              }
            });
            this.$router.push({ path: "/pesanan-sukses" });
            this.$toast.success("Sukses Dipesan", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
          })
          .catch((err) => console.log(err));
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
      return this.cart.reduce(function (items, data) {
        return items + data.products.harga * data.order_count;
      }, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>