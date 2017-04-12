
// Get lyrics from Musixmatch by track_id array
function getLyrics(track_ids, length){
	var str = "";
	var constlength = length;
	for(var i = 0; i < constlength; i++){
	var id = track_ids[i];
	$.ajax({
		type: "GET",
		data: {
			apikey:"dddfcf2ec4ec455403ad9a631c2ee8e9",
			track_id: id,
			format:"jsonp",
		},
		async: false,
		url: "http://api.musixmatch.com/ws/1.1/track.lyrics.get",
		dataType: "jsonp",
		contentType: 'application/json',
		success: function(data) {
			if(data.message.body.lyrics.lyrics_language == 'en'){
				var lyrics = data.message.body.lyrics.lyrics_body;
				lyrics = lyrics.replace('...', '');
				lyrics = lyrics.replace('******* This Lyrics is NOT for Commercial use *******', '');
				lyrics = lyrics.replace('(1409614335039)','');
				//lryics = lyrics.replace(/\,/g , '');
				lyrics = lyrics.replace(/\n/g, ' ');
				rTrack2lyrics.set(track_ids[constlength-length], lyrics);
				allLyrics.push(lyrics);
				str = allLyrics;
			}
			// since ajax is synchronous, unable to change local variable, have to use this alternative way
			if(length==1){
				allLyrics.join();
				parseLyrics(allLyrics);
				if(Storage){
					var jsonresult = [];
					rTrack2lyrics.forEach(function(value,key){
						jsonresult.push({id:key, val: value});
					});
					var jsonObj = JSON.stringify(jsonresult);
					localStorage.setItem('rTrack2lyrics', jsonObj);
				}
			} else {
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
	return str;
};

module.exports = getLyrics;