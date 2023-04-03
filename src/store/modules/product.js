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
};

const getters = {
  getProductsInGetter(state) {
    return state.products;
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
};

const mutations = {
  getProductsInMutation(state, products) {
    state.products = products;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
