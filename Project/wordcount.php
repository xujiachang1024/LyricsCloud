<?php

$lyrics = $_POST['lyrics'];
$word = $_POST['word'];

function getFrequency($lyrics){
	$frequency_list = array();
	foreach($lyrics as $pos => $word){
		if(array_key_exists($word, $frequency_list)){
			++$frequency_list[$word]; 
		}else{		
			$frequency_list[$word] = 1;
		}
	} 
	return $frequency_list;
}

$countresult = str_word_count($lyrics, 1);
$list = getFrequency($countresult);

echo $list[$word];
?>