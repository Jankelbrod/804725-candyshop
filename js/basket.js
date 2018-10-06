'use strict';

(function () {
  // Общее кол-во товаров в корзине
  var totalAmount = 0;
  // Находим шаблон goods_card для товаров в корзине
  var goodsCardTemplate = document.querySelector('#card-order')
  .content
  .querySelector('.goods_card');

  // Находим на странице блок корзины
  var goodsCards = document.querySelector('.goods__cards');
  var cardsEmpty = goodsCards.querySelector('.goods__card-empty');
  // Делаем блок корзины пустым
  var clearCard = function () {
    goodsCards.classList.remove('goods__cards--empty');
    cardsEmpty.classList.add('visually-hidden');
  };
  // Проверяем корзину на наличие товаров
  window.basket = {
    checkBasket: function () {
    if (totalAmount > 0) {
      document.querySelector('.main-header__basket').textContent = 'Количество товаров в корзине: ' + totalAmount;
      window.util.disableField(window.order.orderField, false);
      window.util.disableField(window.order.deliverCourier, true);
      clearCard();
    } else {
      goodsCards.classList.add('goods__cards--empty');
      cardsEmpty.classList.remove('visually-hidden');
      window.util.disableField(window.order.orderField, true);
      document.querySelector('.main-header__basket').textContent = 'В корзине ничего нет';
    }
    },
    addGoodInBasket: function (index) {
      var goodInBasket = {
        name: window.util.goods[index].name,
        picture: window.util.goods[index].picture,
        price: window.util.goods[index].price,
        amount: 1
      };
      var goodsElement = goodsCards.querySelectorAll('.goods_card');

      for (var i = 0; i < goodsElement.length; i++) {
        var name = goodsElement[i].querySelector('.card-order__title').textContent;
        if (goodInBasket.name === name) {
          changeGoodAmount(window.util.goodsInCard[i], 1, goodsElement[i]);
          return;
        }
      }
      totalAmount++;
      window.util.goodsInCard.push(goodInBasket);
      goodsCards.appendChild(renderOrder(goodInBasket));
      window.basket.checkBasket();
    }
};
  // Изменение количества товара в корзине
  var changeGoodAmount = function (good, amount, element) {
    totalAmount = totalAmount + amount;
    good.amount = good.amount + amount;

    var selector = 'input[name="' + good.picture + '"]';
    element.querySelector(selector).value = good.amount;

    if (good.amount === 0) {
      goodsCards.removeChild(element);
    }
    window.basket.checkBasket();
  };
  // Удаление товара из корзины
  var deleteGoodFromBasket = function (evt) {
    evt.preventDefault();
    var target = evt.target;
    while (target.tagName !== 'ARTICLE') {
      target = target.parentNode;
    }
    totalAmount = totalAmount - target.querySelector('.card-order__count').value;
    goodsCards.removeChild(target);
    window.basket.checkBasket();
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
})();
