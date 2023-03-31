<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Kulineran</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/foods">Food</router-link>
          </li>
        </ul>

        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/cart">
              Keranjang <b-icon icon="cart-fill"></b-icon>
              <b-badge class="bg-success">{{ order_count.length }}</b-badge>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
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
