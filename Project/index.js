'use strict';
var examples = {
  'love' : {
    list: (function generateLoveList() {
      var list = ['12 Love'];
      var nums = [5, 4, 3, 2, 2];
      // This list of the word "Love" in language of the world was taken from
      // the Language links of entry "Love" in English Wikipedia, with duplicate
      // spelling removed.
      var words = ('Liebe,ፍቅር,Lufu,حب,Aimor,Amor,Heyran,ভালোবাসা,Каханне,Любоў,Любов,བརྩེ་དུང་།,' +
        'Ljubav,Karantez,Юрату,Láska,Amore,Cariad,Kærlighed,Armastus,Αγάπη,Amo,Amol,Maitasun,' +
        'عشق,Pyar,Amour,Leafde,Gràdh,愛,爱,પ્રેમ,사랑,Սեր,Ihunanya,Cinta,ᑕᑯᑦᓱᒍᓱᑉᐳᖅ,Ást,אהבה,' +
        'ಪ್ರೀತಿ,სიყვარული,Махаббат,Pendo,Сүйүү,Mīlestība,Meilė,Leefde,Bolingo,Szerelem,' +
        'Љубов,സ്നേഹം,Imħabba,प्रेम,Ái,Хайр,အချစ်,Tlazohtiliztli,Liefde,माया,मतिना,' +
        'Kjærlighet,Kjærleik,ପ୍ରେମ,Sevgi,ਪਿਆਰ,پیار,Miłość,Leevde,Dragoste,' +
        'Khuyay,Любовь,Таптал,Dashuria,Amuri,ආදරය,Ljubezen,Jaceyl,خۆشەویستی,Љубав,Rakkaus,' +
        'Kärlek,Pag-ibig,காதல்,ప్రేమ,ความรัก,Ишқ,Aşk,محبت,Tình yêu,Higugma,ליבע').split(',');

      nums.forEach(function(n) {
        words.forEach(function(w) {
          list.push(n + ' ' + w);
        });
      });

      return list.join('\n');
    })(),
    option: '{\n' +
      '  gridSize: Math.round(16 * $(\'#canvas\').width() / 1024),\n' +
      '  weightFactor: function (size) {\n' +
      '    return Math.pow(size, 2.3) * $(\'#canvas\').width() / 1024;\n' +
      '  },\n' +
      '  fontFamily: \'Times, serif\',\n' +
      '  color: function (word, weight) {\n' +
      '    return (weight === 12) ? \'#f02222\' : \'#c09292\';\n' +
      '  },\n' +
      '  rotateRatio: 0.5,\n' +
      '  rotationSteps: 2,\n' +
      '  backgroundColor: \'#ffe0e0\'\n' +
      '}'
  }
};
function showup(){
	console.log("showup")
	var $htmlCanvas = $('#html-canvas');
	$htmlCanvas.removeClass('hide');
}

