/* global $ */

var FSTools = {
	NAME: 'fs-tools',
	EXTERNAL_ROOT: '//mikegrace.s3.amazonaws.com/sandbox/family-search-tools/',

	init: function() {
		var _this = this;

		_this.setupStylesheet();
		_this.setupControls();
		_this.setupClickHandlers();
	},

	setupStylesheet: function() {
		var _this = this;

		$('head').append('<link rel="stylesheet" href="' + _this.EXTERNAL_ROOT + 'fs-tools.css" type="text/css" />');
	},

	setupControls: function() {
		var _this = this;

		$('#subnav > .links > .tabs').append('<span class="pageTabItem" id="' + _this.NAME + '-spreadsheet"><a class="pageTabLink fs-icon-favorites" data-event="tabClicked" href="javascript:void(0);">Spreadsheet</a><a class="pageSubLink"></a></span>');
		$('#subnav').append('<div id="' + _this.NAME + '-spreadsheet-output"><textarea></textarea></div>');
	},

	setupClickHandlers: function() {
		var _this = this;

		$('#' + _this.NAME + '-spreadsheet').on('click', function() {
			_this.setupSpreadsheet();
		});
	},

	setupSpreadsheet: function() {
		var _this = this;

		$('#' + _this.NAME + '-spreadsheet-output').show();
		_this.copyWatchHandle = setInterval(function() {
			_this.checkForSpreadsheetData();
		}, 500);
	},

	checkForSpreadsheetData: function() {
		var _this = this,
			$card = $('.callout-frame'),
			$name = $card.find('#personCard_nm'),
			data = {};

		if ( !$name.is('.' + _this.NAME + '-copied') && $name.length && $card.find('#personCard_bDt').text().length > 1 ) {
			data.name = $name.text();
			data.id = $card.find('#personCard_pid').text();
			data.birth = $card.find('#personCard_bDt').text();
			data.death = $card.find('#personCard_dDt').text();
			data.birthPlace = $card.find('#personCard_bPlc').text();

			// data.photo = $card.find('.profile-image').css('background-image').replace('url(', '').replace(')', '');

			$name.addClass( _this.NAME + '-copied' );
			$card.prepend('<div id="' + _this.NAME + '-done"></div>');
			_this.addSpreadsheetRow(data);
		}
	},

	addSpreadsheetRow: function(data) {
		var _this = this,
			string = [],
			$textarea = $('#' + _this.NAME + '-spreadsheet-output textarea'),
			previousString = $textarea.val();

		for( var key in data ) {
			string.push( data[key], '\t' );
		}

		string = string.join('') + '\n';

		$('#' + _this.NAME + '-spreadsheet-output textarea').val( previousString + string );
	}
};

FSTools.init();