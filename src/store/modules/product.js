import axios from "axios";

const baseUrl = "http://localhost:3000/";

const setProductBody = (product) => {
  return {
    gambar: product.gambar,
    harga: product.harga,
    kode: product.kode,
    nama: product.nama,
    id: product.id,
  };
};

const state = {
  products: [],
  bestProducts: [],
};

const getters = {
  productsGetter(state) {
    return state.products;
  },
  bestProductsGetter(state) {
    return state.bestProducts;
  },
};

const actions = {
  getProductsInAction(context) {
    axios
      .get(baseUrl + "products")
      .then((response) => {
        const products = response.data.map((product) =>
          setProductBody(product)
        );
        context.commit("getProductsInMutation", products);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getBestProductsInAction(context) {
    axios
      .get(baseUrl + "best-products")
      .then((response) => {
        const products = response.data.map((product) =>
          setProductBody(product)
        );
        context.commit("getBestProductsInMutation", products);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

const mutations = {
  getProductsInMutation(state, products) {
    state.products = products;
  },
  getBestProductsInMutation(state, products) {
    state.bestProducts = products;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
