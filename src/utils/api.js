import axios from "axios";

var products = {
  getProducts() {
    axios
      .get("http://localhost:3000/best-products")
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default products;
