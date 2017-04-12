<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>wordcloud2.js - tag cloud/Wordle presentation on 2D canvas or HTML</title>
	<!-- Le styles -->
	<link href="//netdna.bootstrapcdn.com/bootstrap/2.2.2/css/bootstrap.min.css" rel="stylesheet">
	<link href="//netdna.bootstrapcdn.com/bootstrap/2.2.2/css/bootstrap-responsive.min.css" rel="stylesheet">
	<link href="./autocomplete/awesomplete.css" type="text/css" rel="stylesheet">
	<script defer src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
	<script defer src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.2.2/bootstrap.min.js"></script>
	<script defer src="./src/wordcloud2.js"></script>
	<script defer src="./index.js"></script>
	<script defer src="./autocomplete/awesomplete.js" async></script>
</hea1d>
<body>
	<div class="container">
		<p class="lead"><strong>Lyrics Cloud</strong></p>
		<div id="not-supported" class="alert" hidden>
			<strong>Your browser is not supported.</strong>
		</div>
		<form id="form" method="get" action="">
			<div class="row">
				<div class="span12" id="canvas-container">
					<canvas id="canvas" class="canvas"></canvas>
					<div id="html-canvas" class="canvas hide"></div>
				</div>
				<div id="searchfield">
					<section id="ajax-example">
						<script>

						</script>
						<form ><input class="awesomplete" data-list="ColdPlay, JohnWick, Amier, Amiable, Beatles, David Bowie, Gun'n Flower, Eagle"></form>
					</section>
				</div>
				<div class="span6">
					<button class="btn btn-primary" type="submit">Search</button>
					<a class="btn" id="btn-save" href="#" download="wordcloud.png" title="Save canvas">Save Image</a>
				</div>
			</div>
			<div id="input-list" class="span12"><div>
			<div id="config-option" class="span12"></div>
			<input type="hidden" id="config-dppx" class="input-mini" min="1" value="1" required>
		</form>
	</div>
</body>
</html>
