
// Cart bubble/number updation
const updateCartBubble = (item_count) => {
  let cartIconBubble = document.querySelector('#cart-icon-bubble')
  let cartCountBubble = cartIconBubble.querySelector('.cart-count-bubble span')
  cartCountBubble.innerHTML = item_count
}

// Cart subtotal updation
const updateCartSubtotal = (subTotal) => {
  let mainCartFooter = document.querySelector('#main-cart-footer')
  let mainCartFooterSubtotal = mainCartFooter.querySelector('.totals__subtotal-value')
  mainCartFooterSubtotal.innerHTML = Shopify.Currency.formatMoney(subTotal, Shopify.money_with_currency_format);
}

// Product removal from Cart
function cartRemove(e) {
  e.preventDefault();
  const cartRemoveButton = e.target.closest('cart-remove-button')
  cartRemoveButton.classList.add('disabled')
  const dataSet = cartRemoveButton.dataset
  const variantId = dataSet.variant
  const tableRow = dataSet.index

  const data = {
    id: variantId,
    quantity: 0,
  };

  fetch(`${routes.cart_change_url}.js`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((cart) => {
      console.log('Cart item removed:', cart);
      document.querySelector('.cart-items').deleteRow(tableRow)
      updateCartBubble(cart.item_count)
      updateCartSubtotal(cart.total_price)
      cartRemoveButton.classList.remove('disabled')
    })
    .catch((error) => {
      console.error('Error updating cart item:', error);
    });
};

// Product quantity change 
function updateQuantity(e) {
  e.preventDefault()
  const plus = e.target.parentElement.querySelector('.quantity__button[name="plus"]')
  const minus = e.target.parentElement.querySelector('.quantity__button[name="minus"]')
  plus.classList.add('disabled')
  minus.classList.add('disabled')
  const input = e.target.parentElement.querySelector('.quantity__input')
  const inputQty = parseInt(input.value)
  const qtyVariantId = input.dataset.quantityVariantId
  const RowIndex = input.dataset.index
  const lineIndex = parseInt(RowIndex - 1)
  const cartItem = document.querySelector(`#CartItem-${RowIndex}`)
  const discountedlinePriceElm = cartItem.querySelector('.cart-item__price-wrapper .line-old_price')
  const linePriceElm = cartItem.querySelector('.cart-item__price-wrapper .cart-item__final-price')
  const lineError = cartItem.querySelector('.cart-item__error .cart-item__error-text')
  const loading = cartItem.querySelector('.cart-item__totals--loading')
  loading.classList.remove('hidden')

  const data = {
    id: qtyVariantId,
    quantity: inputQty,
  }

  fetch(`${routes.cart_change_url}.js`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((cart) => {
      updateCartBubble(cart.item_count)
      updateCartSubtotal(cart.total_price)
      discountedlinePriceElm ? (discountedlinePriceElm.innerHTML = Shopify.Currency.formatMoney(cart.items[lineIndex].original_line_price, Shopify.money_format)) : null
      loading.classList.add('hidden')
      plus.classList.remove('disabled')
      minus.classList.remove('disabled')
      linePriceElm ? (linePriceElm.innerHTML = Shopify.Currency.formatMoney(cart.items[lineIndex].final_line_price, Shopify.money_format)) : null
      cart.message ? (lineError.innerHTML = cart.message) : null
    })
    .catch(() => {
      lineError.innerHTML = window.cartStrings.error;
      input.value = inputQty - 1;
    });
}



