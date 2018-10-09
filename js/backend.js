'use strict';

(function () {

  var URL_SAVE = 'https://js.dump.academy/candyshop';

  var getStatus = function (xhr, load, error) {
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        load(xhr.response);
      } else {
        error('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      error('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      error('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
  };

  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    getStatus(xhr, onLoad, onError);
    xhr.timeout = 10000;
    xhr.open('GET', window.url);
    xhr.send();
  };

  window.save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    getStatus(xhr, onLoad, onError);
    xhr.timeout = 10000;
    xhr.open('POST', URL_SAVE);
    xhr.send(data);
  };

  window.url = 'https://js.dump.academy/candyshop/data';
})();
