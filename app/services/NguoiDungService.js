function NguoiDungService() {
    this.mangNguoiDung = [];
    this.layDanhSachNguoiDung = function () {
        return axios({
            method: "GET",
            url: "http://5dce9e0375f9360014c25fef.mockapi.io/api/NguoiDung"
        })
            
            
    };

    this.themNguoiDung = function(nguoiDung){
        return axios({
            method: "POST",
            url: "http://5dce9e0375f9360014c25fef.mockapi.io/api/NguoiDung",
            data: nguoiDung
        });
    };
    this.xoaNguoiDung = function(id){
        return axios({
            method:"DELETE",
            url: `http://5dce9e0375f9360014c25fef.mockapi.io/api/NguoiDung/${id}`, // url: "http://5dce9e0375f9360014c25fef.mockapi.io/api/NguoiDung/" + id
        });
    }

    this.capNhatNguoiDung = function(id,user){
        return axios({
            method: "PUT",
            url: `http://5dce9e0375f9360014c25fef.mockapi.io/api/NguoiDung/${id}`,
            data: user,
        });
    }

    this.layThongTinNguoiDung = function(id){
        return axios({
            method:"GET",
            url: `http://5dce9e0375f9360014c25fef.mockapi.io/api/NguoiDung/${id}`,
        });
    }

    this.timNguoiDung = function(chuoiTimKiem, danhSachNguoiDung){
        return danhSachNguoiDung.filter(function(item){ // ham filter() se tra ve mot cai mang con cua mang danhSachNguoiDung thoa dieu kien
            return item.hoTen.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1
        })
    }
}



