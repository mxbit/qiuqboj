var jobService = angular.module('jobquiq.jobService',['ngResource']);

jobService.factory('JobsList', function($resource, $rootScope)	{
	var resourceUrl = $rootScope.jsonUrl+'api/jobs/all';

	var joblist = new Object();
	var result_list = [];

	joblist.lookupList = function(query)	{
		var list_service  = $resource(resourceUrl, { place:query},  { query: { method: 'GET', isArray: false } }).query();
		list_service.$promise.then(function(data)	{
			if(data.$resolved)	{
				result_list = data.result;
			}

		});
	}

	joblist.getList = function()	{
		return result_list;
	}

	joblist.getSelectedItem = function(index) 	{
		return result_list[index];
	}


	return joblist;

});


jobService.factory('JobService', function($resource, $rootScope)  {
  var resourceUrl = $rootScope.jsonUrl+'api/jobs/job/';
  return $resource(resourceUrl+':id');
});