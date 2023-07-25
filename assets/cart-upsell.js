const upsellContainer = document.querySelector('.cart-upsell__container')
const upsellBtn = upsellContainer.querySelector('.upsell-product__atc--button')
upsellBtn.addEventListener('click', upsellAddToCart)

const sectionRender = () => {
  fetch(window.location.pathname + "?sections=main-cart-items")
  .then((res) => res.json())
    .then((responseText) => {
      console.log('section render console-->', responseText)
      const html =  new DOMParser().parseFromString(JSON.stringify(responseText), 'text/html')
      console.log('section render html-->', html)
      const source = html.querySelector('cart-items');
      console.log('section render source inner html-->', source.innerHTML)
      document.getElementById('main-cart-items').querySelector('.js-contents').innerHTML = source.innerHTML; 
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
      //location.reload();
    })
    .catch((error) => {
      console.error('Error updating cart item:', error);
    });
}