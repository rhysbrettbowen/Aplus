var State = {
	PENDING: 0,
	FULFILLED: 1,
	REJECTED: 2
};

var Aplus = {
	state: State.PENDING,
	changeState: function(state, value) {

		// catch changing to same state (perhaps trying to change the value)
		if ( this.state == state ) {
			throw new Error("can't transition to same state: " + state);
		}

		// trying to change out of fulfilled or rejected
		if ( this.state == State.FULFILLED ||
				this.state == State.REJECTED ) {
			throw new Error("can't transition from current state: " + state);
		}

		// if second argument isn't given at all (passing undefined allowed)
		if ( state == State.FULFILLED &&
				arguments.length < 2 ) {
			throw new Error("transition to fulfilled must have a non null value");
		}

		// if a null reason is passed in
		if ( state == State.REJECTED &&
				value == null ) {
			throw new Error("transition to rejected must have a non null reason");
		}

		//change state
		this.state = state;
		return this.state;
	}
};
