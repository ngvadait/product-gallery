import baseRequest from "../baseRequest";

export const fetchProducts = async (page) => {
  let products = [];
  let totalResults = 0;
  let params = {
    limit: 8,
    skip: 8 * page - 8
  };

  await baseRequest.get(`/products`, {
    params: params
  }).then(res => {
    products = res.data.products;
    totalResults = res.data.total;
  })

  return {
    products: products,
    totalResults: totalResults,
  }
};
