const $ = document.querySelector.bind(document);

async function getDataPhoneAPIAsync() {
    try {
        let response = await axios({
            url: "https://67c382b21851890165af349b.mockapi.io/product",
            method: "GET",
            responseType: "json",
        });
        if (!Array.isArray(response.data) || response.data.length === 0) {
            console.warn("Dữ liệu từ API rỗng hoặc không đúng định dạng");
            return [];
        }
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
        return [];
    }
}

async function deletePhone(phoneID) {
    await axios({
        url: `https://67c382b21851890165af349b.mockapi.io/product/${phoneID}`,
        method: "DELETE",
    });
}

async function getPhone(phoneID) {
    let response = await axios({
        url: `https://67c382b21851890165af349b.mockapi.io/product/${phoneID}`,
        method: "GET",
    });
    return response.data;
}

async function updatePhone(phoneID, phone) {
    try {
        await axios({
            url: `https://67c382b21851890165af349b.mockapi.io/product/${phoneID}`,
            method: "PUT",
            data: phone,
        });
        console.log(`Updated phone with ID: ${phoneID}`);
    } catch (error) {
        console.error("Lỗi khi cập nhật sản phẩm:", error);
    }
}

async function addPhone(phone) {
    try {
        await axios({
            url: "https://67c382b21851890165af349b.mockapi.io/product",
            method: "POST",
            data: phone,
        });
        console.log("Added new phone");
    } catch (error) {
        console.error("Lỗi khi thêm sản phẩm:", error);
    }
}

export { getDataPhoneAPIAsync, addPhone, deletePhone, getPhone, updatePhone };

