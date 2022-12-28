import baseRequest from "../baseRequest";

export const fetchProductDetail = async (id) => {
  let details = {};

  await baseRequest.get(`/products/${id}`).then(res => {
    details = res.data;
  })

  return details
};
