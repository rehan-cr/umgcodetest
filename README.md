# umgcodetest
## Git Repo: https://github.com/rehan-cr/umgcodetest
### [Store Preview](https://rehan-cr.myshopify.com/) , Preview password: ohsigo 
### Shoppable Lookpage - File changes:
- assets/shoppable-lookpage.css
- sections/shoppable-lookpage.liquid
- snippets/modal-product-card.liquid
- snippets/pulse.liquid
- assets/lookpage-modal.js
```
In Shoppable Lookbook section we have grid layout. We can add as many as rows & columns we want. 
On each image we can add three products. Clicking on each image it  will open a modal and in the 
modal we have three dots. Each dot's position is customizable. Shop Now label text is customizable.
```

### Ajax Cart - File changes:
- assets/cart-custom.js
- layout/theme.liquid
- sections/main-cart-items.liquid
```
I have created a custom ajax cart functionality. We can remove the product, change the 
quantity without reloading the page.
```

### Upsell on Cart - File Changes
- assets/cart-upsell.js
- sections/cart-upsell.liquid
- assets/cart-upsell.css
```
Its upsell feature on the Cart. To utilize this feature we need to add 𝐂𝐚𝐫𝐭 𝐔𝐩𝐬𝐞𝐥𝐥 section
in the cart page. I have provided a setting in customization from where we can set a 
particular product on Upsell for another product. The Upsell product will only appear 
on cart when its pair product will be added to the cart. When we click on the Add to Cart button 
of Upsell section the Upsell Product will be moved to the Cart and Upsell section be will hidden.
It's reverse condition is also followed when we remove the Upsell product from the Cart it will
be moved again to the Upsell section and Cart will be updated accordingly.
There is a default title of the section which changes when product will be changed from 
the customization settings. Also you can overwrite that default title of section. 
To update the section I am using Shopify section rendering API.
```
