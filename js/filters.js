'use strict';

(function () {


  // var emptyFilterTemplate = document.querySelector('#empty-filters');

  var catalogSideBar = document.querySelector('.catalog__sidebar');
  var filterSpan = catalogSideBar.querySelectorAll('.input-btn__item-count');
  /*
  // Fav & avail.
  var filterFavorite = catalogSideBar.querySelector('#filter-favorite');
  var filterАvailability = catalogSideBar.querySelector('#filter-availability');
  // Sort
  var filterCountPrice = document.querySelector('.range__price-count > .range__count');
  var filterPopular = document.querySelector('#filter-popular');
  var filterExpencive = document.querySelector('#filter-expensive');
  var filterCheep = document.querySelector('#filter-cheep');
  var filterRating = document.querySelector('#filter-rating');

  var showAll = document.querySelector('.catalog__submit');
  */
  var filterCount = function () {

    var icecream = window.util.goods.filter(function (good) {
      return good.kind === 'Мороженое';
    });
    var marshmallows = window.util.goods.filter(function (good) {
      return good.kind === 'Зефир';
    });
    var soda = window.util.goods.filter(function (good) {
      return good.kind === 'Газировка';
    });
    var gum = window.util.goods.filter(function (good) {
      return good.kind === 'Жевательная резинка';
    });
    var marmalade = window.util.goods.filter(function (good) {
      return good.kind === 'Мармелад';
    });
    // Nutrition facts
    var sugarFree = window.util.goods.filter(function (good) {
      return good.nutritionFacts.sugar === false;
    });
    var vegetarian = window.util.goods.filter(function (good) {
      return good.nutritionFacts.vegetarian === true;
    });
    var glutenFree = window.util.goods.filter(function (good) {
      return good.nutritionFacts.gluten === false;
    });

    var inStock = window.util.goods.filter(function (good) {
      return good.amount > 0;
    });
    filterSpan[0].textContent = '(' + icecream.length + ')';
    filterSpan[1].textContent = '(' + soda.length + ')';
    filterSpan[2].textContent = '(' + gum.length + ')';
    filterSpan[3].textContent = '(' + marmalade.length + ')';
    filterSpan[4].textContent = '(' + marshmallows.length + ')';

    filterSpan[5].textContent = '(' + sugarFree.length + ')';
    filterSpan[6].textContent = '(' + vegetarian.length + ')';
    filterSpan[7].textContent = '(' + glutenFree.length + ')';

    filterSpan[8].textContent = '(' + window.catalog.favorite.length + ')';
    filterSpan[9].textContent = '(' + inStock.length + ')';
  };

  var filterSort = {
    kinds: [],
    nutritionFacts: {},
    prices: [],
    sorts: ''
  };

  /*
  var deleteFilters = function () {
    filterSort.kinds = [];
    filterSort.nutritionFacts = {};
    filterSort.prices = [];
    filterSort.sort = '';
  };

  var resetCheckbox = function () {
    var inputCheckbox = document.querySelectorAll('.input-btn__input--checkbox');
    inputCheckbox.forEach(function (it) {
      it.checked = false;
    });
  };
  */
  window.filter = {
    count: filterCount,
    sort: filterSort
  };

})();
