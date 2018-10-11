'use strict';

(function () {

  var MAX_PRICE = 1500;
  var MIN_PRICE = 100;

  // Кнопки ползунка
  var rangeFilter = document.querySelector('.range__filter');
  var rangeFillLine = rangeFilter.querySelector('.range__fill-line');
  var rangeBtnRight = rangeFilter.querySelector('.range__btn--right');
  var rangeBtnLeft = rangeFilter.querySelector('.range__btn--left');

  var rangePrices = document.querySelector('.range__prices');
  var rangePriceMin = rangePrices.querySelector('.range__price--min');
  var rangePriceMax = rangePrices.querySelector('.range__price--max');

  var getPriceValue = function (coordX) {
    return Math.floor(coordX * (MAX_PRICE - MIN_PRICE) / rangeFilter.offsetWidth) + MIN_PRICE;
  };

  var getNewCoordX = function (btn, coordX) {
    if (btn === rangeBtnLeft) {
      if (coordX < 0) {
        coordX = 0;
      }
      if (coordX > rangeBtnRight.offsetLeft) {
        coordX = rangeBtnRight.offsetLeft;
      }
    }
    if (btn === rangeBtnRight) {
      if (coordX > rangeFilter.offsetWidth) {
        coordX = rangeFilter.offsetWidth;
      }
      if (coordX < rangeBtnLeft.offsetLeft + rangeBtnLeft.offsetWidth) {
        coordX = rangeBtnLeft.offsetLeft + rangeBtnLeft.offsetWidth;
      }
    }
    return coordX;
  };

  var onPinMouseDown = function (evtDown) {
    evtDown.preventDefault();

    var startCoordX = evtDown.clientX;
    var maxCoordX = rangeFilter.offsetWidth;

    var onMouseMove = function (evtMove) {
      evtMove.preventDefault();

      var shiftX = startCoordX - evtMove.clientX;
      var newCoordX = startCoordX - rangeFilter.offsetLeft - shiftX;

      if (evtDown.target === rangeBtnLeft) {
        newCoordX = getNewCoordX(rangeBtnLeft, newCoordX);
        evtDown.target.style.left = newCoordX - rangeBtnRight.offsetWidth + 'px';
        rangeFillLine.style.left = newCoordX + 'px';
        rangePriceMin.textContent = getPriceValue(newCoordX);
      }

      if (evtDown.target === rangeBtnRight) {
        newCoordX = getNewCoordX(rangeBtnRight, newCoordX);
        evtDown.target.style.right = maxCoordX - newCoordX - rangeBtnLeft.offsetWidth + 'px';
        rangeFillLine.style.right = maxCoordX - newCoordX + 'px';
        rangePriceMax.textContent = getPriceValue(newCoordX);
      }
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  rangePriceMin.textContent = getPriceValue(rangeBtnLeft.offsetLeft);
  rangePriceMax.textContent = getPriceValue(rangeBtnRight.offsetLeft);

  rangeBtnLeft.addEventListener('mousedown', onPinMouseDown);
  rangeBtnRight.addEventListener('mousedown', onPinMouseDown);
})();
