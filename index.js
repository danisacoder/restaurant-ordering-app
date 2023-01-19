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

// Adding menu items to the cart array and displaying the cart in the DOM

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

        renderCart()

    })
})

// Displaying cart in the DOM when it contains items, removing it from DOM when it is empty

let cartHtmlDiv = document.querySelector('.cart')

function cartDisplayCheck() {

    if (cartArray.length === 0) {
        cartHtmlDiv.style.display = 'none'
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

    let buttons = document.querySelectorAll('.cart-remove-button')

    buttons.forEach(buttonFun)

    function buttonFun(button, index) {

        button.addEventListener('click', function(){

            cartArray.splice(index, 1)
            renderCart()

        })
    }



    // let removeButtonsArray = document.querySelectorAll('.cart-remove-button')

    // removeButtonsArray.forEach(buttonTime)

    // function buttonTime(button) {
    //     button.addEventListener('click', function(){
    //         // let clickedId = parseInt(this.parentNode.id)
    //         // console.log(this.parentNode)
        

            
    //     })
    // }

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

payButtonElement.addEventListener('click', function(event) {

    event.preventDefault()

    // Parse name string; if submitted name has a space, use the name before the space (so that it says your first name)

    let userName = cardNameElement.value 
    let displayName = ''
    let nameArray = userName.split(' ')

    if (nameArray.length > 1) {
        displayName = nameArray[0]
    } else {
        displayName = userName
    }

    // Hide and clear the cart and pay modal

    payModal.style.display = 'none'
    cartHtmlDiv.style.display = 'none'

    cartHtmlDiv.innerHTML = ''

    // show completed order message

    completedOrderMessageDiv.style.display = 'inline'

    completedOrderMessageDiv.innerHTML = `
    Thanks, ${displayName}! Your order is on its way!
    `

    // Clear the page upon click 

    // setTimeout(function() {
    //     document.addEventListener('click', function() {
    //     window.location.reload()
    //     })
    // }, 10000)

})

function renderCart() {
        cartDisplayCheck()
        populateCartDiv(cartArray)
        // console.log(cartArray)
        totalTally(cartArray)
}