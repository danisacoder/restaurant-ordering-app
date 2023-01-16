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
                console.log(item)
            }
        }

        cartDisplayCheck()
        populateCartDiv(cartArray)
        console.log(cartArray)
        totalTally(cartArray)
        console.log(removeButtonsArray)

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
        establishRemoveButtons(removeButtonsArray)
    }
}

cartDisplayCheck()

// Rendering cart I think

let cartContents = document.getElementById('cart-contents')

function populateCartDiv(arr) {
    
    let cartHtml = ''


    for (let item of arr) {

        // Checking for multiples and rendering them differently

        const itemCounter = (arr, item) => {
            let counter = 0
            arr.forEach(x => {
                if (x === item) counter++
            })
            return counter
        }

        let count = itemCounter(arr, item)

        let myNodeListArray = Array.from(document.querySelectorAll(`#${item.name}`))

        console.log(myNodeListArray)

        // && myNodeList.includes(`${item.name}`



        let itemUpdateHtml = ''

        // if (count > 1) {

            // let itemUpdateDiv = document.getElementById(`#${item.id}`)

            // console.log(itemUpdateDiv)

            // itemUpdateHtml += `
            //         <div class="cart-item-section">
            //             <div class="cart-item-food" id="${item.id}">${item.name} x${count}<span class="cart-remove-link">remove</span></div>
            //         </div>
            //         <div class="cart-item-pricing">$${item.price * count}</div>
            // `

            // itemUpdateDiv.innerHTML = itemUpdateHtml

        // } else {

            cartHtml += `
            <div class="cart-entry">
                <div class="cart-item-section">
                    <div class="cart-item-food" class="${item.name}" id="${item.id}">${item.name}<span class="cart-remove-link">remove</span></div>
                </div>
                <div class="cart-item-pricing">$${item.price}</div>
            </div>
            `

        // }

    // console.log(`${}`)

    }

    cartContents.innerHTML = cartHtml

}


// Tally up the total at the bottom of the cart

let totalHtml = document.querySelector('.total')

function totalTally(array) {
    
    let total = 0
    
    for(let item of array) {
    
        total += item.price
    
    }

    totalHtml.innerHTML = `<div class="total">$${total}</div>`

} 

let removeButtonsArray = document.querySelectorAll('.cart-remove-link')

function establishRemoveButtons(array) {
    console.log(array)
}

// Complete order button functionality 

let completeOrderButton = document.querySelector('.cart-complete-button')
let payModal = document.querySelector('.payment-modal')
let completedOrderMessageDiv = document.querySelector('.completed-order-message')

completeOrderButton.addEventListener('click', function(){
    payModal.style.display = 'flex'
})

// Pay modal functionality

let payButtonElement = document.getElementById('card-submit')
let cardNameElement = document.getElementById('card-name')



payButtonElement.addEventListener('click', function() {
    let userName = cardNameElement.value 
    let displayName = ''

    // console.log(userName.split(' '))

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

