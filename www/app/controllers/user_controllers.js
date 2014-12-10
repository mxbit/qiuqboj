var userController = angular.module('jobquiq.userController',[]);

userController.controller('AuthDialogController', function($scope, $cordovaOauth, $rootScope, $mdDialog, Customer,GoogleAuth2, LocalStorage) {

  $scope.dialogueEventHandler = function() {
    $mdDialog.cancel();
  };


$scope.googleLogin = function() {

      if(!$rootScope.isLoggedIn)  {

        var client_id = "196955690689-udi0itbq03pd3f07qn101b7ue6v28d33.apps.googleusercontent.com";
        $cordovaOauth.google(client_id, ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"]).then(function(result) {

            var info_service =  GoogleAuth2.getBaseInfo(result.access_token)
            info_service.$promise.then(function(infoResult)  {
              delete infoResult.$promise;
              delete infoResult.__proto__;
              delete infoResult.$resolved;
              console.debug(JSON.stringify(infoResult));
              LocalStorage.setVariable('userInfo',infoResult );
              $rootScope.$broadcast('loginEvent',{done:0,data:infoResult})
              $rootScope.isLoggedIn = true;
              $scope.userinfo = infoResult;
              infoResult['initial'] = true;
              var customer = new Customer(infoResult);
              customer.$save();

            })


        }, function(error) {
          alert(error);
        });

      }
      else  {
        $scope.userinfo = LocalStorage.getObject('userInfo');
        $scope.loggedIn = true;
      }

    }

    $scope.updateUserInfo = function(event)  {
      var data_user = $scope.userinfo;
      data_user['initial'] = false;
      var customer = new Customer(data_user);
      customer.$save();
      LocalStorage.setVariable('userInfo',data_user );
    }

     if($rootScope.isLoggedIn)  {

        $scope.userinfo = LocalStorage.getObject('userInfo');
        $scope.loggedIn = true;   
        console.debug($rootScope.isLoggedIn, $scope.userinfo)

     }


});