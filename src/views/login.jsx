var React = require('react');
var request = require('superagent');

var login = React.createClass({

	getInitialState: function() {
		return {
			username: '',
			password: ''
		}
	},

	handleUsername: function(e) {
		this.setState({ username: e.target.value });
	},

	handlePassword: function(e) {
		this.setState({ password: e.target.value });
	},

	handleRegister: function() {
		var _username = this.state.username;
		var _password = this.state.password;
		if (_username.length < 2) {
			alert('too short username');
			return;
		}
		if (_password.length < 3) {
			alert('too short password');
			return;
		}

		request.post('/api/user/create')
				.send({ username: _username, password: _password })
				.end(function(data) {
					console.log('reques cb: ', data);
				});
	},

	render: function() {
		return <div className="login">
					<div className="form row">
						<h1>Login/Register</h1>
						<div className="row">
							<div className="col s12">
								<input type="text" ref="username" placeholder="Username" onChange={this.handleUsername} />
							</div>
						</div>
						<div className="row">
							<div className="col s12">
								<input type="password" ref="password" placeholder="password" onChange={this.handlePassword} />
							</div>
						</div>
						<div className="row">
							<div className="col s12">
								<button className="btn left" onClick={this.handleRegister} name="action">Register <i className="mdi-action-account-circle right"></i></button>
								<button className="btn right" onClick={this.handleLogin} name="action">Login <i className="mdi-content-send right"></i></button>
							</div>
						</div>
					</div>
				</div>
	}

});

module.exports = login;