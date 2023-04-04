<template>
  <div>
    <b-card :title="product.nama" :img-src="require('../assets/images/' + product.gambar)" :img-alt="product.gambar" img-top
      tag="article" class="m-md-2 card-img-top card-product">
      <b-card-text> Rp {{ product.harga }} </b-card-text>

      <router-link :to="'/foods/' + product.id" class="btn btn-success">
        <b-icon-arrow-right /> Pesan
      </router-link>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "CardProductComponent",
  props: ["product"],
  data() {
    return {};
  },

  mounted() { },

  methods: {},
  computed: {},
};
</script>

<style lang="scss" scoped></style>
