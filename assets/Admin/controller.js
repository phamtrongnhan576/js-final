function renderProductList(list) {
  var contentHTML = "";
  list.reverse().forEach((item) => {
    var trString = `<tr>
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
  var ten = document.getElementById("TenSP").value;
  var gia = document.getElementById("GiaSP").value;
  var hinhanh = document.getElementById("HinhSP").value;
  var ma = document.getElementById("MaSP").value;
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
