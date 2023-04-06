<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="row mt-4">
        <div class="col">
          <h1>Order History List</h1>
          <div v-for="(item, index) in ordersGetter" :key="item.id">
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-0" role="tab">
                <b-button
                  block
                  v-b-toggle="'accordion-' + (index + 1)"
                  variant="primary"
                  class="w-100"
                >
                  Order ke {{ index + 1 }}
                </b-button>
              </b-card-header>
              <b-collapse
                :id="'accordion-' + (index + 1)"
                visible
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body>
                  <b-card-text>
                    <p>Pelanggan: {{ item.nama }}</p>
                    <p>Nomor Meja: {{ item.noMeja }}</p>
                    <p>Pesanan:</p>
                    <div v-for="cart in item.cart" :key="cart.id">
                      <p>Nama Makanan: {{ cart.products.nama }}</p>
                      <p>Harga: Rp {{ cart.products.harga }}</p>
                    </div>
                  </b-card-text>
                  <b-card-text>{{ text }}</b-card-text>
                </b-card-body>
              </b-collapse>
            </b-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "HistoryView",
  components: {
    Navbar,
  },
  methods: {
    ...mapActions("product", ["getOrdersInAction"]),
  },
  props: {},
  mounted() {
    this.getOrdersInAction();
    console.log(this.ordersGetter);
  },
  computed: {
    ...mapGetters("product", ["ordersGetter"]),
  },
};
</script>

<style lang="scss" scoped></style>
