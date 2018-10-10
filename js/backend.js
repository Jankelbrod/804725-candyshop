'use strict';

(function () {

  var URL_GET = 'https://js.dump.academy/candyshop/data';
  var URL_POST = 'https://js.dump.academy/candyshop';
  var SUCCESS_CODE = 200;
  var TIMEOUT = 10000;

  var createRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;
    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = createRequest(onLoad, onError);
    xhr.open('GET', URL_GET);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    var xhr = createRequest(onLoad, onError);
    xhr.open('POST', URL_POST);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
