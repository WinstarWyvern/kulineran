<template>
  <div>
    <b-navbar toggleable="lg" type="light">
      <div class="container">
        <b-navbar-brand href="#">Kulineran</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="me-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/foods">Foods</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/history">History</router-link>
            </li>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/cart">
                Keranjang
                <b-icon-bag></b-icon-bag>
                <b-badge class="bg-success">{{
                  updateKeranjang ? updateKeranjang.length : order_count.length
                }}</b-badge>
              </router-link>
            </li>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NavbarComponent",

  data() {
    return {
      order_count: [],
    };
  },

  props: ["updateKeranjang"],

  mounted() {
    axios
      .get("http://localhost:3000/cart")
      .then((response) => this.setCount(response.data))
      .catch((error) => console.log(error));
  },

  methods: {
    setCount(data) {
      this.order_count = data;
    },
  },
};
</script>

<style lang="scss" scoped></style>
