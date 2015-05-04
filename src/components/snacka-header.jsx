var React = require('react');
var Link = require('react-router-component').Link

var Header = React.createClass({
	render: function() {
		return <nav>
			<div className="nav-wrapper">
				<div className="container">
					<Link href="/" className="snacka-logo">snacka</Link>
					<ul className="right">
						<li><Link href="/login">login</Link></li>
					</ul>
				</div>
			</div>
		</nav>
	}
});

module.exports = Header;