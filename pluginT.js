// ==UserScript==
// @name         Sidebar trying
// @namespace    http://tampermonkey.net/
// @version      0.31
// @description  Scroll menu to navigate to specific letters
// @author       me
// @match        https://tahvel.edu.ee/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(() => {
        const elements = document.querySelectorAll('.schoolTileFooter');
        const firstLetters = [];

        elements.forEach(element => {
            const spanElement = element.querySelector('figcaption > span');

            if(spanElement && spanElement.textContent.trim().length > 0){
                const firstLetter = spanElement.textContent.trim().charAt(0).toUpperCase();
                if(firstLetters.length === 0 || firstLetters[firstLetters.length - 1] !== firstLetter){
                    firstLetters.push(firstLetter);
                }
            }
        });

        const menuContainer = document.createElement('div');
        menuContainer.style.position = 'fixed';
        menuContainer.style.top = '50%';
        menuContainer.style.right = 0;
        menuContainer.style.transform = 'translateY(-50%)';
        menuContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        menuContainer.style.padding = '10px';
        menuContainer.style.zIndex = 9999;

        firstLetters.forEach(letter => {
            const menuItem = document.createElement('div');
            menuItem.style.cursor = 'pointer';
            menuItem.style.marginBottom = '5px';
            menuItem.textContent = letter;

            menuItem.addEventListener('click', () => {
                const targetElement = document.querySelector(`.firstLetterIs${letter}`);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
                }
            });

            menuContainer.appendChild(menuItem);
        });

        document.body.appendChild(menuContainer);
    }, 400);
})()
