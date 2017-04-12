
// Get All Albums by the artist id
var getAllAlbumsForTest = module.exports = function getAllAlbums(artist_id){
	var track_ids = [];
	$.ajax({
		type: "GET",
		data:{
			apikey:"dddfcf2ec4ec455403ad9a631c2ee8e9",
			artist_id: artist_id,
			page_size:100,
			format:"jsonp",
			callback:"jsonp_callback"
		},
		url: "http://api.musixmatch.com/ws/1.1/artist.albums.get",
		dataType: "jsonp",
		jsonpCallback: 'jsonp_callback',
		contentType: 'application/json',
		success: function(data){
			var albums = data.message.body.album_list;
			var album_ids = [];
			if(albums){
				for(var i = 0; i < albums.length; i++){
					album_ids.push(albums[i].album.album_id);
				}
				getTracks(album_ids, album_ids.length);
			}
			
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
	return track_ids;
}

//module.exports = getAllAlbums;