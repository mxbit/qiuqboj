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
  
  $rootScope.fromMap = false;

	$scope.goDetails = function()	{
		$rootScope.$state.go('jobsdetail');
	}
  //console.log(JobsList.getList())
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

jobController.controller('JobsMapController', function($scope, $rootScope, $window, JobsList)	{
  $scope.list = JobsList.getList();
  $scope.markers = [  ];

  var coords = {latitude: 45.0,longitude: 11.0};

	$scope.goDetails = function()	{
		$rootScope.$state.go('jobsdetail');
	}
  $scope.content_height = ($window.innerHeight-48-34);

  //latlng format (9.877793751731062, 76.30129257909653)
  var item,latlng,coordnts;
  for(var i=0; i<$scope.list.length; i++) {
    item = $scope.list[i];
    latlng = item.jobs_latlong.substring(1);
    latlng = latlng.split(',');
    coordnts = {latitude: parseFloat(latlng[0]) ,longitude: parseFloat(latlng[1])};
    $scope.markers.push( { index:i, id: "job_"+item.jobs_id, coords: coordnts, icon: 'img/poi.png',name:item.jobs_name, price:item.jobs_remuneration} )
  }
  if($scope.list.length > 0)  {
    coords = $scope.markers[0].coords
  }

  $scope.map = { title: "A test map", center: coords, zoom: 12};

  $scope.markersEvents = {
    click: function (gMarker, eventName, model) {
    $rootScope.fromMap = true;
    }
  };


});


