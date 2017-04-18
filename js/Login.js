var React=require('react');
var ReactDOM = require("react-dom");
var toast = new Toast();

var section=document.getElementById('section');

var Login=React.createClass({
	toRegister:function(){
		var Register = require("./Register");
		ReactDOM.unmountComponentAtNode(section);
		ReactDOM.render(<Register/>,section);
	},
	toLogin:function(){
		console.log("fromName",this.props.fromName);
		var that = this;
		var username = $("#username").val();
		var password = $("#password").val();
		if((localStorage.getItem("register") != null) &&(localStorage.getItem("register") != "[]")){
			var register = JSON.parse(localStorage.getItem("register"));
			var len = register.length;
			console.log(len);
			var flag = true;
			for(var i=0;i<len;i++){
				if((register[i].username == username)&&(register[i].password == password)){
					toast.show("登录成功",1500);
					//console.log("登录之后",this.props.fromName);
					flag = false;
					localStorage.setItem("isLogin","ok");
						//console.log("登录之后",that.props.fromName);
						if(this.props.fromName == undefined){
							var My = require("./My");
							ReactDOM.unmountComponentAtNode(section);
							ReactDOM.render(<My/>,section);
						}else if(that.props.fromName == "shopping"){
							var Shopping=require('./Shopping');
							ReactDOM.unmountComponentAtNode(section);
							if(that.props.currentId == "10"){
								ReactDOM.render(<Shopping num={that.props.num} nm={that.props.nm} currentId={that.props.currentId}/> ,section);
							}else{
								ReactDOM.render(<Shopping currentId={that.props.currentId} currentName={that.props.currentName}/> ,section);
							}
						}else if(that.props.fromName == "sheContent"){
							var She = require("./She");
							ReactDOM.unmountComponentAtNode(section);
							ReactDOM.render(<She activeIndex={this.props.activeIndex}/>,section);
						}else if(that.props.fromName == "sheContentList"){
							var She = require("./She");
							ReactDOM.unmountComponentAtNode(section);
							ReactDOM.render(<She activeIndex={this.props.activeIndex}/>,section);
						}
						$("#footer").css('display','flex');
					break;
				}
			}
			if(flag){
				toast.show("用户名和密码不符",1500);
			}
		}else{
			toast.show("您还没有注册呢",1500);
		}
		
	},
	toUser:function(){
		//console.log("fromName",this.props.fromName);
		if(this.props.fromName == undefined){
			var My=require('./My');
			ReactDOM.unmountComponentAtNode(section);
			ReactDOM.render(<My/>,section);
			$("#footer").css("display","flex");
		}else if(this.props.fromName == "shopping"){
			var Shopping=require('./Shopping');
			ReactDOM.unmountComponentAtNode(section);
			if(this.props.currentId == "10"){
				ReactDOM.render(<Shopping num={this.props.num} nm={this.props.nm} currentId={this.props.currentId}/>,section);
			}else{
				ReactDOM.render(<Shopping currentId={this.props.currentId} currentName={this.props.currentName}/> ,section);
			}
		}else if(this.props.fromName == "sheContentList"){
			var She = require("./She");
			ReactDOM.unmountComponentAtNode(section);
			ReactDOM.render(<She activeIndex={this.props.activeIndex}/>,section);
			$("#footer").css('display','flex');
		}else if(this.props.fromName == "sheContent"){
			var She = require("./She");
			ReactDOM.unmountComponentAtNode(section);
			ReactDOM.render(<She activeIndex={this.props.activeIndex}/>,section);
			$("#footer").css('display','flex');
		}
		
	},
	render:function(){
		return (
			<div id="loginCon">
				<ul className="loginHeader">
					<li onClick={this.toUser}>
						<span className="iconfont">&#xe6cc;</span>
					</li>
					<li>
						<span>登录</span>
					</li>
					<li onClick={this.toRegister}>
						<span>注册</span>
					</li>
				</ul>
				<div className="loginContent">
					<div className="loginInfo">
						<input type="text" id="username" placeholder="请输入手机号或邮箱" />
						<input type="password" id="password" placeholder="请输入登录密码" />
					</div>
					<button className="toLogin" onClick={this.toLogin}>登录</button>
				</div>
			</div>
		)
	}
});

module.exports=Login;