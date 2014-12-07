var commonController = angular.module('jobquiq.commonController',[]);

commonController.controller('SideNavController', function($scope, $timeout, $mdSidenav, $rootScope) {
  $scope.close = function() { $mdSidenav('left').close(); };
  $scope.goView = function(name) { $rootScope.$state.go(name); $scope.close();};
})

commonController.controller('TopBarController', function($scope, $timeout, $mdSidenav,$rootScope, $mdDialog) {
  $scope.toggleLeft = function() { $mdSidenav('left').toggle(); };  
  $scope.close = function() { $mdSidenav('left').close(); };
  $scope.goView = function(name) { $rootScope.$state.go(name);};


  $scope.showLogin = function(event) {
    $mdDialog.show({ controller: 'AuthDialogController', templateUrl: 'app/view/google_auth.html',targetEvent: event});
  }
});

commonController.controller('AuthDialogController', function($scope,$rootScope, $mdDialog){
  $scope.dialogueEventHandler = function() {
    $mdDialog.cancel();
  };
});

commonController.controller('HomeController', function($scope,$rootScope){
	$scope.gotoNext = function()	{ $rootScope.$state.go('jobs.tabs');  } 
});

commonController.controller('ProfileController', function($scope,$rootScope){
   
});

commonController.controller('SettingsController', function($scope,$rootScope){
   $scope.radius = 30;
   $scope.notification = 'ON';
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

