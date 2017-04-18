var React=require('react');
var ReactDOM = require("react-dom");
var MyHeader = require("./MyHeader");
var MyContent = require("./MyContent");

var My=React.createClass({
	render:function(){
		return (
			<div id="My">
				<div id="MyHeader"><MyHeader/></div>
				<div id="MyContent"><MyContent /></div>
			</div>
		)
	},
	componentDidMount:function(){
		console.log(localStorage.getItem("isLogin"));
		if(localStorage.getItem("isLogin") == "ok"){
			$(".loginAfter").show();
			$(".loginBefore").hide();
		}else{
			$(".loginAfter").hide();
			$(".loginBefore").show();
		}
	}
});
module.exports=My;