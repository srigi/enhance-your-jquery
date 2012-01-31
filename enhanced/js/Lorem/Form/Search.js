
Lorem.Form = Lorem.Form || {};



Lorem.Form.Search = function($node) {
	this.node = $node;

	this.node.submit(this.validate.bind(this));
};


Lorem.Form.Search.prototype.validate = function(ev) {
	ev.preventDefault();
	var q = this.node.find('[name="q"]').val();

	// TODO validate
	this.submit(q);
}

Lorem.Form.Search.prototype.submit = function(q) {
	var rqid = Lorem.uniqId();

	Lorem.request({
			url: 'http://query.yahooapis.com/v1/public/yql',
			type: 'POST',
			data: {
				callback	: '',
				format		: 'json',
				env			: 'store://datatables.org/alltableswithkeys',
				q			: 'SELECT title, href FROM digg.search.search WHERE query="' + q + '" LIMIT 5'
			}
		},
		function success(data, state) {
			Lorem.publish('Form.Search.results', [data.query.results.stories, rqid]);
		},
		function error(state) {
			Lorem.publish('Form.Search.error', [rqid]);
		}
	);

	Lorem.publish('Form.Search.submit', [q, rqid]);
}