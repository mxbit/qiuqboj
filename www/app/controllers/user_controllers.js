var userController = angular.module('jobquiq.userController',[]);

userController.controller('AuthDialogController', function($scope, $cordovaOauth, $rootScope, $mdDialog, Customer,GoogleAuth2, LocalStorage) {

  $scope.dialogueEventHandler = function() {
    $mdDialog.cancel();
  };


$scope.googleLogin = function() {

      if(!$rootScope.isLoggedIn)  {

        var client_id = "196955690689-udi0itbq03pd3f07qn101b7ue6v28d33.apps.googleusercontent.com"; // Client ID for web application
        //196955690689-cvshsvikjsbk3c4sntg4455fo3cqju2v.apps.googleusercontent.com //Service Account
        // var client_id = "332483207466-42pq7to17pendeuq1fiqcr0r18t9j28i.apps.googleusercontent.com"; // Bakasur
         // var client_id = "332483207466-42pq7to17pendeuq1fiqcr0r18t9j28i.apps.googleusercontent.com";
        $cordovaOauth.google(client_id, ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"]).then(function(result) {

            var info_service =  GoogleAuth2.getBaseInfo(result.access_token)
            info_service.$promise.then(function(infoResult)  {
              delete infoResult.$promise;
              delete infoResult.__proto__;
              delete infoResult.$resolved;
              console.debug(JSON.stringify(infoResult));
              LocalStorage.setObject('appUserInfo',infoResult );
              $rootScope.$broadcast('loginEvent',{done:0,data:infoResult})
              $rootScope.isLoggedIn = true;
              $scope.userinfo = infoResult;
              infoResult['initial'] = true;
              var customer = new Customer(infoResult);
              customer.$save(infoResult);
              //alert(JSON.stringify(infoResult));
               $mdDialog.cancel();
               $rootScope.$state.go('profile'); 

            })


        }, function(error) {
          alert(error);
        });

      }
      else  {
        $scope.userinfo = LocalStorage.getObject('appUserInfo');
        $scope.loggedIn = true;
      }

    }

   

     if($rootScope.isLoggedIn)  {

        $scope.userinfo = LocalStorage.getObject('appUserInfo');
        $scope.loggedIn = true;   
        console.debug($rootScope.isLoggedIn, $scope.userinfo)

     }


});



userController.controller('ProfileController', function($scope,$rootScope,Customer,LocalStorage){
  //var user = {title:"Shiva",email:'Shiva@kailas.com'}
  //$scope.user = user;
  $scope.user = LocalStorage.getObject('appUserInfo');
  console.log($scope.user);
	$scope.updateUserInfo = function()	{
		  var infoResult = {name:'ParamShiv',id:'0101001010',email:'shiv@shiva.com',gender:'male',initial:false,alt_phone:'12070670',addr_1:'#525 8th Cross'};
		  var customer = new Customer($scope.user);
		  customer.$save();
		  LocalStorage.setObject('appUserInfo',$scope.user );	
	}

  $scope.logout = function()  {
    LocalStorage.setObject('appUserInfo', {} );  
    $rootScope.$state.go('home'); 
    $rootScope.isLoggedIn = false;
  }

});

commonController.controller('SettingsController', function($scope,$rootScope,$window){
   $scope.radius = 30;
   $scope.notification = 'ON';

   $scope.setlocation = function()  {
      console.log($scope.map.center);
      $scope.marker.coords = $scope.map.center;
   }

  $scope.content_height = ($window.innerHeight-48-132);

  var coords = { latitude: 12.9192, longitude: 77.6534};
  $scope.map = {center: coords,zoom: 12,};

  $scope.marker = { id: "myMarker",coords: coords, icon: 'img/poi.png'};

  $scope.markers = [$scope.marker];

});