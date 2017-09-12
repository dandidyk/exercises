/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
	for (let i = 0; i<array.length; i++) {
		fn(array[i],i,array);
	}
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */

function map(array, fn) {
	let ar = [];
	for (let i = 0; i<array.length; i++) {
		ar[i] = fn( array[i] , i , array);
	}

	return ar
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
		var res = 0;
    let index;
    if(initial == undefined) {
        res = array[0];
        index = 1;
    } else {
      res = initial;
      index = 0;
    }

	for (let i = index; i<array.length; i++) {
		res = fn(res,array[i],i,array);
	}

	return res
}


/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
	delete obj[prop]
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство 
 в указанном объекте
 */
// function hasProperty(obj, prop) {
// 	if ( obj.hasOwnProperty(prop)) {
// 		return true
// 	} else {
// 		return false
// 	}
// }

function hasProperty(obj, prop) {
	return obj.hasOwnProperty(prop)
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта
  и вернуть их в виде массива
 */
function getEnumProps(obj) {
	return Object.keys(obj)
}


// 	return arr
// }

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, 
 преобразовать их имена в верхний регистра и 
 вернуть в виде массива
 */
function upperProps(obj) {
	var keys = Object.keys(obj);
  	keys.forEach(function (i,ind) {
    	keys[ind] = i.toUpperCase();
    })
  	return keys 
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from = 0, to) {
    let arr = [];


    if(to == undefined) {
      to = array.length;
    }
    if(to> array.length) {
      to = array.length }
    if(to< 0) {
      to = array.length + to;
    }
    
    if(from < 0) {
      from = array.length + from
    }

    if (from < 0) {
      from = 0;
    }
    for(let i = from; i<to; i++) {
       arr.push(array[i])
    }
  return arr
}



/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и 
 возводить это значение в квадрат
 */
function createProxy(obj) {
  var handler = {
    set: function (ob, prop, value) {
      return ob[prop] =  value*value
    }
  }

  obj = new Proxy (obj, handler);

  return obj
}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};
