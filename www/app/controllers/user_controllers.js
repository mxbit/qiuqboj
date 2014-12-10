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

   

     if($rootScope.isLoggedIn)  {

        $scope.userinfo = LocalStorage.getObject('userInfo');
        $scope.loggedIn = true;   
        console.debug($rootScope.isLoggedIn, $scope.userinfo)

     }


});



userController.controller('ProfileController', function($scope,$rootScope,Customer,LocalStorage){
  var user = {title:"Shiva",email:'Shiva@kailas.com'}
  $scope.user = user;
  //$scope.user = LocalStorage.getObject('userInfo');

	$scope.updateUserInfo = function()	{
		  var infoResult = {name:'ParamShiv',id:'0101001010',email:'shiv@shiva.com',gender:'male',initial:false,alt_phone:'12070670',addr_1:'#525 8th Cross'};
		  var customer = new Customer(infoResult);
		  customer.$save();
		  //LocalStorage.setVariable('userInfo',$scope.user );	
	}

});

commonController.controller('SettingsController', function($scope,$rootScope){
   $scope.radius = 30;
   $scope.notification = 'ON';
});