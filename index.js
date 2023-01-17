import { menuArray } from '/data.js'

// Building the menu structure

let menuHtmlDiv = document.getElementById('menu') 

function getMenuHtml(menu) {

    let menuHtml = ''

    for(let entry of menu) {

        // generating the ingredient list for each menu item

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

buttonsArray.forEach(function(button) {
    
    button.addEventListener('click', function(){

        console.log(this.id)
        
        for (let item of menuArray) {
            if (item.name === this.id) {
                cartArray.push(item)
                console.log(item)
            }
        }

        cartDisplayCheck()
        populateCartDiv(cartArray)
        console.log(cartArray)
        totalTally(cartArray)

    })
})

// Displaying menu on page

let cartHtmlDiv = document.querySelector('.cart')

function cartDisplayCheck() {

    if (cartArray.length === 0) {
        cartHtmlDiv.style.display = 'none'
        console.log("empty cart")
    } else {
        cartHtmlDiv.style.display = 'flex'
    }
}

cartDisplayCheck()

// Rendering cart contents on page from cart array

let cartContents = document.getElementById('cart-contents')

function populateCartDiv(arr) {
    
    let cartHtml = ''

    for (let item of arr) {

        cartHtml += `
        <div class="cart-entry">
            <div class="cart-item-section">
                <div class="cart-item-food" class="${item.name}" id="${item.id}">${item.name}<span class="cart-remove-button">remove</span></div>
            </div>
            <div class="cart-item-pricing">$${item.price}</div>
        </div>
        `

    }

    cartContents.innerHTML = cartHtml
    createRemoveButtons()

}

// Tally up and populate the total at the bottom of the cart

let totalHtml = document.querySelector('.total')

function totalTally(array) {
    
    let total = 0
    
    for(let item of array) {
    
        total += item.price
    
    }

    totalHtml.innerHTML = `<div class="total">$${total}</div>`

} 

// Add remove button functionality

function createRemoveButtons() {

    let removeButtonsArray = document.querySelectorAll('.cart-remove-button')

    removeButtonsArray.forEach(buttonTime)

    function buttonTime(button) {
        button.addEventListener('click', function(){
            console.log(this)
        })
    }

}

// Complete order button functionality 

let completeOrderButton = document.querySelector('.cart-complete-button')
let completedOrderMessageDiv = document.querySelector('.completed-order-message')

completeOrderButton.addEventListener('click', function(){
    payModal.style.display = 'flex'
})

// Pay modal functionality

let payModal = document.querySelector('.payment-modal')
let payButtonElement = document.getElementById('card-submit')
let cardNameElement = document.getElementById('card-name')

payButtonElement.addEventListener('click', function() {

    // Parse name string; if submitted name has a space, use the name before the space (so that it says your first name)

    let userName = cardNameElement.value 
    let displayName = ''
    let nameArray = userName.split(' ')

    if (nameArray.length > 1) {
        displayName = nameArray[0]
    } else {
        displayName = userName
    }

    payModal.style.display = 'none'
    cartHtmlDiv.style.display = 'none'

    cartHtmlDiv.innerHTML = ''

    completedOrderMessageDiv.style.display = 'inline'

    completedOrderMessageDiv.innerHTML = `
    Thanks, ${displayName}! Your order is on its way!
    `

})

