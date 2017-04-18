var React=require('react');
var ReactDOM = require("react-dom");
var toast = new Toast();

var section=document.getElementById('section');
var footer =document.getElementById('footer');

var MyHeader=React.createClass({
	getInitialState:function(){
		return {
			len:0
		}
	},
	clickToLogin:function(){
		var Login = require("./Login");
		ReactDOM.unmountComponentAtNode(section);
		ReactDOM.render(<Login/>,section);
		$("#footer").css('display','none');
	},
	care:function(){
		if(localStorage.getItem("isLogin") == "ok"){
			var Care = require("./Care");
			ReactDOM.unmountComponentAtNode(section);
			ReactDOM.render(<Care/>,section);
			$("#footer").css('display','none');
		}else{
			var Login = require("./Login");
			ReactDOM.unmountComponentAtNode(section);
			ReactDOM.render(<Login/>,section);
			$("#footer").css('display','none');
		}
	},
	componentWillMount:function(){
		if((localStorage.getItem("care") != null)&&(localStorage.getItem("care") != "[]")){
			var arr = JSON.parse(localStorage.getItem("care"));
			var len = arr.length;
			console.log("len",len);
			this.setState({
				len:len
			})
		}
		
	},
	render:function(){
		return (
			<div className="headCon">
				<header>
					<span className="iconfont">&#xe665;</span>
				</header>
				<section className="loginBefore">
					<p>在这里,找到属于你的不一样</p>
					<div>
						<button onClick={this.clickToLogin}>登录/注册</button>
					</div>
				</section>
				<section className="loginAfter">
					<p>
						<i className="iconfont"></i>
						<span>想去菌c7gmqi</span>
					</p>
					<div className="div_login">
						犹抱琵琶半遮面,千呼万唤始出来...
					</div>
				</section>
				<footer>
					<p>
						<span>{this.state.len}</span>
						<span onClick={this.care}>关注</span>
					</p>
					<p>
						<span>0</span>
						<span>粉丝</span>
					</p>
					<p>编辑资料</p>
				</footer>
			</div>
		)
	}
});
module.exports=MyHeader;