var storageFactory = angular.module('jobquiq.storageFactory',[]);

storageFactory.factory('LocalStorage',function() {

  //  This is an Angular Service interface I wrote for localStorage obj. 
  //  localStorage is reportedly limited to 5MB right now. Plenty for 
  //  local app data, but the downside is having to replicate/reflect
  //  data locally and on a remote back end. Use wisely.

  var localStorageService = {};

  var localStorage = window.localStorage;

  function isString(value){
    if(typeof value === 'string'){
      return true;
    }else{ return false;}
  }
  function isObject(value){
    if(typeof value === 'object'){
      return true;
    }else{ return false;}
  }
  function isBool(value){
    if(typeof value === 'boolean'){
      return true;
    }else{ return false;}
  }

  localStorageService.setVariable = function(key,value){
    if(!isString(value)){
      return null;
    }
    return localStorage.setItem(key,value);
  };

  localStorageService.getVariable = function(key){
    return localStorage.getItem(key);
  };

  localStorageService.setObject = function(key,value){
    if(!isObject(value)){
      return null;
    }
    return localStorage.setItem(key,JSON.stringify(value));
  };

  localStorageService.getObject = function(key){
    return JSON.parse(localStorage.getItem(key));
  };

  localStorageService.setBool = function(key,value){
    if(!isBool(value)){
      return null;
    }
    return localStorage.setItem(key,value);
  };

  localStorageService.getBool = function(key){
    var boolString = localStorage.getItem(key);

    if(boolString === 'true'){
      return true;
    }else if(boolString === 'false'){
      return false;
    }else{
      return boolString;
    }

  };

  return localStorageService;


});