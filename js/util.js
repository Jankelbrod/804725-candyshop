'use strict';

(function () {

  window.util = {

    goods: [],
    goodsInCard: [],

    MAX_PRICE: 1500,
    MIN_PRICE: 100,

    // Отключаем/включаем поле оформления заказа
    disableField: function (element, isDisable) {
      var inputs = element.querySelectorAll('input');
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = isDisable;
      }
    },
    // Функция, генерирующая случайное число в определенном диапазоне
    getRandomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },
    // Функция, выбирающая случайный элемент из переданного в нее массива
    getRandomElement: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },

    getOriginalElement: function (elements, data) {
      var element = window.util.getRandomElement(data);
      while (elements.indexOf(element) !== -1) {
        element = window.util.getRandomElement(data);
      }
      elements.push(element);
      return element;
    }
  }
})();
