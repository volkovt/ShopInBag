import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    products: [],
    productsInBag: [],
  },
  mutations: {
    loadBag(state, productsInBag) {
      state.productsInBag = productsInBag;
    },
    loadProducts(state, products) {
      state.products = products;
    },
    addToBag(state, product) {
      state.productsInBag.push(product);
      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag))
    },
    removeFromBag(state, product) {
      if (
        confirm("Você tem certeza que gostaria de remover o item do carrinho?")
      ) {
        state.productsInBag = state.productsInBag.filter(
          (x) => x.id != product.id
        );
        localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag))
      }
    },
    updateProductBag(state, product) {
      var index = state.productsInBag.findIndex(
        (item) => item.id == product.id
      );
      state.productsInBag[index] = { ...product };
    },
  },
  actions: {
    addToBag({ commit }, product) {
      commit("addToBag", product);
    },
    loadBag({ commit }) {
      if (localStorage.getItem("productsInBag")) {
        commit("loadBag", JSON.parse(localStorage.getItem("productsInBag")));
      }
    },
    loadProducts({ commit }) {
      axios
        .get("https://fakestoreapi.com/products")
        .then((response) => commit("loadProducts", response.data));
    },
    removeFromBag({ commit }, product) {
      commit("removeFromBag", product);
    },
    updateProductBag({ commit }, product) {
      commit("updateProductBag", product);
    },
  },
  modules: {},
});
