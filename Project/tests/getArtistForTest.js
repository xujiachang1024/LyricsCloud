// recorded id
var rId = [];
var rNames = [];
var allLyrics = [];
function getID(){
	return rId;
}
// Get The Artist Id
function getArtistForTest(artistSearch){
	//var artistSearch = document.getElementById("artistSearch").value;
	artistSearch = (artistSearch.split("|"))[0];
	$.ajax({
		type: "GET",
		data:{
			apikey:"dddfcf2ec4ec455403ad9a631c2ee8e9",
			q_artist: artistSearch,
			page_size:10,
			format:"jsonp",
			callback:"jsonp_callback"
		},
		url: "http://api.musixmatch.com/ws/1.1/artist.search",
		dataType: "jsonp",
		jsonpCallback: 'jsonp_callback',
		contentType: 'application/json',
		async: false,
		success: function(data){
			var tmp = data.message.body.artist_list;
			var isExisted = false;
			for(var i = 0; i < tmp.length; i++){
				var name = tmp[i].artist.artist_name;
				if(name.toLowerCase() == artistSearch.toLowerCase()){
					var id = tmp[i].artist.artist_id;
					// if is not adding but searching, empty the record Artist id and allLyrics lists
					if(!isAdding){
						rId = [];
						rNames = [];
						allLyrics = [];
					}
					rId.push(id);
					getAllAlbums(id);
					rNames.push(tmp[i].artist.artist_name);
					var namestr = "";
					for(var i = 0; i < rNames.length; i++){
						if(i == rNames.length-1){
							namestr += rNames[i];
						} else {
							namestr += rNames[i] + " + ";	
						}
					}
					document.getElementById("titleword").innerHTML = namestr;
					isExisted = true;
					break;
				}
			}
			if(!isExisted){
				//Generate Error Word Cloud
				var wordlist = [["No Such Artist", 80]];
				//generateWordCloud(wordlist);
				return false;
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}
module.exports = getArtistForTest;

