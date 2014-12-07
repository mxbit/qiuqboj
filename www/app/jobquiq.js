jobquiq = angular.module('jobquiq',['ui.router', 'ngAnimate', 'ngMaterial','jobquiq.commonController','jobquiq.jobController']);

jobquiq.run(['$rootScope','$state','$stateParams',function($rootScope, $state, $stateParams)	{
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;

	
		$rootScope.$on('$stateChangeError', function(event, unfoundState, fromState, fromParam)	{
			console.log(unfoundState.to); // "lazy.state"
			console.log(unfoundState.toParams); // {a:1, b:2}
			console.log(unfoundState.options); 		
		});






	}
]);

jobquiq.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider)	{
		$urlRouterProvider.otherwise('home');

		$stateProvider.state('home',{url:"/home", controller:'HomeController', templateUrl:'app/view/home.html'});
		$stateProvider.state('jobs',{url:"/jobs", controller:'JobsController', templateUrl:'app/view/jobs.html'});
		$stateProvider.state('jobs.tabs',{url:"/tabs", 
			views: {
				'maps': {templateUrl: 'app/view/maps.html', controller:'JobsMapController'}
				,'list': {templateUrl: 'app/view/list.html', controller:'JobsListController'}
			}
		});
		$stateProvider.state('jobsdetail',{url:"/jobsdetail", controller:'JobsDetailController', templateUrl:'app/view/jobsdetail.html'});

		$stateProvider.state('profile',{url:"/profile", controller:'ProfileController', templateUrl:'app/view/profile.html'});
		$stateProvider.state('settings',{url:"/settings", controller:'SettingsController', templateUrl:'app/view/settings.html'});


	
			
	}
]);


