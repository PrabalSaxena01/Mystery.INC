let shop = document.getElementById("shop");


let basket = JSON.parse(localStorage.getItem("cart")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData.map((item) => {
    let search = basket.find((x)=>x.id=== item.id)|| [];
      return `
        <div class="item" id="productId-${item.id}">
        <img src="${item.img}" alt="" />
        <div class="details">
          <h2>${item.name}</h2>
         ${item.desc} <div class="product-quantity">
            <h3>₹${item.price}</h3>
            <div class="buttons">
              <i onclick="increment('${item.id}')" class="bi bi-plus-lg"></i>
              <div id="${item.id}" class=
              "quantity">
              ${search.item===undefined?0:search.item}</div>
              <i onclick="decrement('${item.id}')"class="bi bi-dash-lg"></i>
            </div>
          </div>
        </div>
      </div>`;
    })
    .join(""));
};

generateShop();

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
  console.log(basket);
  update(itemId);
};
let update=(itemId)=>{
let search = basket.find((item) => item.id === itemId);
let itemNumber = document.getElementById(itemId);
itemNumber.innerHTML=search.item;
calculation();
basket = basket.filter(x=>x.item!==0);
localStorage.setItem("cart",JSON.stringify(basket));
}

let calculation=()=>{
let cartIcon = document.getElementById("cartAmount");
cartIcon.innerHTML=(basket.map((product)=>product.item).reduce((x,y)=>x+y,0));
}
calculation();