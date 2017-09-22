/**
 * ДЗ 6.2 - Создать страницу с текстовым полем для фильтрации городов
 *
 * Страница должна предварительно загрузить список городов из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * и отсортировать в алфавитном порядке.
 *
 * При вводе в текстовое поле, под ним должен появляться список тех городов,
 * в названии которых, хотя бы частично, есть введенное значение.
 * Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.
 *
 * Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 * После окончания загрузки городов, надпись исчезает и появляется текстовое поле.
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 *
 * *** Часть со звездочкой ***
 * Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 * то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 * При клике на кнопку, процесс загруки повторяется заново
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
 * Функция должна загружать список городов из https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * И возвращать Promise, которой должен разрешиться массивом загруженных городов
 *
 * @return {Promise<Array<{name: string}>>}
 */
function loadTowns() {
	return new Promise (function(resolve,reject) {
		let xhr = new XMLHttpRequest();

		xhr.open('GET' , 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json', true);
		xhr.addEventListener('load', () => {
			var answer = JSON.parse(xhr.response);

			answer.sort((a, b) => a.name.localeCompare(b.name));
                
			resolve(answer);
           

		});
		xhr.send();
	})
}

/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */
function isMatching(full, chunk) {
	return new RegExp(chunk,'i').test(full)
}

let loadingBlock = homeworkContainer.querySelector('#loading-block');
let filterBlock = homeworkContainer.querySelector('#filter-block');
let filterInput = homeworkContainer.querySelector('#filter-input');
let filterResult = homeworkContainer.querySelector('#filter-result');
let townsPromise;

// filterInput.addEventListener('keyup', function() {
	
// });


var getTowns = loadTowns().then(function(towns) {
    loadingBlock.innerText = '';
    townsPromise = towns;
}).catch(function() {
    var error = document.createElement('div');
    var repeat = document.createElement('button');
    error.textContent = 'Не удалось загрузить города';
    filterBlock.appendChild(error);
    repeat.textContent = 'Повторить';
    repeat.addEventListener('click', getTowns);
    filterBlock.appendChild(repeat);
});
var getTowns = function () {
    for (var i = 0; i < filterResult.childNodes.length; i++) {
        if ( filterResult.childNodes[i].tagName == 'P' ) {
            filterResult.removeChild(filterResult.childNodes[i]);
        }
    }
    let current = filterInput.value;
        if (!current) {
        	filterResult.innerHTML = '';
        } else {
        	for ( var i = 0; i < townsPromise.length; i++) {
                if (isMatching(townsPromise[i].name, current)) {
                    var currentElement = document.createElement('p');
                    currentElement.textContent = townsPromise[i].name;
                    filterResult.appendChild(currentElement);
                }
            }
        }
}

filterInput.addEventListener('keyup', getTowns);



export {
    loadTowns,
    isMatching
};
