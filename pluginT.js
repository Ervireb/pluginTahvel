// ==UserScript==
// @name         L from S
// @namespace    http://tampermonkey.net/
// @version      0.25
// @description  Extract the first letters from <span> inside <figcaption> in schoolTileFooter and save them in an array
// @author       me
// @match        https://tahvel.edu.ee/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Delay the execution to ensure all elements are loaded before processing
    setTimeout(() => {
        // Select all elements with class schoolTileFooter
        const elements = document.querySelectorAll('.schoolTileFooter');
        const firstLetters = [];

        // Loop through each element
        elements.forEach(element => {
            // Find the <span> element inside <figcaption>
            const spanElement = element.querySelector('figcaption > span');
            // Check if <span> element exists and has text content
            if(spanElement && spanElement.textContent.trim().length > 0){
                // Get the first letter of the text content
                const firstLetter = spanElement.textContent.trim().charAt(0).toUpperCase();
                // Add the first letter to the array
                firstLetters.push(firstLetter);
            }
        });

        const spacedLetters = firstLetters.map((letter, index) => {
            if (index !== 0 && letter === firstLetters[index - 1]) {
                return ' ';
            }
            return letter;
        });

        console.log(spacedLetters);
        alert(spacedLetters);
    }, 400); // Adjust the delay time if needed
})();
