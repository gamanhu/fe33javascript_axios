var nguoiDungService = new NguoiDungService();
function getELE(id) {
    return document.getElementById(id);

}

//Luu y cai nay nha, axios.then.catch
function getListUser() {
    nguoiDungService
        .layDanhSachNguoiDung()
        .then(function (result) {
            renderTable(result.data);

            //Luu danh sach xuong localStorage
            setLocalStorage(result.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    // renderTable();
};

getListUser();

getELE("btnThemNguoiDung").addEventListener("click", function () {
    document.getElementsByClassName("modal-title")[0].innerHTML = "Them Nguoi Dung";
    var footer = `
    <button class="btn btn-success" onclick="ThemNguoiDung()">Add</button>
    `;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
});
//Them Nguoi DUng
function ThemNguoiDung(){
    var taiKhoan = getELE("TaiKhoan").value;
    var hoTen = getELE("HoTen").value;
    var matKhau = getELE("MatKhau").value;
    var email = getELE("Email").value;
    var soDT = getELE("SoDienThoai").value;
    var maLoaiNguoiDung = getELE("loaiNguoiDung").value;
    var nguoiDung = new NguoiDung(taiKhoan,hoTen,matKhau,email,soDT,maLoaiNguoiDung);
    // console.log(nguoiDung);
    nguoiDungService.themNguoiDung(nguoiDung)
        .then(function(result){
            console.log(result);
            // renderTable(result);
            // location.reload(); //Lam trang web minh load lai trang, nhu vay minh cung khong can chay lai renderTable() ma minh da lam phia duoi nua
            getListUser();
            alert("Them nguoi dung thanh cong");
        })
        .catch(function(error){
            console.log(error);
        });
}

function renderTable(mangNguoiDung) {

    var contentHTML = "";
    var tbody = getELE("tblDanhSachNguoiDung");
    mangNguoiDung.map(function (item, index) {
        contentHTML += `<tr>
        <td>${index + 1}</td>
        <td>${item.taiKhoan}</td>
        <td>${item.matKhau}</td>
        <td>${item.hoTen}</td>
        <td>${item.email}</td>
        <td>${item.soDT}</td>
        <td>${item.maLoaiNguoiDung}</td>
        <td>                                
            <button id="btnSua" class="btn btn-info" onclick = suaNguoiDung('${item.id}') data-toggle="modal" data-target="#myModal">Sửa</button>
            <button id="btnXoa" class="btn btn-danger" onclick = xoaNguoiDung('${item.id-1}')>Xóa</button>
        </td>
        </tr>`;
    });
    tbody.innerHTML = contentHTML;
}
/**
 * Xoa nguoi gun
 * 
 */

 function xoaNguoiDung(id){
     nguoiDungService.xoaNguoiDung(id)
        .then(function(result){
            alert("Xoa nguoi dung thanh cong");
            getListUser();
        })
        .catch(function(error){
            console.log(error);
        });
 }

 function capNhatNguoiDung(id){
    var taiKhoan = getELE("TaiKhoan").value;
    var hoTen = getELE("HoTen").value;
    var matKhau = getELE("MatKhau").value;
    var email = getELE("Email").value;
    var soDT = getELE("SoDienThoai").value;
    var maLoaiNguoiDung = getELE("loaiNguoiDung").value;
    var nguoiDung = new NguoiDung(taiKhoan,hoTen,matKhau,email,soDT,maLoaiNguoiDung);
     nguoiDungService.capNhatNguoiDung(id,nguoiDung)
        .then(function(result){
            alert("Sua nguoi dung thanh cong");
            getListUser();
        })
        .catch (function(err){
            console.log(err);
        });
 }

//  getELE("btnSua").addEventListener("click", function () {
//     document.getElementsByClassName("modal-title")[0].innerHTML = "Sửa người dùng";
//     var footer = `
//     <button class="btn btn-success" onclick="capNhatNguoiDung()">Cập nhật</button>
//     `;
//     document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

//     nguoiDungService.layThongTinNguoiDung()
//         .then(function(result){
//             console.log();
//             getELE("TaiKhoan").value = result.data.taiKhoan;
//         })
//         .catch(function(err){
//             console.log();
//         })
// });

function suaNguoiDung(id){
    document.getElementsByClassName("modal-title")[0].innerHTML = "Sửa người dùng";
    var footer = `
    <button class="btn btn-success" onclick="capNhatNguoiDung(${id})">Cập nhật</button>
    `;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

    nguoiDungService.layThongTinNguoiDung(id)
        .then(function(result){
            console.log();
            getELE("TaiKhoan").value = result.data.taiKhoan;
            getELE("HoTen").value = result.data.hoTen;
            getELE("MatKhau").value = result.data.matKhau;
            getELE("Email").value = result.data.email;
            getELE("SoDienThoai").value = result.data.soDT;
            getELE("loaiNguoiDung").value = result.data.maLoaiNguoiDung;
        })
        .catch(function(err){
            console.log();
        })
}


getELE("txtSearch").addEventListener("keyup",function(){
    var chuoiTimKiem = getELE("txtSearch").value;
    var danhSachLocal = getLocalStorage();
    // nguoiDungService.layDanhSachNguoiDung()
    var mangTimKiem = nguoiDungService.timNguoiDung(chuoiTimKiem, danhSachLocal);
    console.log(mangTimKiem);
    renderTable(mangTimKiem);
    //     .
})


function setLocalStorage(data){
    localStorage.setItem("DSND", JSON.stringify(data));
}

function getLocalStorage(){
    if(localStorage.getItem("DSND")){
        return JSON.parse(localStorage.getItem("DSND"));
    }
}

function themNguoiDungTest(){
    console.log("Them nguoi dung");
}
