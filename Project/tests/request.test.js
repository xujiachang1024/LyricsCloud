
var expect = require("chai").expect;
var jsdom = require('jsdom');
var assert = require("chai").assert;
//	var $ = require("jquery");
var document = jsdom.jsdom("");
var window = document.defaultView;
global.window = window;
global.$ = require('jquery');
global.$.ajax = require('jquery');

describe("GetArtist", function(){
	it("be Able To Call With Exist Name", function(){
		var getArtistForTest = require("./getArtistForTest.js");
		getArtistForTest("ColdPlay");
	});
	it("be Able To Call With Non Exist Name", function(){
		var getArtistForTest = require("./getArtistForTest.js");
		getArtistForTest("aasdf");
	});
	it("be Able To Check With Exist Name", function(){
		var getArtist = require("./getArtistForTest.js");
		getArtist("ColdPlay");
		assert.isDefined(getArtist=>getID, "At least one searching result");
	});
	it("be Able To Check With Non Exist Name", function(){
		var getArtist = require("./getArtistForTest.js");
		getArtist("aasdf");
		assert.isUndefined(getArtist("assdf"), "No result");
	});
});

describe("GetAlbums", function(){
	it("be Able To Get Tracks By Artist Id", function(){
		var getAllAlbums = require("./getAllAlbumForTest.js");
		var track_ids = getAllAlbums("56083");
		assert.isArray(track_ids);
		assert.equal(0, track_ids.length);
	});


	it("Not be Able To Get Tracks By False Artist Id", function(){
		var getAllAlbums = require("./getAllAlbumForTest.js");
		var track_ids = getAllAlbums("00000");
		assert.isArray(track_ids);
		assert.equal(0, track_ids.length);
	});


	it("be Able To Get Correct Number of Tracks By Artist Id", function(){
		var getAllAlbums = require("./getAllAlbumForTest.js");
		var track_ids = getAllAlbums("56082");
		assert.isArray(track_ids);
		assert.equal(50, track_ids.length);
	});


	it("be Able To Given Zero of By Artist who has no Songs", function(){
		var getAllAlbums = require("./getAllAlbumForTest.js");
		var track_ids = getAllAlbums("56083");
		assert.isArray(track_ids);
		assert.equal(0, track_ids.length);
	});
});

describe("GetTracks", function(){
	it("be Able To Get All Tracks By AlbumId with lyrics", function(){
		var getTracks = require("./getTracksForTest.js");
		var number = getTracks(["13801029"], 1);
		assert.equal(11, number);
	});

	it("be Able To Get All Tracks By AlbumId without lyrics", function(){
		var getTracks = require("./getTracksForTest.js");
		var number = getTracks(["344265"], 1);
		assert.notEqual(0, number);
	});
});


describe("GetLyrics", function(){
	it("be Able To Get Lyrics From Track ID if English", function(){
		var getLyrics = require("./getLyricsForTest.js");
		var lyrics = getLyrics(["30645728"], 1);
		assert.isString(lyrics);
	});

	it("be Able To Get Lyrics From Track ID if not English", function(){
		var getLyrics = require("./getLyricsForTest.js");
		var lyrics = getLyrics(["30645743"], 1);
		assert.equal('', lyrics);
	});
});


describe("GetSongList", function(){
	it("be Able To Get Song List By Given song list and artists", function(){
		var getList = require("./getListForTest.js");
		var list = getList(["30645728"], 1);
		assert.isArray(list);
	});
});

