// ==UserScript==
// @name         LwSp to sidebar
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Scroll menu to navigate to specific letters
// @author       er+sky
// @match        https://tahvel.edu.ee/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Delay the execution to ensure all elements are loaded before processing
    setTimeout(() => {
		// Выбираем все элементы с классом schoolTileFooter
		const elements = document.querySelectorAll('.schoolTileFooter');
		const firstLetters = [];
        // '‏‏‎ ‎' emptycharacter.com
		const isNbsp = '‏';

		// Проходимся по каждому элементу
		elements.forEach(element => {
			// Находим элемент <span> внутри <figcaption>
			const spanElement = element.querySelector('figcaption > span');
			// Проверяем, существует ли элемент <span> и содержит ли текстовое содержимое
			if(spanElement && spanElement.textContent.trim().length > 0){
				// Получаем первую букву текстового содержимого
				const firstLetter = spanElement.textContent.trim().charAt(0).toUpperCase();
				// Добавляем первую букву в массив
				firstLetters.push(firstLetter);
				// Добавляем класс, соответствующий первой букве
				element.classList.add('firstLetterIs'+firstLetter);
			}
		});

        const spacedLetters = firstLetters.map((letter, index) => {
            if (index !== 0 && letter === firstLetters[index - 1]) {
                return isNbsp;
            }
            return letter;
        });

        const menuContainer = document.createElement('div');
        menuContainer.style.position = 'fixed';
        menuContainer.style.top = '50%';
        menuContainer.style.right = '10px';
        menuContainer.style.padding = '2px';
        menuContainer.style.textAlign = 'center';
        menuContainer.style.transform = 'translateY(-50%)';
        menuContainer.style.zIndex = 9999;

        spacedLetters.forEach(letter => {
            const menuItem = document.createElement('div');
            menuItem.textContent = letter;
            menuItem.style.cssText = 'cursor:pointer; padding:0 12px; margin-bottom:5px;';
            menuItem.style.backgroundColor = 'rgba(190, 190, 190, 0.6)';
            if(letter == isNbsp){
                menuItem.style.backgroundColor = 'rgba(255, 255, 255, 0)';
                menuItem.style.marginBottom = '0px';
                menuItem.style.height = '10px';
            }

            menuItem.addEventListener('click', () => {
                const targetElement = document.querySelector(`.firstLetterIs${letter}`);
                const parentElement = targetElement.parentElement.parentElement.parentElement;

                if (targetElement) {
                    // Прокрутка к элементу
                    targetElement.scrollIntoView({ behavior: "smooth", block: "center" });

                    setTimeout(() => {
                        parentElement.style.boxShadow = '0px 10px 20px 2px rgba(0, 0, 0, 0.25)'
                        setTimeout(() => {
                            parentElement.style.boxShadow = ''
                        }, 1000); // Через 1 секунду (1000 миллисекунд)
                    }, 200); // Через 1 секунду (1000 миллисекунд)

                }
            });
            menuContainer.appendChild(menuItem);
        });
        document.body.appendChild(menuContainer);




        const style = document.createElement('style');
        style.innerHTML = `
.fade-out {
    animation: fadeOut 1s ease;
}

`;
        document.head.appendChild(style);

    }, 400);
})()
