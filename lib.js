
const keyLocalStorageListSP = "DANHSACHSP"
const keyLocalStorageItemCart = "DANHSACHITEMCART"

const product = document.querySelector('.list__product')
const cartShopping = document.querySelector('.cart__shopping')
const home = document.querySelector('.home')
const main = document.querySelector('.main')
const mainShopping = document.querySelector('.main__shopping')
const productCart = document.querySelector('.product__cart')
const hasProduct = document.querySelector('.has__product')
const homeBackbtn = document.querySelector('.home__back')
const buy = document.querySelector('.buy')

const cartAPI = "https://6424e97e7ac292e3cff384a5.mockapi.io/api/carts"

// getItem setItem lên local
function setItem(key, value) {
    let valueJSON = JSON.stringify(value)
    localStorage.setItem(key, valueJSON)
}
function getItem(key) {
    let result = localStorage.getItem(key)
    return JSON.parse(result)
}


// getItem trên local by id
function getByID(idSP) {
    var item = getItem(keyLocalStorageListSP)
    var itemneed = item.find(function (element) {
        return element.id === idSP
    })
    return itemneed
}

//getItem 
function getByIDInCart(idSP) {
    var item = getItem(keyLocalStorageItemCart)
    var itemneed = item.find(function (element) {
        return element.idSP === idSP
    })
    return itemneed
}


function renderNotice()
{
  var notice = document.querySelector('.notice-cart')
  
  var Cart = getItem(keyLocalStorageItemCart)
  if (Cart.length !== 0)
  {
    notice.style.display = 'flex'
    notice.innerHTML = Cart.reduce(function(a,b)
    {
        return a += b.soLuong
    },0)
  }
  else
  {
  notice.style.display = 'none'
  }
}

