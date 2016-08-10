


var app = angular.module("map", ['leaflet-directive']);


app.controller("searchMap", function($scope, $timeout, leafletData) {

    var autocomplete;
    $scope.center =  {lat: 9.9312328, lng: 76.26730410000005, zoom: 10};

    $scope.tile ={
	    url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
	    options: {
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	    }
      }

    // Autocomplete address based on Google API
    $scope.initAutocomplete  =function () {
        autocomplete = new google.maps.places.Autocomplete(
            (document.getElementById('inputLocation')),
            {types: []});
        google.maps.event.addListener(autocomplete, 'place_changed', function() {

            $scope.fillInAddress()
        });
    };

    // Get lat and lon from Google API
    $scope.fillInAddress = function() {
        $scope.latitude = autocomplete.getPlace().geometry.location.lat();
        $scope.longitude = autocomplete.getPlace().geometry.location.lng();
        $scope.updateMarker()
    };

    // Update the marker and center point
    $scope.updateMarker = function () {
        $scope.marker = []
        $scope.center = {};
        $scope.center =  {
                lat: parseFloat($scope.latitude),
                lng: parseFloat($scope.longitude),
                zoom: 10
            };
        $scope.marker.push({
            lat: parseFloat($scope.latitude),
            lng: parseFloat($scope.longitude),
            focus: true,
            message: $('#inputLocation').val(),
	    draggable: true
        });
       $timeout(function () {
                leafletData.getMap().then(function(map) {
                    map.invalidateSize();
                })
            }, 0);
    };

    $scope.initAutocomplete();
});

