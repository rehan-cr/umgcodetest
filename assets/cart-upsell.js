const upsellContainer = document.querySelector('.cart-upsell__container')
const upsellBtn = upsellContainer.querySelector('.upsell-product__atc--button')
upsellBtn.addEventListener('click', upsellAddToCart)

const sectionRender = () => {
  fetch(window.location.pathname + '?sections=main-cart-items')
  .then(response => response.json())
  .then(json => {
      document.getElementsByTagName('cart-items')[0].parentElement.innerHTML = new DOMParser().parseFromString(json['main-cart-items'], 'text/html').documentElement.innerHTML;  
  })

  fetch(`${routes.cart_url}.js`)
  .then(response => response.json())
  .then(getCart => {
    updateCartSubtotal(getCart.items_subtotal_price)
  })

}

function upsellAddToCart (e) {
  e.preventDefault()
  const upsellProduct = upsellContainer.querySelector('.upsell-product__title')
  const variantId = upsellProduct.dataset.variantId;
  console.log(variantId)


  const data = {
    id: variantId,
    quantity: 1,
  };

  fetch(`${routes.cart_add_url}.js`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((upsellResponse) => {
      console.log('Upsell item added:', upsellResponse);
      sectionRender()
    })
    .catch((error) => {
      console.error('Error updating cart item:', error);
    });
}





