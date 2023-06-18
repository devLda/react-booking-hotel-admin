check chưa đăng nhập: tất cả các màn
check login (chưa)
check dashboard
màn đặt phòng: desc, asc, filter, thêm, sửa, huỷ, tìm kiếm, phân trang
màn hoá đơn: desc, asc, tìm kiếm, phân trang, lọc
màn phòng: desc, asc, tìm kiếm, phân trang, thêm sửa xoá
màn loại phòng: desc, asc, tìm kiếm, phân trang, thêm sửa xoá, ảnh
màn dịch vụ: tìm kiếm, phân trang, thêm sửa xoá

fix
check dashboard: format Money, format dơn đặt mới nhất, fix tiền trong BE
màn đặt phòng: fix filter dates, bỏ dates min
màn hoá đơn: desc, asc, tìm kiếm, phân trang, lọc

chưa fix
đến thời hạn chưa tự out

---

Chưa đăng nhập -> điều hướng về đăng nhập
Đăng xuất

//Deep compare 2 object
function deepEqual(obj1, obj2) {
// If both objects are the same instance, they are equal
if (obj1 === obj2) {
return true;
}

// Check if the objects are of the same type and have the same number of properties
if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null || Object.keys(obj1).length !== Object.keys(obj2).length) {
return false;
}

// Recursively compare each property and value
for (let prop in obj1) {
if (!obj2.hasOwnProperty(prop) || !deepEqual(obj1[prop], obj2[prop])) {
return false;
}
}

return true;
}

const obj1 = {
name: 'John',
age: 30,
address: { city: 'New York', country: {} }
};
const obj2 = {
name: 'John',
age: 30,
address: {
city: 'New York',
country: {}

    }

};
const obj3 = { name: 'John', age: 25, address: { city: 'New York', country: 'USA' } };

console.log(deepEqual(obj1, obj2)); // true
console.log(deepEqual(obj1, obj3)); // false
