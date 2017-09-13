/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и 
 случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {
	var div = document.createElement('div')
    var randomPosL = Math.floor(Math.random()*101);
    var randomPosT = Math.floor(Math.random()*101);
    var randomBgcR = Math.floor(Math.random()*256);
    var randomBgcG = Math.floor(Math.random()*256);
    var randomBgcB = Math.floor(Math.random()*256);
    var randomW = Math.floor(Math.random()*101);
    var randomH = Math.floor(Math.random()*101);
	div.classList.add('draggable-div');
	div.setAttribute('style', "position: absolute; top:" + randomPosT + "%;left:" + randomPosL + "%;background-color: rgb(" + randomBgcR+ ","+ randomBgcG+ ","+ randomBgcB+ ");width:" + randomW + "%;height:" + randomH + "%;")

    return div
}

/**
 * Функция должна добавлять обработчики событий для 
 перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {
    let activeEl;
    let offsetY = 0;
    let offsetX = 0;

    function mousedown (e) {
        activeEl = e.target;
        offsetX = e.offsetX;
        offsetY = e.offsetY;
    }
    function mouseup (e) {
        activeEl = undefined;
    }
    target.addEventListener('mousedown', mousedown);
    target.addEventListener('mouseup', mouseup);
    document.addEventListener('mousemove',  e => {
        if(activeEl) {
            activeEl.style.top = e.clientY - offsetY + 'px' ;
            activeEl.style.left = e.clientX - offsetX + 'px' ;
        }
    });
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
