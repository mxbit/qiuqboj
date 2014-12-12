var mappingService = angular.module('jobquiq.mappingService',['ngResource']);

mappingService.factory('ReverseGeo', function($resource, $rootScope)	{
	var resourceUrl = "http://nominatim.openstreetmap.org/reverse?format=json&";

	var reverse = new Object();

	reverse.reverse = function(geo)	{

		var geo_url = resourceUrl+ "lat="+geo.latitude+"&lon="+geo.longitude+'&zoom=12&email=info@mxbit.co.in';
		var geo_service = 	$resource(geo_url, { },  { query: { method: 'GET', isArray: false } }).query();
		return geo_service;
	}

	return reverse;
})

