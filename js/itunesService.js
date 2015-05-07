var app = angular.module('itunes');

app.service('itunesService', function($http, $q){
 
	 this.getArtist = function(artist){
	 	var deferred = $q.defer();
	 		$http({
	 		method: 'JSONP',
	 		url: 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
	 	}).then(function(response){
	 		response = loopResult(response.data.results);
	 		deferred.resolve(response);
	 	})
	 	return  deferred.promise
	  };


	
		var loopResult = function (data) {
			console.log(data)
			newArr = [];
		    for(var i = 0; i < data.length; i++){
			    var artistObj = {}; 
			      artistObj.AlbumArt = data[i].artworkUrl100,
			      artistObj.Artist = data[i].artistName,
			      artistObj.Collection = data[i].collectionName,
			      artistObj.CollectionPrice = data[i].CollectionPrice,
			      artistObj.Play = data[i].previewURL,
			      artistObj.Type = data[i].kind
			      newArr.push(artistObj);
			    };
		    return newArr;
		};

});

 //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also not that we're using a 'service' and not a 'factory' so all your method you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in. 
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    //Code here