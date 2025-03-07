import { Cart } from "./models/Cart.js";
import { originalPhoneList } from "../js/homePage.js";

const $ = document.querySelector.bind(document);
let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function attachCartEvents() {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    if (addToCartButtons.length === 0) {
        console.warn("Không tìm thấy nút .add-to-cart nào để gắn sự kiện");
    }
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const phoneId = this.getAttribute("data-id");
            addToCart(phoneId);
        });
    });
}
//save
function addToCart(phoneId) {
    const phone = originalPhoneList.find((p) => p.id === phoneId);
    if (!phone) {
        console.error("Không tìm thấy sản phẩm với ID:", phoneId);
        return;
    }

    let existingItem = cart.find((item) => item.phone.id === phoneId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const newItem = new Cart(phone);
        cart.push(newItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateTotalQuantity();
    console.log("Giỏ hàng hiện tại:", cart);
}

function renderCart() {
    const cartList = $("#cartList");
    if (!cartList) {
        console.error("Không tìm thấy #cartList trong DOM");
        return;
    }
    cartList.innerHTML = cart
        .map((item) => {
            const formattedPrice = Number(item.phone.price).toLocaleString(
                "vi-VN"
            );
            const totalPrice = Number(
                item.phone.price * item.quantity
            ).toLocaleString("vi-VN");
            return `
                    <article class="cart-item">
                        <a href="./product-detail.html">
                            <img src="${item.phone.img}" alt="" class="cart-item__thumb" />
                        </a>
                        <div class="cart-item__content">
                            <div class="cart-item__content-left">
                                <h3 class="cart-item__title">
                                    <a href="./product-detail.html">${item.phone.name}</a>
                                </h3>
                                <p class="cart-item__price-wrap">${formattedPrice}</p>
                                <div class="cart-item__ctrl cart-item__ctrl--md-block">
                                    <div class="cart-item__input">${item.phone.brand}</div>
                                    <div class="cart-item__input">
                                        <button class="cart-item__input-btn decrease-btn" data-id="${item.phone.id}">
                                            <img src="./assets/icons/minus.svg" alt="" class="icon" />
                                        </button>
                                        <span>${item.quantity}</span>
                                        <button class="cart-item__input-btn increase-btn" data-id="${item.phone.id}">
                                            <img src="./assets/icons/plus.svg" alt="" class="icon" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="cart-item__content-right">
                                <p class="cart-item__total-price">${totalPrice}</p>
                                <div class="cart-item__ctrl">
                                    <button class="cart-item__ctrl-btn js-toggle remove-btn" data-id="${item.phone.id}" toggle-target="#delete-confirm">
                                        <img src="./assets/icons/trash.svg" alt="" />
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                    </article>
                `;
        })
        .join("");

    attachCartItemEvents();
    initJsToggle();
}

function updateCart() {
    // số lương sản phẩm trong giỏ hàng
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    $("#totalQuantity").innerText = totalQuantity;
    //tiền sản phẩm
    const totalPrice = cart.reduce(
        (sum, item) => sum + item.phone.price * item.quantity,
        0
    );
    $("#totalPrice").innerText = totalPrice.toLocaleString("vi-VN");
    // tiền ship
    const shipPrice = totalQuantity > 0 ? 30000 : 0;
    $("#shipPrice").innerText = shipPrice.toLocaleString("vi-VN");
    // tổng tiền giỏ hàng
    const grandTotal = totalPrice + shipPrice;
    $("#grandPrice").innerText = grandTotal.toLocaleString("vi-VN");
}

function attachCartItemEvents() {
    // thêm số lượng
    document.querySelectorAll(".increase-btn").forEach((button) => {
        button.addEventListener("click", function () {
            const phoneId = this.getAttribute("data-id");
            const item = cart.find((i) => i.phone.id === phoneId);
            if (item) {
                item.quantity += 1;
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
                updateCart();
            }
        });
    });
    //giảm số lượng
    document.querySelectorAll(".decrease-btn").forEach((button) => {
        button.addEventListener("click", function () {
            const phoneId = this.getAttribute("data-id");
            const item = cart.find((i) => i.phone.id === phoneId);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
                updateCart();
            }
        });
    });
    //xóa sản phẩm
    document.querySelectorAll(".remove-btn").forEach((button) => {
        button.addEventListener("click", function () {
            const phoneId = this.getAttribute("data-id");
            $("#phone-delete").onclick = () => {
                cart = cart.filter((item) => item.phone.id !== phoneId);
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
                updateCart();
            };
        });
    });
}

if ($("#cartList")) {
    document.addEventListener("DOMContentLoaded", () => {
        renderCart();
        updateCart();
    });
}
const payCartButton = $("#payCart");
if (payCartButton) {
    payCartButton.addEventListener("click", function () {
        cart = [];
        localStorage.removeItem("cart");
        renderCart();
        updateCart();
    });
}
