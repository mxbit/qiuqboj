var commonController = angular.module('jobquiq.commonController',[]);

commonController.controller('SideNavController', function($scope, $timeout, $mdSidenav, $rootScope, $mdDialog, LocalStorage) {
  
  // checking login status
  var user = LocalStorage.getVariable('userInfo');
  if(user.email)  {
    $rootScope.isLoggedIn = true;
  }
  else  {
     $rootScope.isLoggedIn = false;console.log('Not logged');
  }

  $scope.close = function() { $mdSidenav('left').close(); };
  
  $scope.goView = function(name) { 
    if($rootScope.isLoggedIn)  {
      $rootScope.$state.go(name); 
    }
    else  {
      $mdDialog.show({ controller: 'AuthDialogController', templateUrl: 'app/view/google_auth.html',targetEvent: event});
    }
    $scope.close();
  };



})

commonController.controller('TopBarController', function($scope, $timeout, $mdSidenav,$rootScope, $mdDialog) {
  $scope.toggleLeft = function() { $mdSidenav('left').toggle(); };  
  $scope.close = function() { $mdSidenav('left').close(); };
  $scope.goView = function(name) { $rootScope.$state.go(name);};


  $scope.showLogin = function(event) {
    if($rootScope.isLoggedIn)  {
        $rootScope.$state.go('profile');
    }
    else  {
      $mdDialog.show({ controller: 'AuthDialogController', templateUrl: 'app/view/google_auth.html',targetEvent: event});
    }
   
  }
});



commonController.controller('HomeController', function($scope,$rootScope){
	$scope.gotoNext = function()	{ $rootScope.$state.go('jobs.tabs');  } 
});





commonController.controller('JobsController', function($scope, $rootScope)	{
	$scope.tabsFocus = function()  {
    console.log('My focus');
  }

  $scope.data = {selectedIndex : 0};

    $scope.next = function() {
      $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2) ;
      $rootScope.$state.go('jobs.tabs');
    };
    $scope.previous = function() {
      $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
    };
  
});

