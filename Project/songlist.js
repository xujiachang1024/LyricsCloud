var word;

// recorded map of trackid to track_id
var rTrack2lyrics = new Map();

// recorded map of track_id to track_name
var rTrackid2Name = new Map();

$(document).ready(function(){
	var data1 = localStorage.getItem('rTrack2lyrics');
	var tmp = JSON.parse(data1);
	for(var i =0; i < tmp.length; i++){
		rTrack2lyrics.set(tmp[i].id, tmp[i].val);
	}
	var data2 = localStorage.getItem('rTrackid2Name');
	tmp = JSON.parse(data2);
	for(var i =0; i < tmp.length; i++){
		rTrackid2Name.set(tmp[i].id, tmp[i].val);
	}
	console.log(rTrackid2Name);
});


function getList(w){
	word = w;
	var word2Freq = [];
	console.log(word2Freq);
	//for(var [key, value] of rTrack2lyrics.entries()){
	rTrack2lyrics.forEach(function(value,key){
		if(value.includes(w)){
			$.ajax({
				type: 'POST',
				dataType: 'json',
				url:'./wordcount.php',
				async: false,
				data:{
					lyrics: value,
					word: w
				},
				success: function(returned){
					console.log(returned);
					word2Freq.push({key: key, value: returned});
				},
				error: function(){
					console.log("ERROR");
				}
			});
		}
	});
	word2Freq.sort(function(a,b){
		return b.value - a.value;
	});
	songListDisplay(word2Freq);
}

function songListDisplay(word2Freq){
	var list = document.getElementById("songlist");
	for(var i =0; i < word2Freq.length; i++){
		var entry = document.createElement('li');
			var a = document.createElement('a');
			var str = rTrackid2Name.get(word2Freq[i].key) + '\t';
			str_pad(str,20," ",STR_PAD_RIGHT);
			str += word2Freq[i].value;
			//entry.appendChild(document.createTextNode(str));
			a.textContent = str;
			var address = "lyrics.html?track_id=" + word2Freq[i].key + "&word=" + word;
			console.log(address);
			a.setAttribute("href", address);
			entry.appendChild(a);
		list.appendChild(entry);
	}
	
}



