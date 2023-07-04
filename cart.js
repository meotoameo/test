


function decrement(id) {
    var arr = getItem(keyLocalStorageItemCart) || []
    let sp = arr.find(function (item) {
        return item.idSP === id
    })
    if (sp.soLuong === 1) {
        alert('đã đạt tối thiểu')
    }
    else {
        sp.soLuong--
    }
    setItem(keyLocalStorageItemCart, arr)
    renderCart()
}


function increment(id) {
    let arr = getItem(keyLocalStorageItemCart) || []
    var item = getByID(id)
    let sp = arr.find(function (item) {
        return item.idSP === id
    })
    if (sp && sp.soLuong < item.quantity)
        sp.soLuong++
    else {
        if (sp && sp.soLuong === item.quantity) { alert("k du so luong") }
    }
    setItem(keyLocalStorageItemCart, arr)
    renderCart()
}




function totalInTable(idSP) {
    item = getByID(idSP)
    itemIncart = getByIDInCart(idSP)
    return item.price * itemIncart.soLuong
}

Array.prototype.total = function () {
    var result = 0
    this.forEach(function (element) {
        var item = getByID(element.idSP)
        var itemIncart = getByIDInCart(element.idSP)
        result += item.price * itemIncart.soLuong
    })
    return result
}


function renderTotal() {
    document.querySelector('.total').innerHTML =
        `Total: ${getItem(keyLocalStorageItemCart).total()}`

}

function removeItemIncart(id) {
    var arr = getItem(keyLocalStorageItemCart)
    arr.splice(id, 1)
    setItem(keyLocalStorageItemCart, arr)
    handleCart()
    setTimeout(() => {
        alert('xóa xong')
    }, 0);
    
}
function renderCart() {

    var HTML = ''
    getItem(keyLocalStorageItemCart).forEach((element, index) => {
        var item = getByID(element.idSP)
        HTML +=
            `
      <tr>
                          <td class="picture">
                              <img class="img__incart"
                                  src="${item.link}"
                                  alt="">
                          </td>
                          <td>
                              <div class="name__incart">
                                  ${item.nameProduct}
                              </div>
                              <div class="quantity__incart">
                                  Quantity: ${item.quantity}
                              </div>
                          </td>
                          <td class="align">
                              <i onclick = "decrement(${element.idSP})" class=" down fa-solid fa-minus"></i>
                              ${element.soLuong}
                              <i onclick = "increment(${element.idSP})"  class="up fa-solid fa-plus"></i>
                          </td>
                          <td class="align">${item.price} $</td>
                          <td class="align">${totalInTable(element.idSP)} $</td>
                          <td class="align"><i onclick = "removeItemIncart(${index})"  class=" x fa-regular fa-circle-xmark"></i></td>
                      </tr>
      `
    })
    renderTotal()
    return productCart.innerHTML = HTML
}


function handleCart() {
    item = getItem(keyLocalStorageItemCart)
    if (item.length === 0) {
        document.querySelector('.empty__cart').style.display = 'flex'
        hasProduct.style.display = 'none'
        buy.style.display = 'none'
    }
    else {
        hasProduct.style.display = 'block'
        buy.style.display = 'flex'
    }
    renderCart()
}


//   function homeBack() {
//     home.addEventListener('click',function(){
//       main.style.display = 'block'
//       document.querySelector('.empty__cart').style.display = 'none'
//       mainShopping.style.display = 'none'
//     })
//   }
//   homeBack()
const APIprovinces = 'https://provinces.open-api.vn/api/p/'
const APIdistricts = 'https://provinces.open-api.vn/api/d/'
const APIwards = 'https://provinces.open-api.vn/api/w/'

    ; (function callAPI() {
        fetch(APIprovinces)
            .then(response => {
                return response.json();
            })
            .then(listprovince => {
                let base = '<option value = "">--Chọn tỉnh/Thành phố--</option>'
                renderAddress(listprovince, 'tinh', base)
            })
            .catch(error => {
                console.error(error);
                alert("Đã có lỗi xảy ra khi lấy dữ liệu!");
            });
    })()


