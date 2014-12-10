var storageFactory = angular.module('jobquiq.storageFactory',[]);


  //  This is an Angular Service interface I wrote for localStorage obj. 
  //  localStorage is reportedly limited to 5MB right now. Plenty for 
  //  local app data, but the downside is having to replicate/reflect
  //  data locally and on a remote back end. Use wisely.

storageFactory.factory('LocalStorage', function( $window)  {
 return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
});

