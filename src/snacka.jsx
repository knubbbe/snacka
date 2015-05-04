var React = require('react');
var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;
var NotFound = Router.NotFound;

var request = require('superagent');
var socket = require('./lib/socket');


var NotFoundPage = require('./views/notfound.jsx');
var Home = require('./views/home.jsx');
var Login = require('./views/login.jsx');
var Header = require('./components/snacka-header.jsx');

var Layout = React.createClass({

	componentDidMount: function() {
		socket.on('user:username', function(data) {
			if (!localStorage['username']) localStorage['username'] = data;
		});
	},

	render: function() {
		return <div className="snacka">
					<Header />
					<div className="container">
						<Locations>
							<Location path="/" handler={Home} />
							<Location path="/login" handler={Login} />
							<NotFound handler={NotFoundPage} />
						</Locations>
					</div>
				</div>
	}
});


React.render(<Layout />, document.body);