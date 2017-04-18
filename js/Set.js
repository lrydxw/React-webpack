var React=require('react');
var ReactDOM = require("react-dom");
var My = require("./My");

var toast = new Toast();
var section=document.getElementById('section');
var Set=React.createClass({
	backUser:function(){
		ReactDOM.unmountComponentAtNode(section);
		ReactDOM.render(<My/>,section);
		$("#footer").css('display','flex');
	},
	toExit:function(){
		localStorage.setItem("isLogin","error");
		toast.show("已退出登录，1秒后返回用户中心",1000);
		setTimeout(function(){
			ReactDOM.unmountComponentAtNode(section);
			ReactDOM.render(<My/>,section);
			$("#footer").css('display','flex');
		},1000);
	},
	render:function(){
		return (
			<div id="setCon">
				<ul className="setHeader">
					<li onClick={this.backUser}>
						<span className="iconfont">&#xe6cc;</span>
					</li>
					<li>
						<span>设置</span>
					</li>
					<li></li>
				</ul>
				<div className="setContent">
					<ul className="userSet">
						<li onClick={this.clickHandle} data-id="6">
							<span data-id="6">我的个人信息</span>
							<i className="iconfont" data-id="6">&#xe635;</i>
						</li>
						<li onClick={this.clickHandle} data-id="7">
							<span data-id="7">收货地址</span>
							<i className="iconfont" data-id="7">&#xe635;</i>
						</li>
						<li onClick={this.clickHandle} data-id="8">
							<span data-id="8">清除缓存</span>
							<i className="iconfont" data-id="8">&#xe635;</i>
						</li>
						<li onClick={this.clickHandle} data-id="9">
							<span data-id="9">关于想去</span>
							<i className="iconfont" data-id="9">&#xe635;</i>
						</li>
					</ul>
					<p>加想去君微信:xqkefu2016(点击复制),成为本君好友,超多朋友福利,带你认识更多的设计师哦~~</p>
					<button className="toExit" onClick={this.toExit}>退出登录</button>
				</div>
			</div>
		)
	}
});
module.exports=Set;