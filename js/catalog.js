'use strict';

(function () {
  // Использованные названия
  var usedNames = [];
  // Убираем класс catalog__cards--load у блока catalog__cards
  var catalogCards = document.querySelector('.catalog__cards');
  catalogCards.classList.remove('catalog__cards--load');
  // Добавляем класс visually-hidden, чтобы скрыть блок catalog__load
  var catalogLoad = document.querySelector('.catalog__load');
  catalogLoad.classList.add('visually-hidden');
  // Находим шаблон catalog__card для товаров
  var catalogCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.catalog__card');

  var error = document.querySelector('.modal--error');
  var success = document.querySelector('.modal--success');
  var modal = document.querySelectorAll('.modal__close');

  // Количество осташихся товаров
  var setAmountClass = function (amount, element) {
    element.classList.remove('card--in-stock');
    if (amount > 5) {
      element.classList.add('card--in-stock');
    } else if (amount >= 1) {
      element.classList.add('card--little');
    } else if (amount === 0) {
      element.classList.add('card--soon');
    }
  };
  // Оценка товара
  var setRatingClass = function (rating, element) {
    element.classList.remove('stars__rating--five');
    if (rating === 1) {
      element.classList.add('stars__rating--one');
    } else if (rating === 2) {
      element.classList.add('stars__rating--two');
    } else if (rating === 3) {
      element.classList.add('stars__rating--three');
    } else if (rating === 4) {
      element.classList.add('stars__rating--four');
    } else if (rating === 5) {
      element.classList.add('stars__rating--five');
    }
  };
  // Наличие/отсутствие сахара и кол-во ккал
  var setSugarInfo = function (nutritionFacts, element) {
    if (nutritionFacts.sugar) {
      element.querySelector('.card__characteristic').textContent = 'Содержит сахар. ' + nutritionFacts.energy + ' ккал';
    } else {
      element.querySelector('.card__characteristic').textContent = 'Без сахара. ' + nutritionFacts.energy + ' ккал';
    }
  };
  // Создаем элемент span, в котором будет знак валюты
  var appendCardCurrency = function (element) {
    var cardCurrency = document.createElement('span');
    cardCurrency.classList.add('card__currency');
    cardCurrency.textContent = '\u20BD';
    element.appendChild(cardCurrency);
  };
  // Создаем элемент span, в котором будет вес товара
  var appendCardWeight = function (weight, element) {
    var cardWeight = document.createElement('span');
    cardWeight.classList.add('card__weight');
    cardWeight.textContent = '/ ' + weight + ' Г';
    element.appendChild(cardWeight);
  };
  var getGoodElement = function (target) {
    while (target.tagName !== 'ARTICLE') {
      target = target.parentNode;
    }
    return target;
  };
  var getGoodIndex = function (target) {
    target = getGoodElement(target);
    var goodName = target.querySelector('.card__title').textContent;
    return usedNames.indexOf(goodName);
  };
  // Добавление/удаление из избранного
  var toggleFavoriteClass = function (element) {
    element.classList.toggle('card__btn-favorite--selected');
    element.blur();
  };
  // Функция, отрисовывающая сгенерированные товары на странице
  var renderGood = function (good) {
    var goodElement = catalogCardTemplate.cloneNode(true);
    var starsRating = goodElement.querySelector('.stars__rating');
    var cardPrice = goodElement.querySelector('.card__price');
    goodElement.querySelector('.card__title').textContent = good.name;
    goodElement.querySelector('.card__img').src = 'img/cards/' + good.picture;
    goodElement.querySelector('.star__count').textContent = '(' + good.rating.number + ')';
    goodElement.querySelector('.card__composition-list').textContent = good.nutritionFacts.contents;
    cardPrice.textContent = good.price;
    setAmountClass(good.amount, goodElement);
    setRatingClass(good.rating.value, starsRating);
    setSugarInfo(good.nutritionFacts, goodElement);
    appendCardCurrency(cardPrice);
    appendCardWeight(good.weight, cardPrice);
    window.basket.check();
    return goodElement;
  };
  var checkOnCatalogClick = function (evt) {
    evt.preventDefault();
    var target = evt.target;
    if (target.className === 'card__btn') {
      window.basket.addGood(getGoodIndex(target));
    }
    if (target.classList.contains('card__btn-favorite')) {
      toggleFavoriteClass(target);
    }
  };
  catalogCards.addEventListener('click', checkOnCatalogClick);
  // Создаем товары и добавляем их на страницу
  var appendOnCatalog = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(renderGood(data[i]));
    }
    catalogCards.appendChild(fragment);
  };
  var toggleModal = function (isSuccess) {
    if (isSuccess) {
      success.classList.remove('modal--hidden');
      error.classList.add('modal--hidden');
    } else if (isSuccess === false) {
      success.classList.add('modal--hidden');
      error.classList.remove('modal--hidden');
    }
  };
  var closeModal = function () {
    for (var i = 0; i < modal.length; i++) {
      modal[0].addEventListener('click', function () {
        error.classList.add('modal--hidden');
      });
      modal[1].addEventListener('click', function () {
        success.classList.add('modal--hidden');
      });
    }
  };
  var onSuccess = function (data) {
    window.util.goods = data;
    for (var i = 0; i < window.util.goods.length; i++) {
      usedNames.push(window.util.goods[i].name);
    }
    appendOnCatalog(window.util.goods);
    catalogLoad.classList.add('visually-hidden');
  };
  var onError = function (errorMassage) {
    toggleModal(false);
    catalogLoad.classList.remove('visually-hidden');
    document.querySelector('.modal__message').textContent = errorMassage;
    closeModal();
  };

  window.backend.load(onSuccess, onError);

  window.catalog = {
    toggleModal: toggleModal,
    closeModal: closeModal
  };

})();
