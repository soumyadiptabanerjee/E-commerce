
let products = [
{
title: 'adidas',
price: 999.00,
image: 'pro-shirt1.jpeg',
tag: 'shirt1',
incart: 0
},
{
title: 'nike',
price: 1999.00,
image: 'pro-shirt2.jpeg',
tag: 'shirt2',
incart: 0
},
{
title: 'highlander',
price: 899.00,
image: 'pro-shirt3.jpeg',
tag: 'shirt3',
incart: 0
},
{
title: 'adidas',
price: 1399.00,
image: 'pro-shirt4.jpeg',
tag: 'shirt4',
incart: 0
},
{
title: 'lancer',
price: 999.00,
image: 'pro-shirt5.jpeg',
tag: 'shirt5',
incart: 0
},
{
title: 'adidas1',
price: 799.00,
image: 'pro-shirt6.jpeg',
tag: 'shirt6',
incart: 0
},
{
title: 'campus',
price: 1299.00,
image: '1pro-shirt7.jpeg',
tag: 'shirt7',
incart: 0
},
{
title: 'nike1',
price: 699.00,
image: 'pro-shirt8.jpeg',
tag: 'shirt8',
incart: 0
},
{
title: 'lancer1',
price: 999.00,
image: 'pro-shirt9.jpeg',
tag: 'shirt9',
incart: 0
},
{
title: 'adidas2',
price: 799.00,
image: 'pro-shirt10.jpeg',
tag: 'shirt10',
incart: 0
},
{
title: 'campus1',
price: 1299.00,
image: 'pro-shirt11.jpeg',
tag: 'shirt11',
incart: 0
},
{
title: 'nike2',
price: 699.00,
image: 'pro-shirt12.jpeg',
tag: 'shirt12',
incart: 0
},
]

let add_cart = document.querySelectorAll('.addToCart'); 

for(let i=0; i< add_cart.length; i++){
    add_cart[i].addEventListener('click', (event) => {
        cartNumbers(products[i]);
        totalCost(products[i]);
        event.preventDefault();
        alert('Item added to cart');
    })
}


function cartNumbers(products){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
// we are using if else beacuse when there is nothing in local storage we are wanted to getItem as there is nothing so it returns NaN and when we were simply setItem('cartsNumber', productNumbers + 1) then it was returning NaN so for that reason we made a if else for case 1. if there is nothing, case 2. if there is then adding that with currrent.
    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
    }
    else{
        localStorage.setItem('cartNumbers', 1);
    }
    setItems(products);
}

function setItems(products){
     let cartItems = localStorage.getItem('productInCart');
     cartItems = JSON.parse(cartItems);
    
    if(cartItems != null){
        if(cartItems[products.tag] == undefined){
            cartItems = {
                ...cartItems,
                [products.tag]: products
            }
        }
        cartItems[products.tag].incart += 1;
    }
    else{
        products.incart = 1;
        cartItems = {
            [products.tag]: products
        }
    }
    localStorage.setItem('productInCart',JSON.stringify(cartItems));

}

function totalCost(products){
     let getCost = localStorage.getItem('totalCost');
     let discountCost = localStorage.getItem('discountCost');
     if(getCost != null){
        getCost = parseInt(getCost);
        discountCost = parseInt(discountCost);
        localStorage.setItem('totalCost', getCost + products.price);
        localStorage.setItem('discountCost', discountCost + products.price);
     } else {
        localStorage.setItem('totalCost', products.price);
        localStorage.setItem('discountCost', products.price);
     }
}

function displayCart(){
    
     let cartItems = localStorage.getItem('productInCart');
     cartItems = JSON.parse(cartItems);
     let productContainer = document.querySelector('.products');
     let getCost = localStorage.getItem('totalCost');
     let discountCost  = localStorage.getItem('discountCost');
     if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map((item,k) => { 
            productContainer.innerHTML += `
            <div class='row remove mt-5' >
            <div class=' col-5' id='itemList'>
              <div class='row me-3'>
              <div class='col-2 title'>
              <i class="bi bi-x-circle text-danger" onclick='removeData(${k})'></i>
              </div>
               <div class='col-5'>
            <img src='./images/${item.image}' class='img-fluid img'>
            </div>
            <div class='col-5 itemName title'>
            <span class='ms-3'>${item.title}</span>
            </div>
           </div>
            </div>
            <div class='price col-2 title'>Rs.${item.price}</div>
            <div class='col-3 title'>
            <i class="bi bi-plus-circle me-2 text-success" onclick='increeData(${k})'></i>
            ${item.incart}
            <i class="bi bi-dash-circle ms-2 text-danger" onclick='decreeData(${k})'></i>
            </div>
            <div class='col-2 title item_price'>
            Rs.${item.incart * item.price}
            </div>
            </div> 
            `
        });

        productContainer.innerHTML += `
        <div class='row mt-3 total_sec'>
        <div class='col-6 total_sec_col'>
        <div class='row'>
        <div class="accordion mb-3"  id="accordionFlushExample">
        <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingOne">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        Coupons
        </button>
        </h2>
        <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body input-group" style="font-size: 1.2rem; !important">
        </div>
        </div>
        </div>
        </div>
        </div>
        <div class='row'>
        <div class='col-6 '>Sub Total</div>
        <div class='col-6 '>Rs.${getCost}</div>
        </div>
        <div class='row mt-2 mb-2 discount'>
        </div>
        <div class='row'>
        <div class='col-6 '>Total Amount</div>
        <div class='col-6 '>Rs.${discountCost}</div>
        </div>
        <div class='row justify-content-center d-flex mt-3'>
        <div class='col-12'>
        <button type="submit" class="placeOrder" onclick="showSuccess()">Place Order</button>
        </div>
        </div>
        </div>
        </div>
        `
     }
}

