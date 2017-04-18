var React=require('react');
var ReactDOM=require('react-dom');

var MainFoot=require('./js/MainFoot');
var Title=require('./js/Title');
var Main=React.createClass({
	render:function(){
		return (
			<div>
				<section id="section"></section>
				<footer id="footer"><MainFoot/></footer>
			</div>
		)
	}
});

ReactDOM.render(<Main/>,document.getElementById("app"));
ReactDOM.render(<Title/>,document.getElementById("section"));