function onChangeHuyen(event) {
    const idSelected = event.target.options[event.target.selectedIndex].value
        ; (async function () {
            const listWards = await getWardsByDistristID(idSelected)
            let base = '<option value = "">--Chọn Phường/Xã--</option>'
            renderAddress(listWards, 'xa', base)
        })()
}

function onChangeTinh(event) {
    const idSelected = event.target.options[event.target.selectedIndex].value
        ; (async function () {
            const listDistricts = await getDistrictsByProvinceID(idSelected)
            let base = '<option value = "">--Chọn quận/Huyện--</option>'
            renderAddress(listDistricts, 'huyen', base)
            base = '<option value = "">--Chọn Phường/Xã--</option>'
            renderAddress([], 'xa', base)
        })()

}

async function getDistrictsByProvinceID(provinceID) {
    const response = await fetch(APIdistricts)
    const x1 = await response.json()
    const listDistricts = await x1.filter(function (item) {
        return item.province_code == provinceID
    })
    return listDistricts
}

async function getWardsByDistristID(districtID) {
    const response = await fetch(APIwards)
    const x1 = await response.json()
    const listWards = await x1.filter(function (item) {
        return item.district_code == districtID
    })
    return listWards
}



function renderAddress(data, section, base) {
    HTML = base
    data.forEach(function (item) {
        HTML += `<option value="${item.code}">${item.name}</option>`
    })
    document.querySelector('#' + section).innerHTML = HTML
}

function closeModal() {
    document.querySelector('.modal__buy').style.display = 'none'
}

function openModal() {
    document.querySelector('.modal__buy').style.display = 'block'
}
function addBill(data,callback) {
    fetch(cartAPI, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)

    }).then((response) => { return response.json() }).then(callback)
}
function createID() {
    const usedID = [];

    function generateRandomId(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    return {
        createNewID() {
            let ID = generateRandomId(6);
            while (usedID.includes(ID)) {
                ID = generateRandomId(6);
            }
            usedID.push(ID);
            return ID;
        },
        checklistID() {
            return usedID
        }
    }
}

//   const creat = createID();
//   console.log(creat.createNewID()); 
//   console.log(creat.createNewID()); 
// console.log(creat.checklistID());
function creatBill() {
    const xa = document.querySelector('#xa')
    const huyen = document.querySelector('#huyen')
    const tinh = document.querySelector('#tinh')
    const creat = createID()
    ID = creat.createNewID()
    let currentDate = new Date();
    let name = document.querySelector('#ho').value + ' ' + document.querySelector('#ten').value
    let address = `Xã: ${xa.options[xa.selectedIndex].textContent}, Huyện: ${huyen.options[huyen.selectedIndex].textContent}, Tỉnh: ${tinh.options[tinh.selectedIndex].textContent} `
    let bill = {
        ID: ID,
        name: name,
        address: address,
        day: `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`,
        cartOld: getItem(keyLocalStorageItemCart),
        totalPrice: `${getItem(keyLocalStorageItemCart).total()}`,
        totalQuantity: totalQuantity()
    }
    return bill
}


function totalQuantity() {
    let total = 0
    let item = getItem(keyLocalStorageItemCart)
    item.forEach(function (item) {
        total++
    })
    return total
}

; (function handleSubmit() {
    let check = false
    document.querySelector('.active').addEventListener('click', function () {

        renderNotice()
        listValidate.forEach(function (name) {
            if (isRequired(name) || isEmail(name) || isPhone(name)) {
                check = false
            }
            else {
                check = true
            }
        })
        if (check) {
            addBill(creatBill(), function () {
                closeModal()
            })
            handleQuantity()
            setItem(keyLocalStorageItemCart, [])
        }
        start()

    })

})()


function handleQuantity() {
  var listItemInCart = getItem(keyLocalStorageItemCart)
  var listItem = getItem(keyLocalStorageListSP)
  listItemInCart.map(function (itemincart) {
    listItem.map(function (item) {
      if (itemincart.idSP === item.id) {
            console.log(item.quantity);
            console.log(itemincart.soLuong);
                item.quantity -= itemincart.soLuong
      }
    })
  })
  setItem(keyLocalStorageListSP, listItem)
}


function start() {
    renderCart()
    handleCart()
}
start()
