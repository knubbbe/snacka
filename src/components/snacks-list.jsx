var React = require('react');
var request = require('superagent');
var moment = require('moment');
var socket = require('../lib/socket');

var SnacksList = React.createClass({

	getInitialState: function() {

		socket.on('snack:added', this.snackAdded);

		return {
			items: []
		};
	},

	componentWillMount: function() {
		var that = this;
		request.get('/api/message/list').end(function(err, res) {
			that.setState({ items: res.body || [] });
		});
	},

	snackAdded: function (message) {
		console.log(message);
		this.setState({ items: this.state.items.concat(message) });
	},
	
	renderSnack: function(model) {
		return <Snack key={model._id} className="collection-item avatar" username={model.username} message={model.message} score="0" date={model.date} deleteAction={this.handleDelete.bind(this, model._id)} />
	},

	handleDelete: function(id) {
		var items = this.state.items;
		var index;
		items.map(function(item, i) { if (item._id === id) index = items.indexOf(item); });
		if (index > -1) {
			items.splice(index, 1);
			this.setState({ items: items });
			socket.emit('snack:remove', { id: id });
		}
	},

	render: function() {
		return <ul className="snack-list collection">
					{ (!this.state.items)? this.state.items.map(this.renderSnack) : <li className="empty-list">nothing to see here, keep moving...</li> }
				</ul>
	}
});

var Snack = React.createClass({
	render: function() {
		return (<li key={this.props.key} {...this.props} className={this.props.className}>
					<i className="mdi-action-android blue lighten-3 circle"></i>
					<span className="title">
						{this.props.username}
						<span className="date">{moment(this.props.date).fromNow()}</span>
					</span>
					<p>{this.props.message}</p>
					<span className="score secondary-content"><span className="badge"><i className="mdi-action-assessment"></i> 0</span></span>
					{ (localStorage['username'] === this.props.username)? <span className="delete secondary-content"><i className="mdi-action-delete" onClick={this.props.deleteAction}></i></span> : '' }
				</li>)
	}
});

module.exports = SnacksList;