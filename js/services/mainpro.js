getProducts();

function getProducts() {
  apiGetProducts()
    .then((response) => {
      // gọi hàm display() để hiển thị ra giao diện
      display(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function createProduct() {
  let product = {
    // dom và khởi tạo obj product
    name: getElement("#ten").value,
    price: +getElement("#price").value,
    image: getElement("#photo").value,
    type: getElement("#decs").value,
  };
  // gọi API thêm sản phẩm
  apiCreateProduct(product)
    .then((response) => {
      // sau khi thêm thành công, dữ liệu chỉ mới được cập nhật ở phía server. Ta cần Gọi lại apiGetProducts để lấy được danh sách những sản phẩm mới nhất (bao gồm sản phẩm mình mới thêm)
      return apiGetProducts();
    })
    .then((response) => {
      // response là kết quả của hàm apiGetProducts
      display(response.data);
      // ẩn modal
      $("#myModal").modal("hide");
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteProduct(productId) {
  apiDeleteProduct(productId)
    .then(() => {
      // xóa thành công
      return apiGetProducts();
    })
    .then((response) => {
      display(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function selectProduct(productId) {
  // hiên thị modal
  $("#myModal").modal("show");

  // hiển thị title và footer của modal
  getElement("#header-title").innerHTML = "Cập nhật sản phẩm";
  getElement(".modal-footer").innerHTML = `
    <button data-dismiss="modal" class="btn btn-secondary">Hủy</button>
    <button class="btn btn-success" onclick="updateProduct('${productId}')">Cập nhật</button>
    `;

  apiGetProductById(productId)
    .then((response) => {
      // lấy thông tin sản phẩm thành công => hiển thị dữ liệu lên form
      let product = response.data;
      getElement("#tec").value = product.name;
      getElement("#price").value = product.price;
      getElement("#photo").value = product.image;
      getElement("#decs").value = product.dec;
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateProduct(productId) {
  let newProduct = {
    // dom và khởi tạo obj product
    name: getElement("#ten").value,
    price: +getElement("#price").value,
    image: getElement("#photo").value,
    type: getElement("#decs").value,
  };
  apiUpdateProduct(productId, newProduct)
    .then(() => {
      return apiGetProducts();
    })
    .then((response) => {
      display(response.data);
      $("#myModal").modal("hide");
    })
    .catch((err) => {
      console.log(err);
    });
}
function display(products) {
  let listadmin = document.getElementById("tblDanhSachSP");

  let html = products.reduce((result, value, index) => {
    product = new Product(
      value.id,
      value.name,
      value.price,
      value.image,
      value.dec
    );
    return (
      result +
      `
        <tr>
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>
                <img src="${product.image}" width="100px" height="100px"/>
            </td>
            <td>${product.dec}</td>
            <td>
                <button onclick="selectProduct('${
                  product.id
                }')" class="btn btn-primary">Xem</button>
                <button onclick="deleteProduct('${
                  product.id
                }')" class="btn btn-danger">Xóa</button>
            </td>
        </tr>
        `
    );
  }, "");
  if (listadmin) {
    document.getElementById("tblDanhSachSP").innerHTML = html;
  }

  //homepage

  let as = document.querySelector("#prolists");
  let htmlhome = products.reduce((result2, value2, index) => {
    product = new Product(
      value2.id,
      value2.name,
      value2.price,
      value2.image,
      value2.dec
    );
    return (
      result2 +
      `
      <div class="col-md-4 col-sm-6">
      <div class="pro-item position-relative">
        <div class="box-img position-relative">
          <img class="img-pro" src="${product.image}" alt="" />
          <div class="box-content position-absolute">
            <h4 class="title-pro">${product.name}</h4>
          </div>
        </div>

        <div
          class="box-btn d-flex justify-content-between align-items-center"
        >
          <button onclick="addToCart(${product.id})" class="add-cart btn-join">
            <span>Add to cart</span>
          </button>
          <p class="price-pro">${product.price}<span>$</span></p>
        </div>
      </div>
    </div>
        `
    );
  }, "");
  if (as) {
    document.getElementById("prolists").innerHTML = htmlhome;
  }
}

//addtocarrt
// function addToCart(productId) {
//   apiGetProductById(productId)
//     .then((response) => {
//       let product = response.data;
//       var cartElement = document.querySelector(".pro-list-cart");
//       var productInfo = document.createElement("div");
//       productInfo.innerHTML = `
//          <div class="product-item d-flex gap-5 mb-5">
//             <div class="box-img">
//               <img src="${product.image}" alt="" />
//             </div>
//             <div class="box-content">
//               <h3 class="product-tt">${product.name}</h3>
//               <p class="product-dec">${product.dec}</p>
//               <button class="btn-remove btn-join"><span>Remove</span></button>
//             </div>
//           </div>
//           <div
//           class="quantity gap-4 d-flex justify-content-between align-items-center mb-5"
//         >
//           <div class="quantity-box gap-5 d-flex align-items-center">
//             <span class="quantity-txt fs-2">Qunatity:</span>
//             <span class="minus quantity-btn fs-2">-</span>
//             <span class="results fs-2"></span>
//             <span class="plus quantity-btn fs-2">+</span>
//           </div>
//           <div class="price-cart fs-1">${product.price}$</div>
//         </div>
//       `;
//       cartElement.appendChild(productInfo);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }
var cartItems = []; // Mảng để lưu trữ dữ liệu sản phẩm
var displayedProducts = {}; // Đối tượng để lưu trữ các sản phẩm đã hiển thị

function addToCart(productId) {
  apiGetProductById(productId)
    .then((response) => {
      let product = response.data;
      var cartElement = document.querySelector(".pro-list-cart");
      var existingProduct = cartElement.querySelector(
        `[data-product-id="${product.id}"]`
      );
      var quantityElement = document.querySelector(`#quantity-${product.id}`);

      // Kiểm tra xem thẻ <span> đã tồn tại hay chưa
      if (quantityElement === null) {
        // Tạo thẻ <span> mới
        quantityElement = document.createElement("span");
        quantityElement.id = `quantity-${product.id}`;
        quantityElement.className = "results fs-2";
        cartElement.appendChild(quantityElement);
      }

      // Kiểm tra xem sản phẩm đã tồn tại trong mảng cartItems
      var existingCartItem = cartItems.find((item) => item.id === product.id);

      if (existingCartItem) {
        // Nếu sản phẩm đã tồn tại, tăng giá trị qty lên
        existingCartItem.qty += 1;
        // Cập nhật giá trị qty trong thẻ <span>
        quantityElement.textContent = existingCartItem.qty;
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm sản phẩm vào mảng với giá trị qty là 1
        product.qty = 1;
        cartItems.push(product);
        // Cập nhật giá trị qty trong thẻ <span>
        quantityElement.textContent = product.qty;
      }

      // Kiểm tra xem sản phẩm đã được hiển thị hay chưa
      // Kiểm tra xem sản phẩm đã được hiển thị hay chưa
      if (!displayedProducts[product.id]) {
        var productInfo = document.createElement("div");
        productInfo.dataset.productId = product.id;

        productInfo.innerHTML = `
    <div class="product-item d-flex gap-5 mb-5">
      <div class="box-img">
        <img src="${product.image}" alt="" />
      </div>
      <div class="box-content">
        <h3 class="product-tt">${product.name}</h3>
        <p class="product-dec">${product.dec}</p>
        <button class="btn-remove btn-join"><span>Remove</span></button>
      </div>
    </div>
    <div class="quantity gap-4 d-flex justify-content-between align-items-center mb-5">
      <div class="quantity-box gap-5 d-flex align-items-center">
        <span class="quantity-txt fs-2">Quantity:</span>
        <span class="minus quantity-btn fs-2">-</span>
<div class="qty-num"></div>
        <span class="plus quantity-btn fs-2">+</span>
      </div>
      <div class="price-cart fs-1">${product.price}$</div>
    </div>
  `;

        // Tìm phần tử quantity-box trong productInfo
        var quantityBox = productInfo.querySelector(".qty-num");

        // Thêm thẻ span hiển thị số lượng vào quantity-box
        quantityBox.appendChild(quantityElement);

        cartElement.appendChild(productInfo);

        // Đánh dấu sản phẩm đã được hiển thị
        displayedProducts[product.id] = true;
      }

      console.log(cartItems); // In mảng sản phẩm ra console
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateCartCount() {
  var cartCountElement = document.getElementById("cart-count");
  var totalQty = cartItems.reduce((total, item) => total + item.qty, 0);
  cartCountElement.textContent = totalQty;
}
// DOM
let btnThemsps = getElement("#btnThemSP");
if (btnThemsps) {
  getElement("#btnThemSP").onclick = () => {
    getElement("#header-title").innerHTML = "Thêm sản phẩm";
    getElement(".modal-footer").innerHTML = `
              <button data-dismiss="modal" class="btn btn-secondary">Hủy</button>
              <button class="btn btn-success" onclick="createProduct()">Thêm</button>
              `;
  };
}
let txtSearchs = getElement("#txtSearch");
if (txtSearchs) {
  getElement("#txtSearch").onkeypress = (e) => {
    if (e.key !== "Enter") {
      return;
    }
    apiGetProducts(e.target.value)
      .then((response) => {
        display(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

// Utils
function getElement(selector) {
  return document.querySelector(selector);
}
