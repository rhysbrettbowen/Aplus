// resolve all given promises to a single promise
Aplus.pool = function() {

	// get promises
	var promises = Array.slice.call(arguments, 0);
	var state = 1;
	var values = new Array(promises.length);
	var toGo = promises.length;

	// promise to return
	var promise = Aplus();

	// whenever a promise completes
	var checkFinished = function() {
		// check if all the promises have returned
		if (toGo) {
			return;
		}
		// set the state with all values if all are complete
		promise.changeState(state, values);
	};

	// whenever a promise finishes check to see if they're all finished
	for (var i = 0; i < promises.length; i++) {
		(function(index) {
			promises[index].then(function(value) {
				// on success
				values[index] = value;
				toGo--;
				checkFinished();
			}, function(value) {
				// on error
				values[index] = value;
				toGo--;
				// set error state
				state = 2;
				checkFinished();
			});
		})(i);
	};

	// promise at the end
	return promise;
};

// return the value of the first succesful promise
Aplus.first = function() {

	// get all promises
	var promises = Array.slice.call(arguments, 0);

	// promise to return
	var promise = Aplus();

	// if all promises error out then we want to return an error
	Aplus.pool.apply(Aplus, promises).then(undefined, function(value) {
		promise.reject(value);
	});

	// when there is a success we want to fulfill the promise
	var success = function(value) {
		promise.fulfill(value);
	};

	// listen for success on all promises
	for (var i = 0; i < promises.length; i++) {
		promises[i].then(success);
	}

	return promise;
};

// take a callback function and change it to return a promise
Aplus.toPromise = function(fn) {
	return function() {

		// promise to return
		var promise = Aplus();

		//on error we want to reject the promise
		var errorFn = function(data) {
			promise.reject(data);
		};
		// fulfill on success
		var successFn = function(data) {
			promise.fulfill(data);
		};

		// run original function with the error and success functions
		// that will set the promise state when done
		fn.apply(this,
			[errorFn, successFn].concat(Array.slice.call(arguments, 0)));

		return promise;
	};
};
