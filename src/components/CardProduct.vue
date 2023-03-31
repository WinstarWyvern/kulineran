<template>
  <div>
    <b-card
      :title="product.nama"
      :img-src="require('../assets/images/' + product.gambar)"
      :img-alt="product.gambar"
      img-top
      tag="article"
      class="m-md-2 card-img-top card-product"
    >
      <b-card-text> Rp {{ product.harga }} </b-card-text>

      <b-button href="#" variant="success">
        <b-icon-arrow-right /> Pesan
      </b-button>
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

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
