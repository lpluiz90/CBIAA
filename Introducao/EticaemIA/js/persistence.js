/* ====================================================================
   MÓDULO DE PERSISTÊNCIA CENTRALIZADA (LOCALSTORAGE SAFELY)
   Minicurso: Ética em Inteligência Artificial (EsCom EAD)
   ==================================================================== */

var EADPersistence = (function () {
  var STORAGE_PREFIX = 'ead_etica_ia_';

  function isAvailable() {
    try {
      var testKey = STORAGE_PREFIX + 'test';
      window.localStorage.setItem(testKey, '1');
      window.localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  function set(key, value) {
    if (!isAvailable()) return false;
    try {
      var json = JSON.stringify(value);
      window.localStorage.setItem(STORAGE_PREFIX + key, json);
      return true;
    } catch (e) {
      console.warn('Erro ao salvar no localStorage:', e);
      return false;
    }
  }

  function get(key, defaultValue) {
    if (!isAvailable()) return defaultValue;
    try {
      var item = window.localStorage.getItem(STORAGE_PREFIX + key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.warn('Erro ao ler do localStorage:', e);
      return defaultValue;
    }
  }

  function remove(key) {
    if (!isAvailable()) return false;
    try {
      window.localStorage.removeItem(STORAGE_PREFIX + key);
      return true;
    } catch (e) {
      return false;
    }
  }

  function clearCourseData() {
    if (!isAvailable()) return false;
    try {
      var keysToRemove = [];
      for (var i = 0; i < window.localStorage.length; i++) {
        var k = window.localStorage.key(i);
        if (k && k.indexOf(STORAGE_PREFIX) === 0) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach(function (k) {
        window.localStorage.removeItem(k);
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  return {
    set: set,
    get: get,
    remove: remove,
    clearCourseData: clearCourseData,
    isAvailable: isAvailable
  };
})();
