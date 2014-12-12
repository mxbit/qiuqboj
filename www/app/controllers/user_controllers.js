var userController = angular.module('jobquiq.userController',[]);

userController.controller('AuthDialogController', function($scope, $cordovaOauth, $rootScope, $mdDialog, AppUser,GoogleAuth2, LocalStorage) {

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
              var customer = new AppUser(infoResult);
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



userController.controller('ProfileController', function($scope,$rootScope,AppUser,LocalStorage){
  //$scope.user = user;
  $scope.user = LocalStorage.getObject('appUserInfo');
  $scope.addr;

  if($scope.user.addr_1.length > 5 && $scope.user.addr_1 != undefined)  {
    $scope.addr = JSON.parse($scope.user.addr_1);
  }
  console.log($scope.user.addr_1);
  
	$scope.updateUserInfo = function()	{

      $scope.user.addr_1 = JSON.stringify($scope.addr);

		 // var infoResult = {name:'ParamShiv',id:'989',email:'shiv@shiva.com',gender:'male',initial:false,alt_phone:'23',addr_1:$scope.user.addr_1};
      // var customer = new AppUser(infoResult);
		  var customer = new AppUser($scope.user);
		  customer.$save();
		  LocalStorage.setObject('appUserInfo',$scope.user );	
	}

  $scope.logout = function()  {
    LocalStorage.setObject('appUserInfo', {} );  
    $rootScope.$state.go('home'); 
    $rootScope.isLoggedIn = false;
  }

});

commonController.controller('SettingsController', function($scope,$rootScope,$window,$interval,LocalStorage,ReverseGeo,AppUser){
   $scope.radius = 10;
   $scope.notification = 'ON';
   $scope.content_height = ($window.innerHeight-48-132);

   $scope.userinfo = LocalStorage.getObject('appUserInfo'); 

   var coords = { latitude: 12.9192, longitude: 77.6534};
   var user_coord =  { latitude: 12.9192, longitude: 77.6534};

   if($scope.userinfo.latlong) {
      var latlong_data = JSON.parse($scope.userinfo.latlong);
      user_coord = { latitude: latlong_data.latitude, longitude: latlong_data.longitude}
      coords =  { latitude: latlong_data.latitude, longitude: latlong_data.longitude}
   }
   if($scope.userinfo.radius) {
      $scope.radius = $scope.userinfo.radius;
   }

  $scope.notification = ($scope.userinfo.notification == 1 ? 'ON' : 'OFF');

   $scope.updateNotification = function() {
      var notfn = ($scope.notification == 'ON' ? 1 : 0);
      var save_data = {email:$scope.userinfo.email, 'initial':false, status:notfn, radius:$scope.radius, update_type:'notification'}
      var appUser = new AppUser(save_data);
      appUser.$save();

      $scope.userinfo.notification = notfn;
      $scope.userinfo.radius = $scope.radius;
      LocalStorage.setObject('appUserInfo',$scope.userinfo);  
   }

   $scope.updateRadius = function() {
      console.log($scope.radius);
   }
   $scope.setlocation = function()  {
    //Setting poi marker
    $interval(function()  {
      if($scope.marker.icon)
        $scope.marker.icon = undefined;
      else
      $scope.marker.icon = 'img/poi.png';
      coords.latitude = $scope.map.center.latitude;
      coords.longitude = $scope.map.center.longitude;
    }, 100,2);
      
    var address = ReverseGeo.reverse($scope.map.center)
    address.$promise.then(function(geo_result )  {
      if(geo_result.$resolved)  {
        //console.log(geo_result.address)
        var addr = $scope.getBaseAddress(geo_result.address);
        if(addr)  {
          var save_data = {email:$scope.userinfo.email, 'initial':false, 
                            latlong : $scope.map.center.latitude+','+$scope.map.center.longitude, 
                            location : addr,
                            geoinfo : JSON.stringify(geo_result.address),
                            radius : $scope.radius,
                            update_type:'geo'};
          var appUser = new AppUser(save_data);
          appUser.$save();  
          
          $scope.userinfo.latlong = JSON.stringify($scope.map.center);
          $scope.userinfo.radius = $scope.radius;
          LocalStorage.setObject('appUserInfo',$scope.userinfo);

          //console.log(' -------- '+addr)
        }
      }
    });




   }



  $scope.map = {center: user_coord,zoom: 12};

  $scope.marker = { id: "myMarker", coords: coords, icon: 'img/poi.png',
    options:{ draggable: true, labelAnchor: "5 0", labelClass: "marker-labels" }
  };

  $scope.markers = [$scope.marker];

  $scope.getBaseAddress = function(address)  { 
     if(address.suburb)   return (address.suburb+(address.county ? ', '+address.county : '' ));
    else if(address.town) return (address.town+(address.state_district ? ', '+address.state_district : '' ));
    else if(address.village) return (address.village+(address.state_district ? ', '+address.state_district : '' ));
    else if(address.county) return address.county;
    else if(address.state_district) return address.state_district;



    else return null;
  }




});