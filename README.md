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