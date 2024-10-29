let cart = [];
let cartTotal = 0;

function addToCart(productName, price) {
  cart.push({ productName, price });
  cartTotal += price;
  document.getElementById("cart-count").textContent = cart.length;
  alert(`${productName} har lagts till i varukorgen.`);
}

function showCart() {
  document.getElementById("cart-modal").classList.remove("hidden");
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = "";

  cart.forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.textContent = `${item.productName} - ${item.price} kr`;
    cartItemsContainer.appendChild(itemElement);
  });

  document.getElementById("cart-total").textContent = cartTotal;
}

function hideCart() {
  document.getElementById("cart-modal").classList.add("hidden");
}

/* Buy order by paypal--------------------------------------- */
function renderPayPalButton() {
  paypal
    .Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: { value: cartTotal.toString() },
            },
          ],
        });
      },
      onApprove: (data, actions) => {
        return actions.order.capture().then((details) => {
          alert(`Tack för ditt köp, ${details.payer.name.given_name}!`);
          cart = [];
          cartTotal = 0;
          document.getElementById("cart-count").textContent = "0";
          hideCart();
        });
      },
    })
    .render("#paypal-button-container");
}

// Kalla på renderPayPalButton när sidan laddas
document.addEventListener("DOMContentLoaded", renderPayPalButton);
