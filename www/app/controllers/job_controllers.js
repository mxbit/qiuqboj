var jobController = angular.module('jobquiq.jobController',[]);

jobController.controller('JobsDetailController', function($scope, $rootScope)	{
	$scope.gotoBack = function()	{
		$rootScope.$state.go('jobs');
	}
});

jobController.controller('JobsListController', function($scope, $rootScope,$window)	{
	$scope.goDetails = function()	{
		$rootScope.$state.go('jobsdetail');
	}

  // toolbar-tabbar
  $scope.content_height = ($window.innerHeight-48-34);


$scope.messages = [{
      face: 'img/list/60.jpeg',
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    }, {
      face: 'img/list/60.jpeg',
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    }, {
      face: 'img/list/60.jpeg',
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    }, {
      face: 'img/list/60.jpeg',
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    }, {
      face: 'img/list/60.jpeg',
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    }, {
      face: 'img/list/60.jpeg',
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    }, {
      face: 'img/list/60.jpeg',
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    }, {
      face: 'img/list/60.jpeg',
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    }, {
      face: 'img/list/60.jpeg',
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    }];
    


});

jobController.controller('JobsMapController', function($scope, $rootScope)	{
	$scope.goDetails = function()	{
		$rootScope.$state.go('jobsdetail');
	}
});