/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть 
 resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен 
 быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {
	return new Promise(function (resolved) {
		setTimeout(function () {
			resolved();
		}, seconds*1000);
	})
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом 
 городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {
	return new Promise (function (resolve,rejecte) {
		let arr = [];
  		var xhr = new XMLHttpRequest();
		
		xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json', false);
		xhr.addEventListener('load', () => {
			var a = JSON.parse(xhr.responseText); 
				a.forEach((item, i, array) => {
		       	  arr.push(a[i].name);
		       	})
		  		arr.sort();
		  		a.forEach((item, i, array) => {
		       	  array[i].name = arr[i];
		       	});
		    resolve(a);
		});
		xhr.send();
	})
}

export {
    delayPromise,
    loadAndSortTowns
};
