import baseRequest from "../baseRequest";

export const fetchProducts = async (page, query) => {
  let products = [];
  let totalResults = 0;
  let url = '';
  let params = {
    limit: 8,
    skip: 8 * page - 8
  };

  if (query.length) {
    url = `/products/search?q=${query}`
  } else {
    url = `/products`;
  }

  await baseRequest.get(url, {
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
