;(function($, undefined){

	var serachForm = new Lorem.Form.Search($('#searchForm'));
	var serachLogger = new Lorem.SearchLogger($('#searchLogger'));
	var serachResults = new Lorem.SearchResults($('#searchResults'), $);

}).call(Lorem, jQuery);
