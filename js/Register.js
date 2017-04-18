var React=require('react');
var ReactDOM = require("react-dom");
var toast = new Toast();

var section=document.getElementById('section');

var Register=React.createClass({
	//注册中的返回按钮只能返回到登录界面
	backLogin:function(){
		var Login = require("./Login");
		ReactDOM.unmountComponentAtNode(section);
		ReactDOM.render(<Login/>,section);
	},
	registerClick:function(){
		var userName = $("#username").val();
		var password1 = $("#password1").val();
		var password2 = $("#password2").val();
		var reg1 = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var reg2 = /^1[3578]\d{9}$/;
		var reg3 = /^[a-zA-Z0-9]{6,12}$/;
		if(!((reg1.test(userName))||(reg2.test(userName)))){
			toast.show("用户名格式验证失败",1500);
		}else if(!(reg3.test(password1))){
			toast.show("密码格式验证失败",1500);
		}else if(!(password1 == password2)){
			toast.show("两次输入的密码不一致",1500);
		}else{
			toast.show("注册信息验证成功",1500);
			setTimeout(function(){
				var Login = require("./Login");
				ReactDOM.unmountComponentAtNode(section);
				ReactDOM.render(<Login/>,section);
			},1500);
			//把注册信息保存到本地
			var arr = [];
			var userInfo = {
				"username":userName,
				"password":password1
			}
			if(localStorage.getItem("register")){
				arr = JSON.parse(localStorage.getItem("register"));
				arr.push(userInfo);
			}else{
				arr.push(userInfo);
			}
			localStorage.setItem("register",JSON.stringify(arr));
		}
	},
	render:function(){
		return (
			<div id="RegisterCon">
				<ul className="RegisterHeader">
					<li onClick={this.backLogin}>
						<span className="iconfont">&#xe605;</span>
					</li>
					<li>
						<span>注册</span>
					</li>
					<li>
						<span></span>
					</li>
				</ul>
				<div className="RegisterContent">
					<div className="RegisterInfo">
						<input type="text" id="username" placeholder="请输入手机号或邮箱" />
						<input type="password" id="password1" placeholder="请输入密码" />
						<input type="password" id="password2" placeholder="请再次输入密码" />
					</div>
					<button className="toRegister" onClick={this.registerClick}>注册</button>
				</div>
			</div>
		)
	}
});

module.exports=Register;