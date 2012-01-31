if (!Function.prototype.bind) {
	Function.prototype.bind = function(oThis) {
		if (typeof this !== 'function') {
			throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
		}

		var	aArgs = Array.prototype.slice.call(arguments, 1),
			fToBind = this,
			fNOP = function() {},
			fBound = function() {
				return fToBind.apply(
					(this instanceof fNOP) ? this : oThis || window,
					aArgs.concat(Array.prototype.slice.call(arguments))
				);
			};

		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();

		return fBound;
	};
}



var Lorem = Lorem || {};

Lorem.uniqId = function() {
	return Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17);
};

Lorem.request = function(params, cbSuccess, cbError) {
	$.ajax({
		url		: params.url,
		type	: params.type,
		data	: params.data,
		dataType: 'json',

		success: function(data, state, $xhr) {
			cbSuccess(data, state);
		},
		error: function(xhr, state){
			cbError(state);
		}
	});
};

Lorem.publish = function(topic, args) {
	$.publish(topic, args);
};
Lorem.subscribe = function(topic, cb) {
	$.subscribe(topic, cb);
};
