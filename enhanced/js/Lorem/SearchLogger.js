
Lorem.SearchLogger = function($node) {
	this.node = $node;

	Lorem.subscribe('Form.Search.submit', this.handleSubmit.bind(this));
	Lorem.subscribe('Form.Search.results', this.handleOk.bind(this));
	Lorem.subscribe('Form.Search.error', this.handleError.bind(this));
};

Lorem.SearchLogger.prototype.handleSubmit = function(q, rqid) {
	this.node.append('<li class="loading" data-rqid="'+ rqid +'"><a href="#">' + q + '</a></li>');
};

Lorem.SearchLogger.prototype.handleOk = function(results, rqid) {
	this.node.find('[data-rqid="' + rqid + '"]')
		.removeClass('loading')
		.removeClass('error')
		.addClass('ok');
};

Lorem.SearchLogger.prototype.handleError = function(rqid) {
	this.node.find('[data-rqid="' + rqid + '"]')
		.removeClass('loading')
		.removeClass('ok')
		.addClass('error');
};
