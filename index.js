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
        cartArray.push(this.id)
        cartDisplayCheck()
        populateCart(cartArray)
    })
})

// Displaying menu on page

let cartHtmlDiv = document.getElementById('cart-container')

function cartDisplayCheck() {

    if (cartArray === []) {
        cartHtmlDiv.style.display = 'none'
    } else {
        cartHtmlDiv.style.display = 'inline'
    }

}

let cartContents = document.getElementById('cart-contents')

function populateCart(cartArray) {
    
    let cartHtml = ''

    for (let item of cartArray) {
        cartHtml += `<div>${item}</div>`
    }

    cartContents.innerHTML = cartHtml

}

