/*CART*/
const cart = document.getElementById("cart");
let opencart = document.getElementById("opencart");
opencart.onclick = function () {
  cart.classList.toggle("open");
  document.querySelector("#checkbtn").classList.toggle("checkout");
};

function detailSet() {
  let spanD = document.querySelectorAll(".dt");
  spanD.forEach((e) => {
    e.addEventListener("click", goToDetail);
  });
}
function goToDetail(e) {
  let element = e.target;
  window.localStorage.isbn = element.attributes.isbn.value;
  window.location.pathname = "detail.html";
}
//Get data from local storage on page load
window.onload = () => {
  let count = window.localStorage.length;
  for (let r = 0; r < count; r++) {
    if (window.localStorage.getItem(`buyed ${r}`)) {
      let buyed = document.createElement("div");
      buyed.classList.add("buyed");
      buyed.innerHTML = window.localStorage.getItem(`buyed ${r}`);
      cart.append(buyed);
      deleteSet();
    }
    cart.querySelector(
      "span"
    ).innerHTML = `Total is ${window.localStorage.getItem("total")} $`;
  }
};

/*Search*/
function search() {
  let inp = document.getElementById("searchINP");
  let cards = document.querySelectorAll(".pName");
  if (inp.value === "") {
    cards.forEach((c) => {
      c.parentElement.parentElement.style.display = "flex";
    });
  }
  for (let i = 0; i < cards.length; i++) {
    for (let j = 0; j < inp.value.length; j++) {
      let n = cards[i].innerHTML.toString().trim("").toLowerCase();
      if (!n.includes(inp.value) && inp.value !== "") {
        cards[i].parentElement.parentElement.style.display = "none";
      } else {
        cards[i].parentElement.parentElement.style.display = "flex";
      }
    }
  }
}
//add to cart
function addToCartSet() {
  let addbtns = document.querySelectorAll(".fa-cart-shopping");
  for (let a = 1; a < addbtns.length; a++) {
    addbtns[a].addEventListener("click", addToCart);
  }
}
var total = 0;
let index = 0;
function addToCart(e) {
  let price = e.target.parentElement
    .getElementsByTagName("p")[0]
    .innerHTML.trim("")
    .substring(1);
  let image =
    e.target.parentElement.parentElement.parentElement.querySelector("img").src;
  let name = e.target.parentElement.parentElement
    .querySelector("h1")
    .innerHTML.trim("");
  let buyed = document.createElement("div");
  buyed.classList.add("buyed");
  buyed.innerHTML = `
    <img src=${image} alt="null" >
    <div>
    <h1>${name}</h1>
    <p>${price} $</p>
    </div>
    <i class="fa-solid fa-trash trash" id="trash" index=${index}></i>
`;
  window.localStorage.setItem(`buyed ${index}`, buyed.innerHTML);
  index++;
  cart.append(buyed);
  total += Math.floor(parseFloat(price) * 100) / 100;
  window.localStorage.setItem("total", total);
  window.localStorage.setItem("details", "");
  cart.querySelector("span").innerHTML = `Total is ${total} $`;
  deleteSet();
}
//delete from cart
function deleteSet() {
  let deletebtns = document.querySelectorAll(".trash").forEach((d) => {
    d.addEventListener("click", removeItem);
  });
}
function removeItem(e) {
  window.localStorage.removeItem(
    `buyed ${e.target.attributes.getNamedItem("index").value}`
  );
  let cost = e.target.parentElement.getElementsByTagName("p")[0].innerHTML;
  let price = parseFloat(cost);
  total = window.localStorage.getItem("total");
  total -= price;
  window.localStorage.setItem("total", total);
  cart.querySelector("span").innerHTML = `Total is ${total} $`;
  e.target.parentElement.remove();
}
