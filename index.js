import { menuArray } from '/data.js'

let menuHtmlDiv = document.getElementById('menu') 

function getMenuHtml(menu) {

    let menuHtml = ''

    for(let entry of menu) {
        console.log(entry)
        menuHtml += `
        <div class="menu-entry">
            <div class="menu-entry-info">
                <p class="menu-entry-emoji">${entry.emoji}</p>
                <div class="menu-entry-text">
                    <h2>${entry.name}</h2>
                    <p>Ingredients placeholder</p>
                    <p>$${entry.price}</p>
                </div>
            </div>
            <div class="menu-entry-button"></div> 
        </div>
        `
    }

    menuHtmlDiv.innerHTML = menuHtml

}

getMenuHtml(menuArray)