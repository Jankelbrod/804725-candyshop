'use strict';

var goods = [];
// Товары в корзине
var goodsInCard = [];
// Использованные названия
var usedNames = [];
// Использованные изображения
var usedPictures = [];
// Количество товаров
var GOODS_QUANTITY = 26;

// Количество 1 товара в корзине
// var goodsAmount = 1;
// Общее кол-во товаров в корзине
var totalAmount = 0;

// Количество оставшейся продукции
var MAX_AMOUNT = 20;
var MIN_AMOUNT = 0;

// Цена
var MAX_PRICE = 1500;
var MIN_PRICE = 100;

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

// Находим на странице блок корзины
var goodsCards = document.querySelector('.goods__cards');
var cardsEmpty = goodsCards.querySelector('.goods__card-empty');

// Кнопка добавления в избранное

// Кнопки ползунка
var rangeFilter = document.querySelector('.range__filter');
var rangeBtnRight = rangeFilter.querySelector('.range__btn--right');
var rangeBtnLeft = rangeFilter.querySelector('.range__btn--left');

// Диапазон цен
var rangePrices = document.querySelector('.range__prices');
var rangePriceMax = rangePrices.querySelector('.range__price--max');
var rangePriceMin = rangePrices.querySelector('.range__price--min');

// Находим на странице кнопки способа доставки
var deliver = document.querySelector('.deliver__toggle');
var deliverStore = document.querySelector('.deliver__store');
var deliverCourier = document.querySelector('.deliver__courier');

// Находим шаблон catalog__card для товаров
var catalogCardTemplate = document.querySelector('#card')
.content
.querySelector('.catalog__card');

// Находим шаблон goods_card для товаров в корзине
var goodsCardTemplate = document.querySelector('#card-order')
.content
.querySelector('.goods_card');

// Функция, генерирующая случайное число в определенном диапазоне
var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

// Функция, выбирающая случайный элемент из переданного в нее массива
var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Функция, генерирующая случайный состав товара и преобразующая его в строку
var generateContent = function (arr) {
  var copy = arr.slice();
  copy.length = getRandomNumber(1, arr.length);
  return copy.join(', ');
};

var getOriginalElement = function (elements, data) {
  var element = getRandomElement(data);
  while (elements.indexOf(element) !== -1) {
    element = getRandomElement(data);
  }
  elements.push(element);
  return element;
};

