const products = [
    { name: 'Peanut Pancake',
      tag: 1,
      price: 20,
      inCart: 0
    },
    { name: 'Vegan Salad',
      tag: 2,
      price: 14,
      inCart: 0
    },
    { name: 'Azure Fish',
      tag: 3,
      price: 17,
      inCart: 0
    },
    { name: 'Chili Soup',
      tag: 4,
      price: 28,
      inCart: 0
    },
]

const carts = document.querySelectorAll('.add-cart')

// !Aggiornare conteggio prodotti selezionati nel link Cart nell'header ad ogni click su un prodotto
for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () =>  {
        // Capire quale prodotto è stato cliccato in base al suo index nell'array
        cartsItemsNumber(products[i]);

        totalPrice(products[i])
    })
}
// Utilizzare il localstorage 
function cartsItemsNumber(product) {
    console.log(product)
    let productNumbers = localStorage.getItem('cartsItemsNumber');
    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartsItemsNumber', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartsItemsNumber', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}
// Assicurarsi che in caso di refresh di pagina gli elementi restino salvati e il numero nel link non torni a zero
function onLoadCardNumbers() {
    let productNumbers = localStorage.getItem('cartsItemsNumber');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}
// Passare al local storage l'oggetto/i cliccato con le sue caratteristiche prese dell'array + quante volte un oggetto è selezionato
function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    console.log(cartItems)
    
    if(cartItems != null) {
        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}
// Settare il price nel local storage e operazioni di somma qualora ci fossero molteplici prodotti
function totalPrice(product) {
    let cartCost = localStorage.getItem('totalCost');
    console.log(product.price)

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    } else {
        localStorage.setItem('totalCost', product.price);
    }
}

// Funzione per prendere i dati dal local storage e printarli nella shopping cart page
function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productsContainer = document.querySelector('.products');
    let cartCost = localStorage.getItem('totalCost');
    if(cartItems && productsContainer) {
        productsContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productsContainer.innerHTML += 
            `<div class="products"> 
                <span>${item.name}</span> 
            </div>
            <div class="price">$${item.price},00</div>
            <div class="quantity"><span>${item.inCart}</span></div>
            <div class="total">$${item.inCart * item.price},00</div>`
        })
        let totalPrice = document.querySelector('.product-total');
        totalPrice.innerHTML += 
        `<div class="basketTotal">
            <h4 class="basketTotalTitle">
                Prezzo finale
            </h4>
            <h4 class="basketTotal">
                $${cartCost},00
            </h4>
        </div>`
    }

}

// Funzioni che voglio runnare al caricamento della pagina
onLoadCardNumbers() 
displayCart()