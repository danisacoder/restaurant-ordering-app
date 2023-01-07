import { menuArray } from '/data.js'

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
            <div class="menu-entry-button">+</div> 
        </div>
        `
    }

    menuHtmlDiv.innerHTML = menuHtml

}

getMenuHtml(menuArray)