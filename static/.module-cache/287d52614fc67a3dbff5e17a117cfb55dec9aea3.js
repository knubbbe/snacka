var React = require('react');
var io = require('socket.io');

var Tweet = React.createClass({displayName: "Tweet",
	render: function() {
		return (
			React.createElement("li", null, this.props.text)
		)
	}
});

var TweetList = React.createClass({displayName: "TweetList",
	render: function() {
		var tweets = this.props.data.map(function(tweet) {
			return ;
		});
		return (
			React.createElement("div", null, 
				React.createElement("ul", null, 
					tweets
				)
			)
		)
	}
});

var TweetBox = React.createClass({displayName: "TweetBox",
	addTweet: function(tweet) {
		var tweets = this.state.data;
		var newTweets = tweets.concat([tweet]);

		if(newTweets.length > 15) {
			newTweets.splice(0, 1);
		}
		this.setState({data: newTweets});
	},
	getInitialState: function() {
		return {user: 'Guest', message: ''};
	},
	componentWillMount: function() {
		var socket = io.connect();
		var self = this;

		socket.on('info', function (data) {
			self.addTweet(data.tweet);
		});
	},
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("h1", null, "Hello"), 
				React.createElement(TweetList, {data: this.state.data})
			)
		)
	}
});

React.render(React.createElement(TweetBox, null), document.body);