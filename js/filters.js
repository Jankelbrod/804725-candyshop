'use strict';

(function () {

  var catalogSideBar = document.querySelector('.catalog__sidebar');
  //var catalogFilter = catalogSideBar.querySelector('.catalog__filter');
  var emptyFilterTemplate = document.querySelector('#empty-filters');
  var filterInput = catalogSideBar.querySelectorAll('input');
  var filterSpan = catalogSideBar.querySelectorAll('.input-btn__item-count');

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
  /*
  var favorite = window.util.goods.filter(function (good) {
    return good.classList.contains('card__btn-favorite--selected');
  });
  */
  var inStock = window.util.goods.filter(function (good) {
    return good.amount > 0;
  });

  var resetFilter = function (evt) {
    if (evt.id === 'filter-availability' || evt.id === 'filter-favorite') {

    }
  }
  /*
  var chooseFilter = function (evt) {
    var target = evt.target;
    if (target.id === 'filter-icecream') {
      window.catalog.append(icecream);
    }
  };
  */
  catalogSideBar.addEventListener('click', chooseFilter);

  filterSpan[0].textContent = '(' + icecream.length + ')';
  filterSpan[1].textContent = '(' + soda.length + ')';
  filterSpan[2].textContent = '(' + gum.length + ')';
  filterSpan[3].textContent = '(' + marmalade.length + ')';
  filterSpan[4].textContent = '(' + marshmallows.length + ')';

  filterSpan[5].textContent = '(' + sugarFree.length + ')';
  filterSpan[6].textContent = '(' + vegetarian.length + ')';
  filterSpan[7].textContent = '(' + glutenFree.length + ')';

 // filterSpan[8].textContent = '(' + favorite.length + ')';
  filterSpan[9].textContent = '(' + inStock.length + ')';

})();