jQuery(function($) {
	var $form = $('#form');
	var $canvas = $('#canvas');
	var $htmlCanvas = $('#html-canvas');
	var $canvasContainer = $('#canvas-container');
	var $loading = $('#loading');
	var $mask = $('#config-mask');
	var $list = $('#input-list');
	var $options = $('#config-option');
	var $width = $('#config-width');
	var $height = $('#config-height');
	var $dppx = $('#config-dppx');
	var $css = $('#config-css');
	var $webfontLink = $('#link-webfont');

	if (!WordCloud.isSupported) {
		$('#not-supported').prop('hidden', false);
		$form.find('textarea, input, select, button').prop('disabled', true);
		return;
	}

	var $box = $('<div id="box" hidden />');
	$canvasContainer.append($box);
	window.drawBox = function drawBox(item, dimension) {
		if (!dimension) {
			$box.prop('hidden', true);
			return;
		}

		var dppx = $dppx.val();

		$box.prop('hidden', false);
		$box.css({
			left: dimension.x / dppx + 'px',
			top: dimension.y / dppx + 'px',
			width: dimension.w / dppx + 'px',
			height: dimension.h / dppx + 'px'
		});
	};

	// Update the default value if we are running in a hdppx device
	if (('devicePixelRatio' in window) &&
		window.devicePixelRatio !== 1) {
		$dppx.val(window.devicePixelRatio);
	}

	$canvas.on('wordcloudstop', function wordcloudstopped(evt) {
		$loading.prop('hidden', true);
	});

	$form.on('submit', function formSubmit(evt) {
		evt.preventDefault();
		changeHash('');
	});

	$('#btn-save').on('click', function save(evt) {
		var url = $canvas[0].toDataURL();
		if ('download' in document.createElement('a')) {
			this.href = url;
		} else {
			evt.preventDefault();
		alert('Please right click and choose "Save As..." to save the generated image.');
		window.open(url, '_blank', 'width=500,height=300,menubar=yes');
		}
	});

	var run = function run() {
		$loading.prop('hidden', false);

		// Load web font
		$webfontLink.prop('href', $css.val());

		// devicePixelRatio
		var devicePixelRatio = parseFloat($dppx.val());

		// Set the width and height
		var width = $width.val() ? $width.val() : $('#canvas-container').width();
		var height = $height.val() ? $height.val() : Math.floor(width * 0.65);
		var pixelWidth = width;
		var pixelHeight = height;

		if (devicePixelRatio !== 1) {
			$canvas.css({'width': width + 'px', 'height': height + 'px'});

			pixelWidth *= devicePixelRatio;
			pixelHeight *= devicePixelRatio;
		} else {
	  		$canvas.css({'width': '', 'height': '' });
		}

		$canvas.attr('width', pixelWidth);
		$canvas.attr('height', pixelHeight);

		$htmlCanvas.css({'width': pixelWidth + 'px', 'height': pixelHeight + 'px'});

		// Set the options object
		var options = {};
		if ($options.val()) {
			options = (function evalOptions() {
			try {
				return eval('(' + $options.val() + ')');
			} catch (error) {
				alert('The following Javascript error occurred in the option definition; all option will be ignored: \n\n' +
				error.toString());
			return {};
			}
		})();
	}

	// Set devicePixelRatio options
	if (devicePixelRatio !== 1) {
		if (!('gridSize' in options)) {
			options.gridSize = 8;
		}
		options.gridSize *= devicePixelRatio;

		if (options.origin) {
			if (typeof options.origin[0] == 'number')
				options.origin[0] *= devicePixelRatio;
			if (typeof options.origin[1] == 'number')
				options.origin[1] *= devicePixelRatio;
		}

		if (!('weightFactor' in options)) {
			options.weightFactor = 1;
		}
		if (typeof options.weightFactor == 'function') {
			var origWeightFactor = options.weightFactor;
			options.weightFactor =
			function weightFactorDevicePixelRatioWrap() {
				return origWeightFactor.apply(this, arguments) * devicePixelRatio;
			};
		} else {
			options.weightFactor *= devicePixelRatio;
		}
	}

	// Put the word list into options
	if ($list.val()) {
		var list = [];
		$.each($list.val().split('\n'), function each(i, line) {
		if (!$.trim(line))
			return;

		var lineArr = line.split(' ');
		var count = parseFloat(lineArr.shift()) || 0;
		list.push([lineArr.join(' '), count]);
		});
		options.list = list;
	}

	// Always manually clean up the html output
	if (!options.clearCanvas) {
		$htmlCanvas.empty();
		$htmlCanvas.css('background-color', options.backgroundColor || '#fff');
	}

	$canvas.addClass('hide');
	$htmlCanvas.addClass('hide');
	
	// All set, call the WordCloud()
	// Order matters here because the HTML canvas might by
	// set to display: none.
	WordCloud([$canvas[0], $htmlCanvas[0]], options);
	};

	var loadExampleData = function loadExampleData(name) {
		var example = examples[name];

		$options.val(example.option || '');
		$list.val(example.list || '');
		$css.val(example.fontCSS || '');
		$width.val(example.width || '');
		$height.val(example.height || '');
	};

	var changeHash = function changeHash(name) {
		if (window.location.hash === '#' + name ||
			(!window.location.hash && !name)) {
			// We got a same hash, call hashChanged() directly
			hashChanged();
		} else {
			// Actually change the hash to invoke hashChanged()
			window.location.hash = '#' + name;
		}
	};

	var hashChanged = function hashChanged() {
		var name = window.location.hash.substr(1);
		if (!name) {
			// If there is no name, run as-is.
			//run();
		} else if (name in examples) {
			// If the name matches one of the example, load it and run it
			//loadExampleData(name);
			//run();
		} else {
			// If the name doesn't match, reset it.
			window.location.replace('#');
		}
	}

	$(window).on('hashchange', hashChanged);

	if (!window.location.hash ||
		!(window.location.hash.substr(1) in examples)) {
		// If the initial hash doesn't match to any of the examples,
		// or it doesn't exist, reset it to #love
		window.location.replace('#love');
	} else {
		hashChanged();
	}
});
