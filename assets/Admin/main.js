function fetchDSDTList() {
  axios({
    url: "https://64d6faeb2a017531bc12e738.mockapi.io//product",
    method: "GET",
  })
    .then(function (res) {
      console.log("🚀 ~ file: main.js:8 ~ .then ~ res:", res);
      renderProductList(res.data);
    })
    .catch(function (err) {
      console.log("🚀 ~ file: main.js:11 ~ err:", err);
    });
}
fetchDSDTList();

function deleteMaDT(id) {
  axios({
    // delete
    url: `https://64d6faeb2a017531bc12e738.mockapi.io/product/${id}`,
    method: "DELETE",
  })
    .then(function (res) {
      console.log("🚀 ~ file: main.js:20 ~ res:", res);
      fetchDSDTList();
    })
    .catch(function (err) {
      console.log("🚀 ~ file: main.js:23 ~ deleteMaDT ~ err:", err);
    });
}
function addProduct() {
  let product = getDataForm();
  axios({
    url: "https://64d6faeb2a017531bc12e738.mockapi.io//product",
    method: "POST",
    data: product,
  })
    .then(function (res) {
      console.log("🚀 ~ file: main.js:20 ~ res:", res);
      $("#myModal").modal("hide");
      fetchDSDTList();
    })
    .catch(function (err) {
      console.log("🚀 ~ file: main.js:23 ~ deleteMaDT ~ err:", err);
    });
}
function editMaDT(id) {
  $("#myModal").modal("show");
  axios({
    url: `https://64d6faeb2a017531bc12e738.mockapi.io//product/${id}`,
    method: "GET",
  })
    .then(function (res) {
      console.log("🚀 ~ file: main.js:53 ~ .then ~ res:", res);
      ShowDataForm(res.data);
    })
    .catch(function (err) {
      console.log("🚀 ~ file: main.js:55 ~ editMaDT ~ err:", err);
    });
}
function updateProduct() {
  let product = getDataForm();
  axios({
    url: `https://64d6faeb2a017531bc12e738.mockapi.io//product/${product.id}`,
    method: "PUT",
    data: product,
  })
    .then(function (res) {
      $("#myModal").modal("hide");
      fetchDSDTList();
    })
    .catch(function (err) {
      console.log("🚀 ~ file: main.js:71 ~ updateProduct ~ err:", err);
    });
}
