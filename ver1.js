// ==UserScript==
// @name         Extract Text from <span>
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Extract text from <span> inside <figcaption> in schoolTileFooter and display in alert
// @author       Your name
// @match        https://tahvel.edu.ee/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Delay the execution to ensure all elements are loaded before processing
    setTimeout(() => {
        // Select all elements with class schoolTileFooter
        const elements = document.querySelectorAll('.schoolTileFooter');

        // Loop through each element
        elements.forEach(element => {
            // Find the <span> element inside <figcaption>
            const spanElement = element.querySelector('figcaption > span');

            // Check if <span> element exists
            if(spanElement){
                // Get the text content of the <span> element
                const textContent = spanElement.textContent.trim();

                alert(textContent);
            }
        });
    }, 400); // Adjust the delay time if needed
})();
