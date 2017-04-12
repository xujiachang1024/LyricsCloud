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


module.exports = getList;