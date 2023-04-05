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
                <b-button block v-b-toggle.accordion-1 variant="primary" class="w-100">
                  {{ index + 1 }}
                </b-button>
              </b-card-header>
              <b-collapse
                id="accordion-1"
                visible
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body>
                  <b-card-text>
                    {{ item.nama }} di Meja Nomor {{ item.noMeja }}
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

<style lang="scss" scoped>
</style>