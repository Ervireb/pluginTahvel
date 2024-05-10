// ==UserScript==
// @name         L w cust Sp sidebar
// @namespace    http://tampermonkey.net/
// @version      0.52
// @description  Scroll menu to navigate to specific letters
// @author       er+sky
// @match        https://tahvel.edu.ee/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
  // Глобальная переменная Delay
    let SetStartTimer = 1000;
  // Delay the execution to ensure all elements are loaded before processing
  function runUserScript() {
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
//        menuContainer.style.position = 'fixed';
//        menuContainer.style.top = '54%';
//        menuContainer.style.right = '3px';
//        menuContainer.style.background = '#22ff0033';
//        menuContainer.style.height = '85%';
//        menuContainer.style.padding = '2px';
//        menuContainer.style.textAlign = 'center';
//        menuContainer.style.transform = 'translateY(-50%)';
        menuContainer.style.position = 'fixed';
        menuContainer.style.right = '3px';
        menuContainer.style.height = '85%';
        menuContainer.style.padding = '2px';
        menuContainer.style.textAlign = 'center';
//            menuContainer.style.background = '#22ff0033';
        menuContainer.id = 'menuContainer';
        menuContainer.style.zIndex = 9999;

        spacedLetters.forEach(letter => {
            const menuItem = document.createElement('div');
            menuItem.textContent = letter;
            menuItem.style.cssText = 'cursor:pointer; padding:8px 17px; margin-bottom:1px; border-radius: 10px 50px 50px 10px;';
            menuItem.style.backgroundColor = 'rgba(190, 190, 190, 0.6)';
            if(letter == isNbsp){
                menuItem.style.backgroundColor = 'rgba(255, 255, 255, 0)';
                menuItem.style.marginBottom = '0px';
                menuItem.style.padding = '0px';
                menuItem.style.height = '10px';
                menuItem.classList.add('spLtr');
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
        document.getElementById('content-and-sidenav-wrapper').appendChild(menuContainer);



	const style = document.createElement('style');
	style.innerHTML = `
.smth {
    colour: cyan;
}

`;
	document.head.appendChild(style);

	}, SetStartTimer);
  }





function adjustHeight() {
    const windowHeight = window.innerHeight;
    const elements = document.querySelectorAll('.spLtr');

    for (let i = 1; i <= 20; i++) {
      if (windowHeight >= i * 100) {
        elements.forEach(element => {
            // Установить высоту sp элементов в зав. от windowHeight
            element.style.height = i < 6 ? '0px' : (i-2) + 'px';
    });}}

    const menuSidebar = document.getElementById('menuContainer');
    if (menuSidebar) {
        if (window.innerWidth < 900) {
            // Установить отступ menu в зав. от windowWidth
            menuSidebar.style.top = '64px';
        } else {
            menuSidebar.style.top = '96px';
        }
    }
    //else { console.log('Элемент с #menuContainer не найден.');    }
}

adjustHeight();			// Обработчик изменения размеров окна
window.addEventListener('resize', adjustHeight);






// Запуск кода при загрузке страницы
runUserScript();
// Устанавливаем задержку в миллисекундах из переменной SetStTimer и вызываем функцию adjustHeight() после этой задержки
setTimeout(() => {
    adjustHeight();
}, SetStartTimer+100);

// Обработчики событий для повторного запуска кода
window.addEventListener('popstate', function(event) {
    if (document.getElementById('menuContainer')) {
        document.getElementById('menuContainer').remove();
    } else { runUserScript(); }
});

window.addEventListener('hashchange', function(event) {
    if (document.getElementById('menuContainer')) {
        document.getElementById('menuContainer').remove();
    } else { runUserScript(); }
});



})()
