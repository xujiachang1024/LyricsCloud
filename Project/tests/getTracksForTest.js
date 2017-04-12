
// get All Tracks from All Albums
function getTracks(album_ids, length){
	var track_ids = [];
	var trackids = 11;
	var constlength = length;
	for(var i = 0; i < constlength;i++){
		var id = album_ids[i];
		$.ajax({
			type: "GET",
			data:{
				apikey:"dddfcf2ec4ec455403ad9a631c2ee8e9",
				album_id: id,
				page_size:100,
				format:"jsonp",	
			},
			url: "http://api.musixmatch.com/ws/1.1/album.tracks.get",
			dataType: "jsonp",
			contentType: 'application/json',
			async: false,
			success: function(data){
				var tmp = data.message.body.track_list;
				for(var j = 0; j < tmp.length; j++){
					if(tmp[j].track.has_lyrics==1)	track_ids.push(tmp[j].track.track_id);
					rTrackid2Name.set(tmp[j].track.track_id, tmp[j].track.track_name);
				}
				// since ajax is synchronous, unable to change local variable, have to use this alternative way
				if(length==1) {
					// store to localStorage for the later use
					if(Storage){
						var jsonresult = [];
						rTrackid2Name.forEach(function(value,key){
							jsonresult.push({id:key, val: value});
						});
						var jsonObj = JSON.stringify(jsonresult);
						localStorage.setItem('rTrackid2Name', jsonObj);
					}
					getLyrics(track_ids, track_ids.length);
				}else {
					length--;
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
	}

	return trackids;
}

module.exports = getTracks;