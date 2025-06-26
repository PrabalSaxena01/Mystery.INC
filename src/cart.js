let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("cart")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket
        .map((product) => product.item)
        .reduce((x, y) => x + y, 0);
};
calculation();

let generateCartItems = () => {
    if (basket.length !== 0) {
        // console.log("not");

        return (shoppingCart.innerHTML = basket
            .map((item) => {
                let search =
                    shopItemsData.find((product) => product.id === item.id) || [];

                return `
    <div class="cart-item">
    <img src=${search.img} width = 100>
    
    <div class="details">
    <div class= "title-price-x">
    <h4 class="title-price">
        <h4><p>${search.name}</p></h4>
        <p class="cart-item-price">₹${search.price}</p></h4>
        <i onclick="removeItem('${item.id}')" class="bi bi-x-lg"></i>
        </div>
   <div class="buttons">
              <i onclick="increment('${item.id}')" class="bi bi-plus-lg"></i>
              <div id="${item.id}" class=
              "quantity">${item.item}</div>
              <i onclick="decrement('${item.id}')"class="bi bi-dash-lg"></i>
            </div>
     <h3>₹${item.item * search.price}</h3>
    </div>
    </div>
    `;
    })
            .join(""));
    } else {
        // console.log("yes");
        shoppingCart.innerHTML = ``;
        label.innerHTML = `<h2>Cart is empty</h2>
<a href="index.html"><button class = "Homebtn">
Back to Home</button></a>`;
    }
};

generateCartItems();
let increment = (itemId) => {
  let search = basket.find((item) => item.id === itemId);
  if (search === undefined) {
    basket.push({ id: itemId, item: 1 });
  }
  else{
    search.item+=1;
  }
  console.log(basket);
  update(itemId);
};
let decrement = (itemId) => {
     let search = basket.find((item) => item.id === itemId);
  if(search===undefined)return;
     if (search.item === 0) {
    return
  }
  else{
    search.item-=1;

  }

  update(itemId);
};
let update=(itemId)=>{
let search = basket.find((item) => item.id === itemId);
let itemNumber = document.getElementById(itemId);
itemNumber.innerHTML=search.item;
calculation();
basket = basket.filter(x=>x.item!==0);
generateCartItems();
totalAmount();
localStorage.setItem("cart",JSON.stringify(basket));
}
let removeItem = (deleteId)=>{
basket = basket.filter(del=>del.id!==deleteId);
localStorage.setItem("cart",JSON.stringify(basket));
generateCartItems();
totalAmount();
calculation();
}
let clearCart = () => {
  basket = [];
  generateCartItems();
  calculation();
  localStorage.setItem("cart", JSON.stringify(basket));
};

let totalAmount = ()=>{
    if (basket.length !== 0){
        let amount = basket.map(item =>{
             let search =
                    shopItemsData.find((product) => product.id === item.id) || [];
            return item.item*search.price;
        }).reduce((x,y)=>x+y,0);
    label.innerHTML=
    `<h2>Total Bill 
        :
        ₹${amount}
    </h2>
    <button onclick="showPayment()" class ="checkout">
Checkout
    </button>

    <button onclick="clearCart()"class ="removeAll">
Clear Cart
    </button>`}
    else{
        return;
    }
}

totalAmount();
  function showPayment() {
    document.getElementById("paymentMessage").style.display = "block";
  }