function apiGetProducts(searchValue) {
  return axios({
    url: `https://64a6ad15096b3f0fcc8042fe.mockapi.io/proapi`,
    method: "GET",
    params: {
      name: searchValue || undefined,
    },
  });
}

function apiGetProductById(productId) {
  return axios({
    url: `https://64a6ad15096b3f0fcc8042fe.mockapi.io/proapi/${productId}`,
    method: "GET",
  });
}

// product = {name: "", price:1000, image:"...", type:"..."}
function apiCreateProduct(product) {
  return axios({
    url: "https://64a6ad15096b3f0fcc8042fe.mockapi.io/proapi",
    method: "POST",
    data: product,
  });
}

function apiUpdateProduct(productId, newProduct) {
  return axios({
    url: `https://64a6ad15096b3f0fcc8042fe.mockapi.io/proapi/${productId}`,
    method: "PUT",
    data: newProduct,
  });
}

function apiDeleteProduct(productId) {
  return axios({
    url: `https://64a6ad15096b3f0fcc8042fe.mockapi.io/proapi/${productId}`,
    method: "DELETE",
  });
}
