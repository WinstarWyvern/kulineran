import axios from "axios";

const baseUrl = "http://localhost:3000/";

const setProductBody = (product) => {
  return {
    gambar: product.gambar,
    harga: product.harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
    kode: product.kode,
    nama: product.nama,
    id: product.id,
  };
};

const setCartBody = (cart) => {
  return {
    id: cart.id,
    keterangan: cart.keterangan,
    order_count: cart.order_count,
    products: cart.products,
  };
};

const state = {
  products: [],
  bestProducts: [],
  carts: [],
  orders: [],
  product: {},
};

const getters = {
  productsGetter(state) {
    return state.products;
  },
  bestProductsGetter(state) {
    return state.bestProducts;
  },
  cartsGetter(state) {
    return state.carts;
  },
  ordersGetter(state) {
    return state.orders;
  },
  productGetter(state) {
    return state.product;
  },
};

const actions = {
  getProductsInAction(context, search = "") {
    axios
      .get(baseUrl + "products?q=" + search)
      .then((response) => {
        const products = response.data.map((product) =>
          setProductBody(product)
        );
        context.commit("setProducts", products);
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
        context.commit("setBestProducts", products);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getSingleProductInAction(context, id) {
    axios
      .get(baseUrl + "products/" + id)
      .then((response) => {
        const product = response.data;
        context.commit("setProduct", product);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getCartsInAction(context) {
    axios
      .get(baseUrl + "cart")
      .then((response) => {
        const carts = response.data.map((cart) => setCartBody(cart));
        context.commit("setCarts", carts);
      })
      .catch((error) => console.log(error));
  },
  getOrdersInAction(context) {
    axios
      .get(baseUrl + "cart")
      .then((response) => {
        context.commit("setOrders", response.data);
      })
      .catch((error) => console.log(error));
  },
};

const mutations = {
  setProducts(state, products) {
    state.products = products;
  },
  setProduct(state, product) {
    state.product = product;
  },
  setBestProducts(state, bestProducts) {
    state.bestProducts = bestProducts;
  },
  setCarts(state, carts) {
    state.carts = carts;
  },
  setOrders(state, orders) {
    state.orders = orders;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
