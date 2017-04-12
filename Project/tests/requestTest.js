
var expect = require("chai").expect;
var converter = require("../request.js");
var jsdom = require('jsdom');

describe("Just test", function(){
	jsdom();
	before(function(){
		
		$ = global.jQuery = require('jquery')(window);
	})

	it("testing", function(){
		converter.getArtist();
	});
});