function accordion(){
    let accordion = document.querySelector('.accordion-body');
    let discount = document.querySelector('.discount');
    let getCost= localStorage.getItem('totalCost');
    if(getCost > 2000){
        accordion.innerHTML = `
        <button class="btn btn-outline-secondary" type="button" id="button-addon1" >Button</button>
        <input type='text' placeholder='check coupon' class='form-control' aria-describedby="button-addon1" id='coupon' aria-label="Example text with button addon" onchange="getVal()">
        `
        discount.innerHTML = `
        <div class='col-6 '>Discount</div>
        <div class='col-6 '>Rs.500</div>
        `
    }
    else{
        accordion.innerHTML = 'Total amount less than Rs.2000';
    }
}

function getVal(){
    let coupon = document.querySelector('#coupon').value;
    let discountCost = localStorage.getItem('discountCost');
    discountCost = parseInt(discountCost);
    let getCost= localStorage.getItem('totalCost');
    getCost = parseInt(getCost);
    if(coupon == 'FIRST'){
        if(getCost > 2000){
            localStorage.setItem('discountCost', getCost - 500);
            
        }
    }
    
    displayCart();
    accordion();
}


function removeData(rid){
    let getCost= localStorage.getItem('totalCost');
    let cartItems = localStorage.getItem('productInCart');
    let discountCost = localStorage.getItem('discountCost');
    discountCost = parseInt(discountCost);
    let cartNUmbers = localStorage.getItem('cartNumbers');
    cartItems = JSON.parse(cartItems);
    const arr_cart = Object.entries(cartItems);
    arr_cart.splice(rid,1);
    const arr = Object.fromEntries(arr_cart);
    localStorage.setItem('productInCart',JSON.stringify(arr));
    let incart_arr = Object.entries(cartItems);
    getCost = parseInt(getCost);
    if(cartItems){
        localStorage.setItem('cartNumbers', cartNUmbers - 1);
       
    }
    else{
        localStorage.setItem('cartNumbers', 1);
    }
    if(getCost !=null){
        localStorage.setItem('totalCost', getCost - (incart_arr[rid][1].price*incart_arr[rid][1].incart));
        if(getCost>2000){
            localStorage.setItem('discountCost', discountCost - (incart_arr[rid][1].price*incart_arr[rid][1].incart));
        }
    }
    else{
        localStorage.setItem('totalCost', products.price);
    }

    getCost = parseInt(getCost);
    if(getCost<2000){
        localStorage.setItem('discountCost', getCost);
    } 
    removeCoupon();
    displayCart();
}


function increeData(rid){
    let cartItems = localStorage.getItem('productInCart');
    let discountCost = localStorage.getItem('discountCost');
    discountCost = parseInt(discountCost);
    let getCost= localStorage.getItem('totalCost');
    getCost = parseInt(getCost);
     cartItems = JSON.parse(cartItems);
     const arr_cart = Object.entries(cartItems);
    if(arr_cart != null){
        arr_cart[rid][1].incart += 1;
    }
    else{
        arr_cart[rid][1].incart = 1;
    }
    const arr = Object.fromEntries(arr_cart);
    localStorage.setItem('productInCart',JSON.stringify(arr));
    let incart_arr = Object.entries(cartItems);
    if(getCost !=null){
        localStorage.setItem('totalCost', getCost + (incart_arr[rid][1].price));
        localStorage.setItem('discountCost', discountCost + incart_arr[rid][1].price);
    }
    else{
        localStorage.setItem('totalCost', getCost *incart_arr[rid][1].incart);
        
    }
    window.location.reload();

    // if(getCost>2000){
    //     localStorage.setItem('discountCost', getCost - 500);
    // }



}


function decreeData(rid){
    let cartItems = localStorage.getItem('productInCart');
    let cartNUmbers = localStorage.getItem('cartNumbers');
    cartNUmbers = parseInt(cartNUmbers);
    let discountCost = localStorage.getItem('discountCost');
    discountCost = parseInt(discountCost);
    let getCost= localStorage.getItem('totalCost');
    getCost = parseInt(getCost);
     cartItems = JSON.parse(cartItems);
     const arr_cart = Object.entries(cartItems);
     let incart_arr = Object.entries(cartItems);
    if(arr_cart != null){
        if(arr_cart[rid][1].incart>0){
            arr_cart[rid][1].incart -= 1;
            localStorage.setItem('totalCost', getCost - (incart_arr[rid][1].price));
            localStorage.setItem('discountCost', discountCost - (incart_arr[rid][1].price));
        }
        else if(arr_cart[rid][1].incart<1){
            arr_cart.splice(rid,1);
            localStorage.setItem('totalCost', getCost);
            localStorage.setItem('cartNumbers', cartNUmbers - 1);
        }
    }
    else{
        arr_cart[rid][1].incart = 1;
    }
    const arr = Object.fromEntries(arr_cart);
    localStorage.setItem('productInCart',JSON.stringify(arr));
    window.location.reload();
    
    removeCoupon();
    displayCart();
}

function removeCoupon(){
    let getCost = localStorage.getItem('totalCost');
    getCost = parseInt(getCost);
    let discountCost = localStorage.getItem('discountCost');
    discountCost = parseInt(discountCost);
    if(getCost<2000){
        localStorage.setItem('discountCost', getCost);
    }
    // console.log(getCost);
    
}
function showSuccess(){
    if(confirm('place order')){
        window.location.href = 'success.html';
    }
}
displayCart();
accordion();

