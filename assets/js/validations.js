// Kiểm tra rỗng
export function kiemTraRong(value, selectorId, textErr) {
    const errorElement = document.getElementById(selectorId);
    if (!value || value.trim() === "") {
        errorElement.innerHTML = `${textErr}`;
        errorElement.style.display = "block";
        return false;
    }
    errorElement.innerHTML = "";
    errorElement.style.display = "none";
    return true;
}

// Kiểm tra thương hiệu
export function kiemTraThuongHieu(value, selectorId, textErr) {
    const errorElement = document.getElementById(selectorId);
    const normalizedValue = value.trim().toLowerCase();
    if (normalizedValue !== "samsung" && normalizedValue !== "apple") {
        errorElement.innerHTML = `${textErr}`;
        errorElement.style.display = "block";
        return false;
    }
    errorElement.innerHTML = "";
    errorElement.style.display = "none";
    return true;
}

// Kiểm tra số (cho giá tiền)
export function kiemTraSo(value, selectorId, textErr) {
    const errorElement = document.getElementById(selectorId);
    if (isNaN(value) || value.trim() === "" || Number(value) <= 0) {
        errorElement.innerHTML = `${textErr}`;
        errorElement.style.display = "block";
        return false;
    }
    errorElement.innerHTML = "";
    errorElement.style.display = "none";
    return true;
}

// Kiểm tra độ dài tối thiểu
export function kiemTraDoDai(value, selectorId, textErr, minLength) {
    const errorElement = document.getElementById(selectorId);
    if (value.trim().length < minLength) {
        errorElement.innerHTML = `${textErr}`;
        errorElement.style.display = "block";
        return false;
    }
    errorElement.innerHTML = "";
    errorElement.style.display = "none";
    return true;
}

// Kiểm tra URL ảnh
export function kiemTraURL(value, selectorId, textErr) {
    const errorElement = document.getElementById(selectorId);
    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i;
    if (!urlPattern.test(value.trim())) {
        errorElement.innerHTML = `${textErr}`;
        errorElement.style.display = "block";
        return false;
    }
    errorElement.innerHTML = "";
    errorElement.style.display = "none";
    return true;
}


