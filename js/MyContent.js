var React=require('react');
var ReactDOM = require("react-dom");

var section=document.getElementById('section');
var MyContent=React.createClass({
	clickHandle:function(e){
		console.log(e.target.getAttribute("data-id"));
		var num = e.target.getAttribute("data-id")*1;
		if(localStorage.getItem("isLogin") == "ok"){
			switch(num){
				case 1:
					var Order=require('./Order');
					ReactDOM.unmountComponentAtNode(section);
					ReactDOM.render(<Order mountType="my"/>,section);
					$("#footer").css('display','none');
					break;
				case 2:
					var Cart=require('./Cart');
					ReactDOM.unmountComponentAtNode(section);
					ReactDOM.render(<Cart mountType="my"/>,section);
					$("#footer").css('display','none');
					break;
				case 3:
					break;
				case 4:
					break;
				case 5:
					break;
				case 6:
					break;
				case 7:
					break;
				case 8:
					var Set = require("./Set");
					ReactDOM.unmountComponentAtNode(section);
					ReactDOM.render(<Set/>,section);
					$("#footer").css('display','none');
					break;
				default:
					break;
			}
		}else{
			var Login = require("./Login");
			ReactDOM.unmountComponentAtNode(section);
			ReactDOM.render(<Login/>,section);
			$("#footer").css('display','none');
		}
		
	},
	render:function(){
		return (
			<div className="containCon">
				<ul className="shoppingInfo">
					<li onClick={this.clickHandle} data-id="1">
						<i className="iconfont" data-id="1">&#xe655;</i>
						<span data-id="1">我的订单</span>
					</li>
					<li onClick={this.clickHandle} data-id="2">
						<i className="iconfont" data-id="2">&#xe63f;</i>
						<span data-id="2">购物车</span>
					</li>
					<li onClick={this.clickHandle} data-id="3">
						<i className="iconfont" data-id="3">&#xe65a;</i>
						<span data-id="3">我的优惠券</span>
					</li>
					<li onClick={this.clickHandle} data-id="4">
						<i className="iconfont" data-id="4">&#xe684;</i>
						<span data-id="4">喜欢的好物</span>
					</li>
					<li onClick={this.clickHandle} data-id="5">
						<i className="iconfont" data-id="5">&#xe685;</i>
						<span data-id="5">设计师入驻</span>
					</li>
					<li></li>
				</ul>
				<div className="say">TA 说</div>
				<ul className="userSet">
					<li onClick={this.clickHandle} data-id="6">
						<i className="iconfont" data-id="6">&#xe643;</i>
						<span data-id="6">已喜欢</span>
						<i className="iconfont" data-id="6">&#xe635;</i>
					</li>
					<li onClick={this.clickHandle} data-id="7">
						<i className="iconfont" data-id="7">&#xe662;</i>
						<span data-id="7">意见反馈</span>
						<i className="iconfont" data-id="7">&#xe635;</i>
					</li>
					<li onClick={this.clickHandle} data-id="8">
						<i className="iconfont" data-id="8">&#xe64b;</i>
						<span data-id="8">设置</span>
						<i className="iconfont" data-id="8">&#xe635;</i>
					</li>
				</ul>
			</div>
		)
	}
});

module.exports=MyContent;