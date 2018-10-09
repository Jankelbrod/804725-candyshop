'use strict';

(function () {

  var orderField = document.querySelector('#order');
  // Доставка
  var deliver = orderField.querySelector('.deliver');
  var deliverStore = deliver.querySelector('.deliver__store');
  var deliverCourier = deliver.querySelector('.deliver__courier');
  var deliverFloor = deliver.querySelector('#deliver__floor');

  // Оплата
  var payment = orderField.querySelector('.payment');
  var paymentCash = payment.querySelector('.payment__cash-wrap');
  var paymentCard = payment.querySelector('.payment__card-wrap');
  var cardNumber = payment.querySelector('#payment__card-number');
  var cardCvc = payment.querySelector('#payment__card-cvc');
  var cardholder = payment.querySelector('#payment__cardholder');
  var cardDate = payment.querySelector('#payment__card-date');
  var cardStatus = payment.querySelector('.payment__card-status');
  // var paymentError = payment.querySelector('.payment__error-message');
  var error = document.querySelector('.modal--error');
  var success = document.querySelector('.modal--success');

  var form = document.querySelector('.buy__submit-btn');

  // Переключение способа доставки
  var toggleDelivery = function (evt) {
    if (evt.target.id === 'deliver__courier') {
      deliverCourier.classList.remove('visually-hidden');
      deliverStore.classList.add('visually-hidden');
      window.util.disableField(deliverCourier, false);
    } else if (evt.target.id === 'deliver__store') {
      deliverStore.classList.remove('visually-hidden');
      deliverCourier.classList.add('visually-hidden');
      window.util.disableField(deliverCourier, true);
    }
  };
  // Переключение способа оплаты
  var togglePayment = function (evt) {
    if (evt.target.id === 'payment__cash') {
      paymentCash.classList.remove('visually-hidden');
      paymentCard.classList.add('visually-hidden');
      window.util.disableField(paymentCard, true);
    } else if (evt.target.id === 'payment__card') {
      paymentCard.classList.remove('visually-hidden');
      paymentCash.classList.add('visually-hidden');
      window.util.disableField(paymentCard, false);
    }
  };

    // Изменение карты при выборе станции метро
  var choseMapImg = function (evt) {
    var storeMapImage = deliver.querySelector('.deliver__store-map-img');
    if (evt.target.name === 'store') {
      storeMapImage.src = 'img/map/' + evt.target.value + '.jpg';
    }
  };

  // Получаем значение инпута
  var getValue = function (input) {
    var inputValue = input.value;
    return inputValue;
  };

  // Валидация номера карты
  var checkCardValidity = function (input) {
    var inputValue = getValue(input);
    var arr = [];
    inputValue = inputValue.split('');
    for (var i = 0; i < inputValue.length; i++) {
      if (i % 2 === 0) {
        var m = parseInt(inputValue[i], 10) * 2;
        if (m > 9) {
          arr.push(m - 9);
        } else {
          arr.push(m);
        }
      } else {
        var n = parseInt(inputValue[i], 10);
        arr.push(n);
      }
    }
    var sum = arr.reduce(function (a, b) {
      return a + b;
    });
    return Boolean(!(sum % 10));
  };

  // Проверка статусы карты
  var checkCardStatus = function () {
    var number = cardNumber.checkValidity();
    var cvc = cardCvc.checkValidity();
    var name = cardholder.checkValidity();
    var date = cardDate.checkValidity();
    if (number && cvc && name && date) {
      cardStatus.textContent = 'Одобрен';
    } else {
      cardStatus.textContent = 'Не определен';
    }
  };
  // Проверка введенного номера карты
  cardNumber.addEventListener('blur', function () {
    if (checkCardValidity(cardNumber) === false) {
      cardNumber.setCustomValidity('Введен неверный номер');
    } else {
      cardNumber.setCustomValidity('');
    }
    checkCardStatus();
  });

  // Проверка CVC
  cardCvc.addEventListener('blur', function () {
    if (isNaN(getValue(cardCvc))) {
      cardCvc.setCustomValidity('Поле должно содержать только числа');
    } else if (getValue(cardCvc) < 100) {
      cardCvc.setCustomValidity('Диапазон значений должен быть от 100 до 999');
    } else {
      cardCvc.setCustomValidity('');
    }
    checkCardStatus();
  });

  // Проверка введенного этажа
  deliverFloor.addEventListener('blur', function () {
    if (isNaN(getValue(deliverFloor))) {
      deliverFloor.setCustomValidity('Поле должно содержать только числа');
    } else {
      deliverFloor.setCustomValidity('');
    }
  });
  cardholder.addEventListener('blur', function () {
    checkCardStatus();
  });
  cardDate.addEventListener('blur', function () {
    checkCardStatus();
  });

  deliverStore.addEventListener('click', choseMapImg);
  // Переключение способов доставки и оплаты по клику
  deliver.addEventListener('click', toggleDelivery);
  payment.addEventListener('click', togglePayment);


  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.save(new FormData(form), function () {
      refreshFields();
      success.classList.remove('modal--hidden');
      error.classList.add('modal--hidden');
    }, function () {
      success.classList.add('modal--hidden');
      error.classList.remove('modal--hidden');
    });
  });

  var refreshFields = function () {
      var input = orderField.querySelectorAll('input');
      for (var i = 0; i < input.legth; i++) {
        input[i].value = '';
      }
      deliverCourier.querySelector('.deliver__textarea').value = '';
    };

  window.order = {
    field: orderField,
    courier: deliverCourier,
    form: form
  };
})();
