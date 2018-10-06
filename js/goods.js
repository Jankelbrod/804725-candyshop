'use strict';
(function () {
  // Использованные названия
  var usedNames = [];
  // Использованные изображения
  var usedPictures = [];
  // Количество товаров
  var GOODS_QUANTITY = 26;

  // Количество оставшейся продукции
  var MAX_AMOUNT = 20;
  var MIN_AMOUNT = 0;

  // Вес
  var MAX_WEIGHT = 300;
  var MIN_WEIGHT = 30;

  // Оценка
  var MAX_VALUE = 5;
  var MIN_VALUE = 1;

  // Количество оценок
  var MAX_NUMBER = 900;
  var MIN_NUMBER = 10;

  // Энергетическая ценность
  var MAX_ENERGY = 500;
  var MIN_ENERGY = 70;

  // Названия товаров
  var NAMES = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно',
    'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв',
    'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро',
    'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное',
    'Острый язычок'];

  // Названия изображений товаров
  var PICTURES = ['gum-cedar', 'gum-chile', 'gum-eggplant', 'gum-mustard', 'gum-portwine', 'gum-wasabi', 'ice-cucumber', 'ice-eggplant', 'ice-garlic',
    'ice-italian', 'ice-mushroom', 'ice-pig', 'marmalade-beer', 'marmalade-caviar', 'marmalade-corn', 'marmalade-new-year', 'marmalade-sour',
    'marshmallow-bacon', 'marshmallow-beer', 'marshmallow-shrimp', 'marshmallow-spicy', 'marshmallow-wine', 'soda-bacon', 'soda-celery', 'soda-cob',
    'soda-garlic', 'soda-peanut-grapes', 'soda-russian'];

  // Состав
  var CONTENTS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному',
    'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит',
    'карбамид', 'вилларибо', 'виллабаджо'];

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

  // Функция, генерирующая случайный состав товара и преобразующая его в строку
  var generateContent = function (arr) {
    var copy = arr.slice();
    copy.length = window.util.getRandomNumber(1, arr.length);
    return copy.join(', ');
  };

  // Функция, гененрирующая массив товаров
  var generateGoods = function (quantity) {
    for (var i = 0; i < quantity; i++) {
      window.util.goods.push({
        name: window.util.getOriginalElement(usedNames, NAMES),
        picture: window.util.getOriginalElement(usedPictures, PICTURES),
        amount: window.util.getRandomNumber(MIN_AMOUNT, MAX_AMOUNT),
        price: window.util.getRandomNumber(window.util.MIN_PRICE, window.util.MAX_PRICE),
        weight: window.util.getRandomNumber(MIN_WEIGHT, MAX_WEIGHT),
        rating: {
          value: window.util.getRandomNumber(MIN_VALUE, MAX_VALUE),
          number: window.util.getRandomNumber(MIN_NUMBER, MAX_NUMBER)
        },
        nutritionFacts: {
          sugar: Boolean(Math.round(Math.random())),
          energy: window.util.getRandomNumber(MIN_ENERGY, MAX_ENERGY),
          contents: generateContent(CONTENTS)
        }
      });
    }
  };
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
    goodElement.querySelector('.card__img').src = 'img/cards/' + good.picture + '.jpg';
    goodElement.querySelector('.star__count').textContent = '(' + good.rating.number + ')';
    goodElement.querySelector('.card__composition-list').textContent = good.nutritionFacts.contents;
    cardPrice.textContent = good.price;

    setAmountClass(good.amount, goodElement);
    setRatingClass(good.rating.value, starsRating);
    setSugarInfo(good.nutritionFacts, goodElement);

    appendCardCurrency(cardPrice);
    appendCardWeight(good.weight, cardPrice);
    window.basket.checkBasket();
    return goodElement;
  };

  var checkOnCatalogClick = function (evt) {
    evt.preventDefault();
    var target = evt.target;
    if (target.className === 'card__btn') {
      window.basket.addGoodInBasket(getGoodIndex(target));
    }
    if (target.classList.contains('card__btn-favorite')) {
      toggleFavoriteClass(target);
    }
  };

  catalogCards.addEventListener('click', checkOnCatalogClick);

  // Создаем товары и добавляем их на страницу
  var appendCatalogCards = function () {
    var fragment = document.createDocumentFragment();
    generateGoods(GOODS_QUANTITY);
    for (var i = 0; i < window.util.goods.length; i++) {
      fragment.appendChild(renderGood(window.util.goods[i]));
    }
    catalogCards.appendChild(fragment);
  };
  appendCatalogCards();
})();

/*
var getNewCoords = function (btn1, btn2, shiftX) {
  var newCoordsX = (btn1.offsetLeft - shiftX) / moveLimit * 100;
  if (newCoordsX < 0) {
    newCoordsX = 0;
  } else if (newCoordsX > (btn2.offsetLeft - shiftX) / moveLimit * 100) {
    newCoordsX = (btn2.offsetLeft - shiftX) / moveLimit * 100;
  }
  return Math.round(newCoordsX);
};
*/
