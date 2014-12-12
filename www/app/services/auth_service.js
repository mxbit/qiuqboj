var authService = angular.module('jobquiq.authService',['ngResource']);



authService.factory('AppUser', function($resource, $rootScope)  {
  var resourceUrl = $rootScope.jsonUrl+'api/appuser/user/';
  return $resource(resourceUrl+':id');
});

authService.factory('GoogleAuth2', function($resource) {

    return {

      getBaseInfo:function(acces_token)  {
        var token =  'Bearer '+acces_token;console.log(acces_token);
        var resourceUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';
        return $resource(resourceUrl, { }, {
                query: {
                method: 'GET',
                isArray: false,
                headers: { 'Authorization': token }
            }
        }).query();

      }


    }

  });

authService.factory('', function($resource, $rootScope){
  
});