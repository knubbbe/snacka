var React = require('react');
var socket = require('../lib/socket');

var AddSnackForm = React.createClass({
	
	getInitialState: function() {

		socket.on('snack:added', this.clearInput);

		return {
			username: localStorage['username'] || '',
			message: ''
		};
	},
	
	handleChange: function(event) {
		this.setState({
			username: localStorage['username'],
			message: event.target.value
		});
	},
	
	addSnack: function(event) {
		event.preventDefault();
		var _username = this.state.username;
		var _message = this.state.message;
		if (_message.length < 3) {
			alert('Too short');
			return;
		}
		socket.emit('snack:add', {
			username: _username,
			message: _message,
			score: 0,
			date: new Date(),
		});
	},

	clearInput: function() {
		this.setState({ message: '' });
	},

	render: function() {
		return <form className="row" onSubmit={this.addSnack}>
					<div className="input-field col s12">
						<input type="text" id="message" name="message" value={this.state.message} placeholder="write something.." onChange={this.handleChange} />
					</div>
				</form>
	}
});

module.exports = AddSnackForm;