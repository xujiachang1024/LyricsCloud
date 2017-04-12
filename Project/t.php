<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>jQuery UI Autocomplete - Remote JSONP datasource</title>
  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <link rel="stylesheet" href="/resources/demos/style.css">
  <style>
  .ui-autocomplete-loading {
    background: white url("images/ui-anim_basic_16x16.gif") right center no-repeat;
  }
  </style>
  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="./autocomplete/jquery-ui.js"></script>
  <script>
  $( function() {
    function log( message ) {
      $( "<div>" ).text( message ).prependTo( "#log" );
      $( "#log" ).scrollTop( 0 );
    }
    $( "#artists" ).autocomplete({
      source: function( request, response ) {
      $.ajax({
        data:{
          apikey:"445d6196c08dc2b7490929f18149d684",
          q_artist: request.term,
          format:"jsonp",
          callback:"jsonp_callback"
        },
        url: "http://api.musixmatch.com/ws/1.1/artist.search",
        dataType: "jsonp",
        jsonpCallback: 'jsonp_callback',
        success: function(data){
          var suggestionlist=[];
          console.log(data);
          var tmp = data.message.body.artist_list;
          console.log(tmp);
          for(var i = 0; i < 5; i++){
            var name = tmp[i].artist.artist_name;
            suggestionlist.push(name);
          }
          console.log(suggestionlist);
          response(suggestionlist);
        }
      });
        },
        minLength: 2,
        select: function( event, ui ) {
        log( "Selected: " + ui.item.value + " aka " + ui.item.id );
      }
    });
  });
  </script>
</head>
<body>
 
<div class="ui-widget">
  <label for="artists">artists: </label>
  <input id="artists">
</div>
 
<div class="ui-widget" style="margin-top:2em; font-family:Arial">
  Result:
  <div id="log" style="height: 200px; width: 300px; overflow: auto;" class="ui-widget-content"></div>
</div>
 
 
</body>
</html>