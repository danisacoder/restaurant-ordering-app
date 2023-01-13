import { menuArray } from '/data.js'

// Building the menu structure

let menuHtmlDiv = document.getElementById('menu') 

function getMenuHtml(menu) {

    let menuHtml = ''

    for(let entry of menu) {

        let ingredientsList = ''

        let ingredientsArray = entry.ingredients

        for (let i=0; i<ingredientsArray.length; i++) {
            if (i === ingredientsArray.length-1) {
                ingredientsList += `${ingredientsArray[i]}` 
            } else {
                ingredientsList += `${ingredientsArray[i]}, ` 
            }
        }

        menuHtml += `
        <div class="menu-entry-container">
            <div class="menu-entry">
                <div class="menu-entry-info">
                    <p class="menu-entry-emoji">${entry.emoji}</p>
                    <div class="menu-entry-text">
                        <h2>${entry.name}</h2>
                        <p class="menu-ingredients-text">${ingredientsList}</p>
                        <h3>$${entry.price}</h3>
                    </div>
                </div>
                <div id="${entry.name}" class="menu-entry-button">+</div> 
            </div>
        </div>
        `
    }

    menuHtmlDiv.innerHTML = menuHtml

}

getMenuHtml(menuArray)

// Adding menu items to the cart array

let cartArray = []

let buttonsArray = document.querySelectorAll('.menu-entry-button')

console.log(buttonsArray)

buttonsArray.forEach(function(button) {
    button.addEventListener('click', function(){

        console.log(this.id)
        
        for (let item of menuArray) {
            if (item.name === this.id) {
                cartArray.push(item)
                // console.log(item)
            }
        }

        cartDisplayCheck()
        populateCartDiv(cartArray)
        console.log(cartArray)
    })
})

// Displaying menu on page

let cartHtmlDiv = document.querySelector('.cart')

function cartDisplayCheck() {

    if (cartArray.length === 0) {
        cartHtmlDiv.classList.add("hidden")
        console.log("empty cart")
    } else {
        cartHtmlDiv.classList.remove("hidden")
        console.log('wow')
    }
}

cartDisplayCheck()

let cartContents = document.getElementById('cart-contents')

function populateCartDiv(cartArray) {
    
    let cartHtml = ''

    for (let item of cartArray) {
        cartHtml += `
        <div class="cart-entry">
            <div class="cart-item-section">
                <div class="cart-item-food">${item.name}<span class="cart-remove-link">remove</span></div>
            </div>
            <div class="cart-item-pricing">$${item.price}</div>
        </div>
        `
    }

    cartContents.innerHTML = cartHtml

}

let completeOrderButton = document.querySelector('.cart-complete-button')

completeOrderButton.addEventListener('click', {
    // console.log('completing order')
})

