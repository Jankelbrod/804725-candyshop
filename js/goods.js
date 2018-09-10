'use strict';

var goods = [];
// Товары в корзине
var goodsInCard = [];
// Количество товаров
var GOODS_QUANTITY = 26;
// Количество товаров в корзине
var ORDERS_QUANTITY = 3;

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

// Находим шаблон catalog__card для товаров
var catalogCard = document.querySelector('#card')
.content
.querySelector('.catalog__card');

// Функция, генерирующая случайное число в определенном диапазоне
var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

// Функция, выбирающая случайный элемент из переданного в нее массива
var getRandomElement = function (arr) {
  var randomElement = arr[Math.floor(Math.random() * arr.length)];
  arr.splice(arr.indexOf(randomElement), 1);
  return randomElement;
};

// Функция, генерирующая случайный состав товара и преобразующая его в строку
var generateContent = function (arr) {
  var copy = arr.slice();
  copy.length = getRandomNumber(1, arr.length);
  return copy.join(', ');
};

// Функция, гененрирующая массив товаров
var generateGoods = function (quantity) {
  for (var i = 0; i < quantity; i++) {
    goods.push({
      name: getRandomElement(NAMES),
      picture: getRandomElement(PICTURES),
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
  return goods;
};

// Функция, отрисовывающая сгенерированные товары на странице
var renderGoods = function (good) {
  var goodElement = catalogCard.cloneNode(true);

  goodElement.querySelector('.card__title').textContent = good.name;
  goodElement.querySelector('.card__img').src = 'img/cards/' + good.picture + '.jpg';

  if (good.amount > 5) {
    goodElement.classList.add('card--in-stock');
  } else if (good.amount >= 1 || good.amount <= 5) {
    goodElement.classList.add('card--little');
  } else if (good.amount === 0) {
    goodElement.classList.add('card--soon');
  }

  var starsRating = goodElement.querySelector('.stars__rating');
  starsRating.classList.remove('stars__rating--five');
  if (good.rating.value === 1) {
    starsRating.classList.add('stars__rating--one');
  } else if (good.rating.value === 2) {
    starsRating.classList.add('stars__rating--two');
  } else if (good.rating.value === 3) {
    starsRating.classList.add('stars__rating--three');
  } else if (good.rating.value === 4) {
    starsRating.classList.add('stars__rating--four');
  } else if (good.rating.value === 5) {
    starsRating.classList.add('stars__rating--five');
  }

  goodElement.querySelector('.star__count').textContent = '(' + good.rating.number + ')';

  if (good.nutritionFacts.sugar === true) {
    goodElement.querySelector('.card__characteristic').textContent = 'Содержит сахар. ' + good.nutritionFacts.energy + ' ккал';
  } else {
    goodElement.querySelector('.card__characteristic').textContent = 'Без сахара. ' + good.nutritionFacts.energy + ' ккал';
  }

  goodElement.querySelector('.card__composition-list').textContent = good.nutritionFacts.contents;

  // Записываем цену товара в card__price
  var cardPrice = goodElement.querySelector('.card__price');
  cardPrice.textContent = good.price;

  // Создаем элемент span, в котором будет знак валюты
  var cardCurrency = document.createElement('span');
  cardCurrency.classList.add('card__currency');
  cardCurrency.textContent = '\u20BD';
  cardPrice.appendChild(cardCurrency);

  // Создаем элемент span, в котором будет вес товара
  var cardWeight = document.createElement('span');
  cardWeight.classList.add('card__weight');
  cardWeight.textContent = '/ ' + good.weight + ' Г';
  cardPrice.appendChild(cardWeight);

  return goodElement;
};

// Удаляем класс goods__cards--empty в блоке goods__cards
var goodsCards = document.querySelector('.goods__cards');
goodsCards.classList.remove('goods__cards--empty');

// Добавляем класс visually-hidden, чтобы скрыть блок goods__card-empty
var cardsEmpty = document.querySelector('.goods__card-empty');
cardsEmpty.classList.add('visually-hidden');

var fragment = document.createDocumentFragment();

// Создаем товары и добавляем их на страницу
var createGoods = function () {
  generateGoods(GOODS_QUANTITY);
  for (var i = 0; i < goods.length; i++) {
    fragment.appendChild(renderGoods(goods[i]));
  }
  catalogCards.appendChild(fragment);
};
createGoods();

// Герерируем случайные элементы для корзины из массива товаров
var generateOrders = function (quantity) {
  for (var i = 0; i < quantity; i++) {
    goodsInCard.push(goods[getRandomNumber(0, goods.length)]);
  }
  return goodsInCard;
};

// Создаем товары в корзине и добавляем их на страницу
var createOrders = function () {
  generateOrders(ORDERS_QUANTITY);
  for (var i = 0; i < goodsInCard.length; i++) {
    fragment.appendChild(renderGoods(goodsInCard[i]));
  }
  goodsCards.appendChild(fragment);
};
createOrders();