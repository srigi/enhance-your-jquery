$(function(){

	var uniqId = function() {
		return Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17);
	};

	var $searchForm = $('#searchForm');
	var $searchResults = $('#searchResults');
	var $searchLogger = $('#searchLogger');


	$searchForm.submit(function(ev){
		ev.preventDefault();

		var rqid = uniqId();
		var q = $searchForm.find('[name="q"]').val();

		$searchLogger.append('<li class="loading" data-rqid="'+ rqid +'"><a href="#">' + q + '</a></li>');
		$.ajax({
			url		: 'http://query.yahooapis.com/v1/public/yql',
			type	: 'POST',
			dataType: 'json',
			data	: {
				callback	: '',
				format		: 'json',
				env			: 'store://datatables.org/alltableswithkeys',
				q			: 'SELECT title, href FROM digg.search.search WHERE query="' + q + '" LIMIT 5'
			},

			beforeSend: function($xhr, settings) {
				$xhr.rqid = rqid;
			},

			success: function(data, state, $xhr) {
				var html = '';

				$searchLogger.find('[data-rqid="' + $xhr.rqid + '"]')
				 .removeClass('loading')
				 .removeClass('error')
				 .addClass('ok');

				$.each(data.query.results.stories, function(idx, obj){
					html += '<li><a href="' + obj.href + '">' + obj.title + '</a></li>';
				});

				$searchResults.html(html);
			},
			error: function(xhr){
				$searchLogger.find('[data-rqid="' + $xhr.rqid + '"')
				 .removeClass('loading')
				 .removeClass('ok')
				 .addClass('error');
			}
		});
	});

});
