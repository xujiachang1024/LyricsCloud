/*

Reference:
https://codepen.io/brian_jenney/pen/dGKmyX?editors=0010

*/

var suggestionlist;

function getSuggestionlist() {
	return suggestionlist;
}



// direct copy from request.js, no modification
function getSuggestionArtist(){
	var artistSearch = document.getElementById("artistSearch").value;
	$.ajax({

		type: "GET",
		data:{
			apikey:"445d6196c08dc2b7490929f18149d684",
			q_artist: artistSearch,
			format:"jsonp",
			callback:"jsonp_callback"
		},

		url: "http://api.musixmatch.com/ws/1.1/artist.search",
		dataType: "jsonp",
		jsonpCallback: 'jsonp_callback',
		contentType: 'application/json',

		success: function(data){
			console.log(data);
			var tmp = data.message.body.artist_list;
			for(var i = 0; i < 5; i++){
				suggestionlist.push(tmp[i].artist.name);
			}
		},

		error: function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}



// get the songs via the name of the specified artist
function searchArtist() {

	var inArtist;

	$.ajax ({

		type: "GET",
		data: {
			apikey: "84aee29b62a11cc98ac8c4771aabd80e",
			q_artist: inArtist,
			format:"jsonp",
		},

		url: "http://api.musixmatch.com/ws/1.1/track.search",
		dataType: "jsonp",
		jsonpCallback: 'jsonp_callback',
    	contentType: 'application/json',

    	success: function(data) {

    	},

    	error: function(jqXHR, textStatus, errorThrown) {
        	console.log(jqXHR);
        	console.log(textStatus);
        	console.log(errorThrown);
    	}  
	});

};



// get the songs via the name of the specified artist, and via the clicked keyword
function searchSongsUsingKeyword() {

	var inArtist;
	var inKeyword;

	$.ajax ({

		type: "GET",
		data: {
			apikey: "84aee29b62a11cc98ac8c4771aabd80e",
			q_artist: inArtist,
			q_lyrics: inKeyword,
			format:"jsonp",
		},

		url: "http://api.musixmatch.com/ws/1.1/track.search",
		dataType: "jsonp",
		jsonpCallback: 'jsonp_callback',
    	contentType: 'application/json',

    	success: function(data) {

    	},

    	error: function(jqXHR, textStatus, errorThrown) {
        	console.log(jqXHR);
        	console.log(textStatus);
        	console.log(errorThrown);
    	} 
	});

};



/// get the lyrics via track_id
function getLyricsNow() {

	var inTrackID,

	$.ajax ({

		type: "GET",
		data: {
			apikey: "84aee29b62a11cc98ac8c4771aabd80e",
			track_id: inTrackID,
			format:"jsonp",
		}

		url: "http://api.musixmatch.com/ws/1.1/track.lyrics.get",
		dataType: "jsonp",
		jsonpCallback: 'jsonp_callback',
    	contentType: 'application/json',

    	success: function(data) {

    	},

    	error: function(jqXHR, textStatus, errorThrown) {
        	console.log(jqXHR);
        	console.log(textStatus);
        	console.log(errorThrown);
    	} 
	});

};