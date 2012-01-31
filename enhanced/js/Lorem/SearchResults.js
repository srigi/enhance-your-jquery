
Lorem.SearchResults = function($node, jQuery) {
	this.node = $node;
	this.jQuery = jQuery;

	Lorem.subscribe('Form.Search.results', this.render.bind(this));
};

Lorem.SearchResults.prototype.render = function(results) {
	var html = '';

	this.jQuery.each(results, function(idx, obj){
		html += '<li><a href="' + obj.href + '">' + obj.title + '</a></li>';
	});

	this.node.html(html);
};
