
; (function start() {
    getCart(renderBill)
    renderNotice()
})()




// deleteBill(1)

function showDetail(event) {
    table = event.target.parentElement.querySelector('.detail')
    tableBTN = event.target.parentElement.querySelector('.detail-btn')
   
    if (table.classList.contains('show')) {
        table.classList.remove('show')
    }
    else {
        table.classList.add('show')
    }
}


function getIDAPI(ID) {
    return fetch(cartAPI)
        .then((response) => {
            return response.json()
        })
        .then((cart) => {
            let result
            cart.forEach(element => {
                if (element.ID === ID) {
                    result = element.id
                }
            });
            return result
        })
}

function getItemAPI(ID,callback)
{   
    getIDAPI(ID).then(result => {
        fetch(cartAPI + '/' + result).then(reponse => {
            return reponse.json()
        }).then(callback)
    })
}
function returnBill(listItemAdd)
{   
    let listdata = getItem(keyLocalStorageListSP)
    listdata.map(function(item){
        listItemAdd.cartOld.map(itemAdd => {
            if(item.id === itemAdd.idSP)
            {
                item.quantity += itemAdd.soLuong
            }
        })
        return listdata
    })
    setItem(keyLocalStorageListSP,listdata)
}


async function deleteBill(ID, callback) {
    const result = await getIDAPI(ID);
    const option = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        }
    };
    await fetch(cartAPI + '/' + result, option);
    callback();
}
function removeBill(ID) {
    getItemAPI(ID,returnBill)
    deleteBill(ID, function () {
        getCart(renderBill)
    })
}

function getCart(callback) {
    fetch(cartAPI)
        .then((response) => { return response.json() })
        .then(callback)
}

function renderBill(Carts) {
    var HTML = `
    
    `
    // console.log(Carts);
    Carts.forEach(function (item) {
        HTML += `
                <tr>
                    <td class="align ">
                    
                    <span> ${item.ID} </span>
                    <span onclick = "showDetail(event)" class="detail-btn">Detail</span>
                    
                    <div class="detail">
                            <table class="boxbill">
                                <tr>
                                    <th class="line">Number</th>
                                    <th class="line">Product name</th>
                                    <th class="line">Quantity</th>
                                    <th class="line">Sub Total</th>
                                </tr>
                                <tbody class="product__cart2">
                                `
        item.cartOld.forEach(function (item2,index) {
            var itemHasIMG = getByID(item2.idSP)
            HTML += `
                                    <tr>
                                    <td class="align line">${index+1}</td>
                                        <td class = "line">
                                            <div class="name__incart2">
                                                ${itemHasIMG.nameProduct}
                                            </div>
                                        </td>
                                        
                                        <td class="align line">${item2.soLuong}</td>
                                        <td class="align line">${item2.soLuong * itemHasIMG.price}$</td>
                                    </tr >
                                    `
        })

        HTML += `
                     <tr style = "border:0;">
                        <td class="align line" colspan = "4" >  Total: ${item.totalPrice}$</td>
                    </tr>
                            </table>
                    </div>
                    </td>
                    <td class="align line">${item.name}</td>
                    <td class="align line">${item.day}</td>
                    <td class="align line">${item.id}</td>
                    <td class="align line">${item.totalQuantity}</td>
                    <td class="align line">${item.totalPrice}$</td>
                    <td class="align line" ><i onclick ="removeBill('${item.ID}')" class="fa-regular fa-rectangle-xmark "></i></td>
                </tr>
            `
    })
    document.querySelector('.Bill').innerHTML = HTML
}