var State = {
	PENDING: 0,
	FULFILLED: 1,
	REJECTED: 2
};

var Aplus = {
	state: State.PENDING,
	changeState: function(state, value) {
		if ( this.state == state ) {
			throw new Error("can't transition to same state: " + state);
		}
		if ( this.state == State.FULFILLED ||
				this.state == State.REJECTED ) {
			throw new Error("can't transition from current state: " + state);
		}
		if ( state == State.FULFILLED &&
				arguments.length < 2 ) {
			throw new Error("transition to fulfilled must have a non null value");
		}
		if ( state == State.REJECTED &&
				arguments.length < 2 ) {
			throw new Error("transition to rejected must have a non null reason");
		}
		this.state = state;
		return this.state;
	}
};