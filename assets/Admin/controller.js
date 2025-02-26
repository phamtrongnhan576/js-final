function renderProductList(list) {
  let contentHTML = "";
  list.reverse().forEach((item) => {
    let trString = `<tr>
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.price}</td>
      <td>${item.img}</td>
      <td>${item.desc}</td>
      <td>
      <button class="btn btn-danger" onclick=editMaDT(${item.id})>sửa</button>
      <button class="btn btn-warning" onclick=deleteMaDT(${item.id})>xoá</button>
      </td>
      </tr>`;
    contentHTML += trString;
  });
  document.getElementById("tblDanhSachSP").innerHTML = contentHTML;
}
function getDataForm() {
  let ten = document.getElementById("TenSP").value;
  let gia = document.getElementById("GiaSP").value;
  let hinhanh = document.getElementById("HinhSP").value;
  let ma = document.getElementById("MaSP").value;
  return {
    id: ma,
    name: ten,
    price: gia,
    img: hinhanh,
  };
}
function ShowDataForm(data) {
  document.getElementById("TenSP").value = data.name;
  document.getElementById("GiaSP").value = data.price;
  document.getElementById("HinhSP").value = data.img;
  document.getElementById("MaSP").value = data.id;
}
