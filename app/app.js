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

/* Photos Slide Gallary */
let slideIndex = 0;
const images = [
  "/img/vitamin/man/4.jpeg",
  "/img/vitamin/childeren/2.jpeg",
  "/img/vitamin/bregnet/3.jpeg",
  "/img/vitamin/women/1.jpeg",
  "/img/vitamin/oldMan/3.jpeg",
  "/img/vitamin/oldWomen/4.jpeg",
];

// Shuffle images array randomly
function shuffleImages() {
  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
  }
}

// Display the current slide
function showSlide(index) {
  const slide = document.getElementById("slide");
  slide.src = images[index];
}

// Go to the next slide
function nextSlide() {
  slideIndex = (slideIndex + 1) % images.length;
  showSlide(slideIndex);
}

// Start the automatic slideshow with random order
function startAutoSlideshow() {
  shuffleImages(); // Shuffle images before starting
  showSlide(slideIndex); // Show the initial slide

  // Change slides every 3 seconds
  setInterval(() => {
    nextSlide();
  }, 3000);
}

// Start the slideshow on page load
window.onload = startAutoSlideshow;

/* Home Main photos galary med prev & next button */
let currentImageIndex = 0;
const img = [
  "/img/vitamin/man/4.jpeg",
  "/img/vitamin/childeren/2.jpeg",
  "/img/vitamin/bregnet/3.jpeg",
  "/img/vitamin/women/1.jpeg",
  "/img/vitamin/oldMan/3.jpeg",
  "/img/vitamin/oldWomen/1.jpeg",
]; // Lägg till dina bildfiler här

function changeSlide(direction) {
  currentImageIndex += direction;

  // Håller index inom gränserna av bildarrayen
  if (currentImageIndex < 0) {
    currentImageIndex = img.length - 1;
  } else if (currentImageIndex >= img.length) {
    currentImageIndex = 0;
  }

  // Ändrar bildkälla
  document.getElementById("galleryImage").src = img[currentImageIndex];
}

/* home txt toggle -------------------------------*/

const hideFunction1 = (e) => {
  const pTag = document.getElementById("p1");
  pTag.classList.toggle("hidden");
  console.log(e.target);
};
const hideFunction2 = () => {
  const pTag = document.getElementById("p2");
  pTag.classList.toggle("hidden");
};
const hideFunction3 = () => {
  const pTag = document.getElementById("p3");
  pTag.classList.toggle("hidden");
};
