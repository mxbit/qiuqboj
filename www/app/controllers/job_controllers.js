var jobController = angular.module('jobquiq.jobController',[]);

jobController.controller('JobsDetailController', function($scope, $rootScope,$stateParams,$window,JobsList, JobService, LocalStorage)	{

$scope.job = JobsList.getSelectedItem($stateParams.id);
var userInfo = LocalStorage.getObject('appUserInfo')


	$scope.gotoBack = function()	{
		$window.history.back();
    
	}

  $scope.hasApplied = function()  {
    if(userInfo.jobs) {
      for(var i=0; i<userInfo.jobs.length; i++) {
        if(Number( userInfo.jobs[i] ) == Number( $scope.job.jobs_id))  {
          return true;
        }
      }
    }
    return false;
    
  }

  $scope.removeJob = function() {
    if(userInfo.jobs) {
      for(var i=0; i<userInfo.jobs.length; i++) {
        if(Number( userInfo.jobs[i] ) == Number( $scope.job.jobs_id))  {
          userInfo.jobs.splice(i,1);
        }
      }
    }    
  }
  
  $scope.applyJob = function()  {
    var hasApplied = $scope.hasApplied();
    var jb = new JobService({ id: $scope.job.jobs_id,email:userInfo.email, isapplied : hasApplied});
    jb.$save();

    if(!hasApplied)  {
      if(userInfo.jobs) {
        userInfo.jobs.push($scope.job.jobs_id);
      }
      else  {
        userInfo.jobs = [];
        userInfo.jobs.push($scope.job.jobs_id);
      }
    }
    else  {
      $scope.removeJob();
    }



    LocalStorage.setObject('appUserInfo',userInfo)

  }

});

jobController.controller('JobsListController', function($scope, $rootScope,$window,JobsList)	{
	$scope.goDetails = function()	{
		$rootScope.$state.go('jobsdetail');
	}
  console.log(JobsList.getList())
  // toolbar-tabbar
  $scope.content_height = ($window.innerHeight-48-34);

  $scope.getImage = function(index)  {
    // console.log(index)
    var rand = (index)%16//Math.round( Math.random()*16 )+1
    rand = rand <10 ? '00'+rand+'.jpg' : '0'+rand+'.jpg'
    return 'img/list/'+rand;
  }


  $scope.list = JobsList.getList();
    


});

jobController.controller('JobsMapController', function($scope, $rootScope, $window)	{
  	$scope.goDetails = function()	{
  		$rootScope.$state.go('jobsdetail');
  	}
    $scope.content_height = ($window.innerHeight-48-34-80);

  var coords = {latitude: 45.0,longitude: 11.0};


  $scope.map = { title: "A test map", center: coords, zoom: 15};

  $scope.marker = { id: "myMarker", coords: coords, icon: 'img/poi.png'};

  $scope.markers = [ $scope.marker ];


  });


