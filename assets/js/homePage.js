import { getDataPhoneAPIAsync } from "./callAPI.js";
import { attachCartEvents } from "../js/checkout.js";
export let originalPhoneList = [];
const $ = document.querySelector.bind(document);

window.renderUserPhone = (arrPhone) => {
    $("#productList").innerHTML = arrPhone
        .map((phone) => {
            const formattedPrice = Number(phone.price).toLocaleString("vi-VN");
            return `
                <div class="col">
                    <article class="product-card">
                        <div class="product-card__img-wrap">
                            <a href="./product-detail.html">
                                <img src="${phone.img}" alt="" class="product-card__thumb" />
                            </a>
                            <button class="like-btn product-card__like-btn add-to-cart" data-id="${phone.id}">
                                <img src="./assets/icons/cart.svg" alt="" class="like-btn__icon icon"/>
                            </button>
                        </div>
                        <h3 class="product-card__title">
                            <a href="./product-detail.html">${phone.name}</a>
                        </h3>
                        <p class="product-card__brand">${phone.brand}</p>
                        <div class="product-card__row">
                            <span class="product-card__price">${formattedPrice}</span>
                            <img src="./assets/icons/star.svg" alt="" class="product-card__star"/>
                            <span class="product-card__score">5.0</span>
                        </div>
                    </article>
                </div>
            `;
        })
        .join("");
    attachCartEvents();
};

async function loadUserPhones() {
    originalPhoneList = await getDataPhoneAPIAsync();
    renderUserPhone(originalPhoneList);
}
function timKiemDienThoai(searchValue) {
    const filteredPhones = originalPhoneList.filter((phone) =>
        phone.name.toLowerCase().includes(searchValue.trim().toLowerCase())
    );
    return filteredPhones;
}
function initSearchEvents() {
    $("#filterSearch").addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            renderUserPhone(timKiemDienThoai(this.value));
        }
    });
    $("#filterSubmit").addEventListener("click", function (e) {
        e.preventDefault();
        renderUserPhone(timKiemDienThoai($("#filterSearch").value));
    });
    $("#tagSamSung").addEventListener("click", function (e) {
        e.preventDefault();
        renderUserPhone(timKiemDienThoai($("#tagSamSung").innerText));
    });
    $("#tagIphone").addEventListener("click", function (e) {
        e.preventDefault();
        renderUserPhone(timKiemDienThoai($("#tagIphone").innerText));
    });
}

if ($   ("#productList")) {
    document.addEventListener("DOMContentLoaded", () => {
        loadUserPhones();
        initSearchEvents();
    });
}
