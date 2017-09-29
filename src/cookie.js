/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным 
 именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и 
 таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, 
 но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, 
 то добавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');

let tableArr = [];

// function createTable(e) {
// 	listTable.innerHTMl = '';
// 	console.log(e.value);
// 	for (let i = 0; i<tableArr.legth; i++) {
// 	  	let	currItem = tableArr[i];

// 	  	if ( currItem.nameValue.includes(e.value) || 
// 	  		currItem.valueValue.includes(e.value)) {

// 			createCookieAndTr(currItem.nameValue,currItem.valueValue);	  		
// 	  	}
// 	}
// }

filterNameInput.addEventListener('input', function (e) {
	listTable.innerHTML = '';

	console.log(listTable.innerHTMl);
	let filterVal = filterNameInput.value;
	for (let i = 0; i<tableArr.length; i++) {
	  	let	currItem = tableArr[i];

	  	console.log(currItem.nameValue);

	  	if ( currItem.nameValue.includes(filterVal) || 
	  		currItem.valueValue.includes(filterVal)) {

			createCookieAndTr(currItem.nameValue,currItem.valueValue);	  		
	  	}
	}
});


// create cookie and table row

function createCookieAndTr (nameVal,valVal) {

	document.cookie = `${nameVal}=${valVal};expires=100000`;

	let trNew = document.createElement('tr');
	listTable.appendChild(trNew);
	trNew.id = nameVal;

	let tdName = document.createElement('td');
	tdName.textContent =  nameVal;
	trNew.appendChild(tdName);

	let tdVal = document.createElement('td');
	tdVal.textContent =  valVal;
	trNew.appendChild(tdVal);

	let tdDelete = document.createElement('button');
	tdDelete.textContent = 'Удалить';
	trNew.appendChild(tdDelete);

	tdDelete.addEventListener('click', () => {
		document.cookie = `${nameVal}=${valVal};expires=0`;
		listTable.removeChild( document.querySelector( '#' + nameVal));
	});
}



//add cookie


function addCookie (e) {
	e.preventDefault();

	let nameVal = addNameInput.value;
	let valVal = addValueInput.value;
	
	createCookieAndTr (nameVal,valVal);

	tableArr.push({
		nameValue: nameVal,
		valValue: valVal
	});

}

addButton.addEventListener('click', addCookie);
