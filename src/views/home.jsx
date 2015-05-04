var React = require('react');

var AddSnackForm = require('../components/add-snack-form.jsx');
var SnacksList = require('../components/snacks-list.jsx');

var home = React.createClass({

	render: function() {
		return <div className="home">
					<AddSnackForm />
					<SnacksList />
				</div>
	}

});

module.exports = home;