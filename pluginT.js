// ==UserScript==
// @name         sidebar + darkmode
// @namespace    http://tampermonkey.net/
// @version      0.59
// @description  Scroll menu to navigate to specific letters
// @author       er+sky
// @match        https://tahvel.edu.ee/
// @grant        GM_addStyle
// ==/UserScript==


//---------▼▼Sky▼▼---------------------------------------------------------------------------

GM_addStyle ("span {color: red; font-size:smaller} .schoolList {background-color: black} md-grid-tile {background-color: black} #site-sidenav-scroll-wrapper {background-color: black}")
GM_addStyle ("#site-sidenav {background-color: black} parent-list-item {background-color: black} #main-wrapper {background-color: black}")
GM_addStyle ("#main-toolbar {background-color: black} site-sidenav-scroll-wrapper {background-color: black}")
GM_addStyle ("_md {background-color: black} md-content {background-color: black; home-page-container {border: solid green 5px}")

//---------▼▼erv▼▼---------------------------------------------------------------------------


(function() {
    'use strict';
    const SetStartTimer = 1000;		// Глобальная переменная Delay
    const isNbsp = '‏';				// '‏‏‎ ‎' emptycharacter.com

  // Delay the execution to ensure all elements are loaded before processing
  function runUserScript() {
    setTimeout(() => {
		// Выбираем все элементы с классом schoolTileFooter
		const elements = document.querySelectorAll('.schoolTileFooter');
		const firstLetters = [];


		elements.forEach(element => {										// Проходимся по каждому элементу
			const spanElement = element.querySelector('figcaption > span');	// Находим элемент <span> внутри <figcaption>
			if(spanElement && spanElement.textContent.trim().length > 0){	// Проверяем, существует ли элемент <span> и содержит ли текстовое содержимое
				const firstLetter = spanElement.textContent.trim().charAt(0).toUpperCase();// Получаем первую букву текстового содержимого
				firstLetters.push(firstLetter);								// Добавляем первую букву в массив
				element.classList.add('firstLetterIs'+firstLetter);			// Добавляем класс, соответствующий первой букве
			}
		});

        const spacedLetters = firstLetters.map((letter, index) => {
            if (index !== 0 && letter === firstLetters[index - 1]) {
                return isNbsp;
            }
            return letter;
        });

        const menuContainer = document.createElement('div');
        menuContainer.style.cssText = 'position:fixed; right:8px; height:85%; padding:2px; text-align:center; z-index:9999;';
//            menuContainer.style.background = '#22ff0033';
        menuContainer.id = 'menuContainer';

        spacedLetters.forEach(letter => {
            const menuItem = document.createElement('div');
            menuItem.textContent = letter;
            menuItem.style.cssText = 'cursor:pointer; padding:8px 17px; margin-bottom:1px; border-radius:10px; background-color:#BBB9; position: relative;';

            if(letter != isNbsp){ menuItem.classList.add('boxLetter'); }
            if(letter == isNbsp){
                menuItem.style.backgroundColor = '#fff0';
                menuItem.style.margin	= '0px';
                menuItem.style.padding	= '0px';
                menuItem.style.height	= '10px';
                menuItem.classList.add('spLtr');
            }

            menuItem.addEventListener('click', () => {
                const targetElement = document.querySelector(`.firstLetterIs${letter}`);
                const parentElement = targetElement.parentElement.parentElement.parentElement;

                if (targetElement) {		// Прокрутка к элементу
                    targetElement.scrollIntoView({ behavior: "smooth", block: "center" });

                    setTimeout(() => {
                        parentElement.style.boxShadow = '0px 10px 20px 2px rgba(0, 0, 0, 0.25)'
                        setTimeout(() => {
                            parentElement.style.boxShadow = ''
                        }, 1000);			// Через 1 секунду (1000 миллисекунд)
                    }, 200);
            }});
            menuContainer.appendChild(menuItem);
        });
        document.getElementById('content-and-sidenav-wrapper').appendChild(menuContainer);



    const style = document.createElement('style');
	style.innerHTML = `

.boxLetter::after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: -6px;
    width: 0;
    height: 0;
    border-top:    7px solid transparent;
    border-bottom: 7px solid transparent;
    border-left:   6px solid #bbb9;

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
        elements.forEach(element => {			// Установить высоту sp элементов в зав. от windowHeight
            element.style.height = i < 6 ? '0px' : (i-2) + 'px';
    });}}

    const menuSidebar = document.getElementById('menuContainer');
    if (menuSidebar) {
		if (window.innerWidth < 900) {			// Установить отступ menu в зав. от windowWidth
			menuSidebar.style.top = '64px';
		} else {
			menuSidebar.style.top = '96px';
	}}
    //else { console.log('Элемент с #menuContainer не найден.');    }
}

adjustHeight();			// Обработчик изменения размеров окна
window.addEventListener('resize', adjustHeight);







runUserScript();		// Запуск кода при загрузке страницы
setTimeout(() => {		// Устанавливаем задержку в миллисекундах из переменной SetStTimer и вызываем функцию adjustHeight() после этой задержки
    adjustHeight();
}, SetStartTimer+100);


window.addEventListener('popstate', function(event) {	// Обработчики событий для повторного запуска кода
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
