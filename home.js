
const listData = [
  {
    id: 1,
    link: 'https://cdn.tgdd.vn/Products/Images/42/223602/iphone-13-blue-1-600x600.jpg',
    nameProduct: 'iPhone 13 128GB',
    price: 2000000,
    quantity: 10
  },
  {
    id: 2,
    link: 'https://cdn.tgdd.vn/Products/Images/42/247508/iphone-14-pro-vang-thumb-600x600.jpg',
    nameProduct: 'iPhone 14 Pro 256GB',
    price: 1800000,
    quantity: 0
  },
  {
    id: 3,
    link: 'https://cdn.tgdd.vn/Products/Images/42/213031/iphone-12-den-new-2-600x600.jpg',
    nameProduct: 'iPhone 12 128GB',
    price: 2500000,
    quantity: 8
  },
  {
    id: 4,
    link: 'https://cdn.tgdd.vn/Products/Images/42/223602/iphone-13-blue-1-600x600.jpg',
    nameProduct: 'iPhone 13 256GB',
    price: 3000000,
    quantity: 3
  },
  {
    id: 5,
    link: 'https://cdn.tgdd.vn/Products/Images/42/245545/iPhone-14-plus-thumb-den-600x600.jpg',
    nameProduct: 'iPhone 14 Plus 128GB',
    price: 2200000,
    quantity: 7
  },
  {
    id: 6,
    link: 'https://cdn.tgdd.vn/Products/Images/42/240259/iPhone-14-thumb-do-600x600.jpg',
    nameProduct: 'iPhone 14 128Gb',
    price: 4500000,
    quantity: 2
  },
  {
    id: 7,
    link: 'https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-den-thumb-600x600.jpg',
    nameProduct: 'iPhone 14 Pro Max 128GB',
    price: 2800000,
    quantity: 4
  },
  {
    id: 8,
    link: 'https://cdn.tgdd.vn/Products/Images/42/247508/iphone-14-pro-vang-thumb-600x600.jpg',
    nameProduct: 'iPhone 14 Pro 256GB',
    price: 4000000,
    quantity: 1
  },
  {
    id: 9,
    link: 'https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-den-thumb-600x600.jpg',
    nameProduct: 'iPhone 14 Pro Max 128GB',
    price: 1800000,
    quantity: 10
  },
  {
    id: 10,
    link: 'https://cdn.tgdd.vn/Products/Images/42/223602/iphone-13-blue-1-600x600.jpg',
    nameProduct: 'iPhone 13 512GB',
    price: 3000000,
    quantity: 3
  }
];



// setItem(keyLocalStorageListSP, listData)

function renderProduct() {
  var HTML = ''
  var item = getItem(keyLocalStorageListSP)
  item.forEach(function (element) {
    HTML += `
        <div class="col-2">
                        <div class="product">
                            <div style="background-image: url( ${element.link});" class="img"></div>
                            <div class="product-info">
                                <div class="product__name"> ${element.nameProduct}</div>
                                <div class="product__footer">
                                  <div class="product__price">$ ${element.price}</div>
                                  <div class="quantity">Quantity: ${element.quantity}</div>
                                </div>
                                <div class="star">
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star"></i>
                                </div>
                            </div>
                            <div onclick="addSP(${element.id})" class="add__sp">
                              <i class="fa-solid fa-cart-plus"></i>
                            </div>
                        </div>
          </div>
        `
  })

  return product.innerHTML = HTML
}




function addSP(id) {
  var arr = getItem(keyLocalStorageItemCart) || []
  var item = getByID(id)
  if (item.quantity === 0) {
    alert('het hang')
  }
  else {
    let sp = arr.find(function (item) {
      return item.idSP === id
    })
    if (sp && sp.soLuong < item.quantity)
      sp.soLuong++
    else {
      if (sp && sp.soLuong === item.quantity) { alert("k du so luong") }
      if (!sp)
        arr.push(
          {
            idSP: id,
            soLuong: 1
          }
        )
    }
  }
  setItem(keyLocalStorageItemCart, arr)
  renderNotice()
}

; (function start() {
  renderNotice()
  renderProduct()
})()