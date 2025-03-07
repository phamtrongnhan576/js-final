import { Phone } from "../js/models/Phone.js";
import {
    kiemTraRong,
    kiemTraDoDai,
    kiemTraThuongHieu,
    kiemTraURL,
    kiemTraSo,
} from "../js/validations.js";
import {
    getDataPhoneAPIAsync,
    addPhone,
    deletePhone,
    getPhone,
    updatePhone,
} from "./callAPI.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
let originalPhoneList = [];

function validatePhoneForm(
    phoneName,
    phoneBrand,
    phonePrice,
    phoneScreen,
    phoneFrontCamera,
    phoneBackCamera,
    phoneImg,
    phoneDesc
) {
    let valid = true;

    valid &= kiemTraRong(phoneName, "tbPhoneName", "Nhập tên điện thoại");
    valid &= kiemTraDoDai(
        phoneName,
        "tbPhoneName",
        "Tên phải ít nhất 2 ký tự",
        2
    );
    valid &= kiemTraThuongHieu(phoneBrand, "tbPhoneBrand", "Chọn thương hiệu");
    valid &= kiemTraRong(phonePrice, "tbPhonePrice", "Nhập giá tiền");
    valid &= kiemTraSo(
        phonePrice,
        "tbPhonePrice",
        "Giá phải là số và lớn hơn 0"
    );
    valid &= kiemTraRong(
        phoneScreen,
        "tbPhoneScreen",
        "Nhập thông tin màn hình"
    );
    valid &= kiemTraRong(
        phoneFrontCamera,
        "tbPhoneFrontCam",
        "Nhập thông tin camera trước"
    );
    valid &= kiemTraRong(
        phoneBackCamera,
        "tbPhoneBackCam",
        "Nhập thông tin camera sau"
    );
    valid &= kiemTraRong(phoneImg, "tbPhoneImg", "Vui lòng nhập link ảnh");
    valid &= kiemTraURL(phoneImg, "tbPhoneImg", "Vui lòng nhập URL ảnh hợp lệ");
    valid &= kiemTraRong(phoneDesc, "tbPhoneDesc", "Vui lòng nhập mô tả");

    return valid;
}

function renderAdminPhone(arrPhone) {
    $("#tableDanhSach").innerHTML = arrPhone
        .map((phone) => {
            const formattedPrice = Number(phone.price).toLocaleString("vi-VN");
            return `
            <tr>
                <td>${phone.id}</td>
                <td>${phone.name}</td>
                <td>${phone.brand}</td>
                <td>${formattedPrice}</td>
                <td><img src="${phone.img}" alt="" class="management__table--img" /></td>
                <td>${phone.desc}</td>
                <td>
                    <div class="management-group__btn">
                        <button class="btn btn--blue btn--small js-toggle" 
                                toggle-target="#phone-confirm" 
                                data-id="${phone.id}">
                            <img src="./assets/icons/edit.svg" alt=""/>
                            <span> Sửa</span>
                        </button>
                        <button class="btn btn--danger btn--small" onclick="deletePhone('${phone.id}')">
                            <img src="./assets/icons/delete.svg" alt="" />
                            <span> Xóa</span>
                        </button>
                    </div>
                </td>
            </tr>
            `;
        })
        .join("");
    initJsToggle();
}

async function loadAdminPhones() {
    originalPhoneList = await getDataPhoneAPIAsync();
    renderAdminPhone(originalPhoneList);
}

document.addEventListener("DOMContentLoaded", loadAdminPhones);

$("#btnAsc").onclick = () => {
    const sortedPhones = [...originalPhoneList];
    sortedPhones.sort((a, b) => Number(a.price) - Number(b.price));
    renderAdminPhone(sortedPhones);
};

$("#btnDesc").onclick = () => {
    const sortedPhones = [...originalPhoneList];
    sortedPhones.sort((a, b) => Number(b.price) - Number(a.price));
    renderAdminPhone(sortedPhones);
};

$("#addPhone").onclick = async () => {
    const phoneName = $("#phoneName").value;
    const phoneBrand = $("#phoneBrand").value;
    const phonePrice = $("#phonePrice").value;
    const phoneScreen = $("#phoneScreen").value;
    const phoneFrontCamera = $("#phoneFrontCamera").value;
    const phoneBackCamera = $("#phoneBackCamera").value;
    const phoneImg = $("#phoneImg").value;
    const phoneDesc = $("#phoneDesc").value;

    if (
        validatePhoneForm(
            phoneName,
            phoneBrand,
            phonePrice,
            phoneScreen,
            phoneFrontCamera,
            phoneBackCamera,
            phoneImg,
            phoneDesc
        )
    ) {
        let phone = new Phone(
            phoneName,
            phonePrice,
            phoneScreen,
            phoneBackCamera,
            phoneFrontCamera,
            phoneImg,
            phoneBrand,
            phoneDesc
        );

        await addPhone(phone);
        await loadAdminPhones();
        $("#phoneForm").reset();
        $("#addPhone").classList.remove("btn--disable");
        $("#savePhone").classList.add("btn--disabled");
    }
};

window.updatePhone = async (phoneID) => {
    const phone = await getPhone(phoneID);
    $("#phoneName").value = phone.name;
    $("#phonePrice").value = phone.price;
    $("#phoneScreen").value = phone.screen;
    $("#phoneBackCamera").value = phone.backCamera;
    $("#phoneFrontCamera").value = phone.frontCamera;
    $("#phoneImg").value = phone.img;
    $("#phoneBrand").value = phone.brand;
    $("#phoneDesc").value = phone.desc;
    $("#savePhone").setAttribute("data-id", phone.id);
};

$("#savePhone").onclick = async () => {
    const phoneName = $("#phoneName").value;
    const phoneBrand = $("#phoneBrand").value;
    const phonePrice = $("#phonePrice").value;
    const phoneScreen = $("#phoneScreen").value;
    const phoneFrontCamera = $("#phoneFrontCamera").value;
    const phoneBackCamera = $("#phoneBackCamera").value;
    const phoneImg = $("#phoneImg").value;
    const phoneDesc = $("#phoneDesc").value;

    if (
        validatePhoneForm(
            phoneName,
            phoneBrand,
            phonePrice,
            phoneScreen,
            phoneFrontCamera,
            phoneBackCamera,
            phoneImg,
            phoneDesc
        )
    ) {
        let phoneID = $("#savePhone").getAttribute("data-id");

        let phone = new Phone(
            phoneName,
            phonePrice,
            phoneScreen,
            phoneBackCamera,
            phoneFrontCamera,
            phoneImg,
            phoneBrand,
            phoneDesc
        );

        await updatePhone(phoneID, phone);
        await loadAdminPhones();
    }
};

window.deletePhone = async (phoneID) => {
    await deletePhone(phoneID);
    await loadAdminPhones();
};
$("#searchPhone").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        const filteredPhones = originalPhoneList.filter((phone) =>
            phone.name.toLowerCase().includes(this.value.trim().toLowerCase())
        );
        renderAdminPhone(filteredPhones);
    }
});