// Функция, гененрирующая массив товаров
var generateGoods = function (quantity) {
  for (var i = 0; i < quantity; i++) {
    goods.push({
      name: getOriginalElement(usedNames, NAMES),
      picture: getOriginalElement(usedPictures, PICTURES),
      amount: getRandomNumber(MIN_AMOUNT, MAX_AMOUNT),
      price: getRandomNumber(MIN_PRICE, MAX_PRICE),
      weight: getRandomNumber(MIN_WEIGHT, MAX_WEIGHT),
      rating: {
        value: getRandomNumber(MIN_VALUE, MAX_VALUE),
        number: getRandomNumber(MIN_NUMBER, MAX_NUMBER)
      },
      nutritionFacts: {
        sugar: Boolean(Math.round(Math.random())),
        energy: getRandomNumber(MIN_ENERGY, MAX_ENERGY),
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

// Делаем блок корзины пустым
var clearCard = function () {
  goodsCards.classList.remove('goods__cards--empty');
  cardsEmpty.classList.add('visually-hidden');
};
var checkBasket = function () {
  if (totalAmount > 0) {
    document.querySelector('.main-header__basket').textContent = 'Количество товаров в корзине: ' + totalAmount;
    clearCard();
  } else {
    goodsCards.classList.add('goods__cards--empty');
    cardsEmpty.classList.remove('visually-hidden');
    document.querySelector('.main-header__basket').textContent = 'В корзине ничего нет';
  }
};

var changeGoodAmount = function (good, amount, element) {
  totalAmount = totalAmount + amount;
  good.amount = good.amount + amount;

  var selector = 'input[name="' + good.picture + '"]';
  element.querySelector(selector).value = good.amount;

  if (good.amount === 0) {
    goodsCards.removeChild(element);
  }

  checkBasket();
};

var deleteGoodFromBasket = function (evt) {
  evt.preventDefault();
  var target = evt.target;
  while (target.tagName !== 'ARTICLE') {
    target = target.parentNode;
  }
  totalAmount = totalAmount - target.querySelector('.card-order__count').value;
  goodsCards.removeChild(target);
  checkBasket();
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

var toggleFavoriteClass = function (element) {
  element.classList.toggle('card__btn-favorite--selected');
  element.blur();
};

var toggleDelivery = function (evt) {
  if (evt.target.id === 'deliver__courier') {
    deliverCourier.classList.remove('visually-hidden');
    deliverStore.classList.add('visually-hidden');
  } else if (evt.target.id === 'deliver__store') {
    deliverStore.classList.remove('visually-hidden');
    deliverCourier.classList.add('visually-hidden');
  }
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

  return goodElement;
};

// Заполнение блока информацией о товарах в корзине
var renderOrder = function (order) {
  var chosenGoods = goodsCardTemplate.cloneNode(true);
  var btnIncrease = chosenGoods.querySelector('.card-order__btn--increase');
  var btnDecrease = chosenGoods.querySelector('.card-order__btn--decrease');
  var cardOrderClose = chosenGoods.querySelector('.card-order__close');

  chosenGoods.querySelector('input').name = order.picture;
  chosenGoods.querySelector('input').value = order.amount;
  chosenGoods.querySelector('input').id = 'card-order__' + order.name;
  chosenGoods.querySelector('.card-order__title').textContent = order.name;
  chosenGoods.querySelector('.card-order__img').src = 'img/cards/' + order.picture + '.jpg';
  chosenGoods.querySelector('.card-order__img').alt = order.name;
  chosenGoods.querySelector('.card-order__price').textContent = order.price + ' \u20BD';

  btnIncrease.addEventListener('click', function () {
    changeGoodAmount(order, 1, chosenGoods);
  });
  btnDecrease.addEventListener('click', function () {
    changeGoodAmount(order, -1, chosenGoods);
  });
  cardOrderClose.addEventListener('click', deleteGoodFromBasket);

  return chosenGoods;
};

var addGoodInBasket = function (index) {
  var goodInBasket = {
    name: goods[index].name,
    picture: goods[index].picture,
    price: goods[index].price,
    amount: 1
  };
  var goodsElement = goodsCards.querySelectorAll('.goods_card');

  for (var i = 0; i < goodsElement.length; i++) {
  var name = goodsElement[i].querySelector('.card-order__title').textContent;
  if (goodInBasket.name === name) {
    changeGoodAmount(goodsInCard[i], 1, goodsElement[i]);
    return;
    }
  }
  totalAmount++;
  goodsInCard.push(goodInBasket);
  goodsCards.appendChild(renderOrder(goodInBasket));
  checkBasket();
};

var checkOnCatalogClick = function (evt) {
  evt.preventDefault();
  var target = evt.target;
  if (target.className === 'card__btn') {
    addGoodInBasket(getGoodIndex(target));
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
  for (var i = 0; i < goods.length; i++) {
    fragment.appendChild(renderGood(goods[i]));
  }
  catalogCards.appendChild(fragment);
};
appendCatalogCards();

// Переключение способов доставки по клику
deliver.addEventListener('click', toggleDelivery);

rangeBtnRight.addEventListener('mouseup', function (upEvt) {
  upEvt.preventDefault();
  rangePriceMax.textContent = upEvt.clientX;
});

rangeBtnLeft.addEventListener('mouseup', function (upEvt) {
  upEvt.preventDefault();
  rangePriceMin.textContent = upEvt.clientX;
});
