var React=require('react');
var ReactDOM = require("react-dom");
var MainFoot=React.createClass({
	getInitialState:function(){
		return {
			activeIndex : 0
		}
	},
	clickHandle:function(e){
		if(e.target.tagName == "LI"){
			var currentIndex=e.target.getAttribute('data-id')*1;
		}else if(e.target.tagName == "SPAN"){
			var currentIndex=e.target.parentNode.getAttribute('data-id')*1;
		}else if(e.target.tagName == "I"){
			var currentIndex=e.target.parentNode.getAttribute('data-id')*1;
		}
		this.setState({
			activeIndex:currentIndex
		});
		var section=document.getElementById('section');
		switch(currentIndex){
			case 0:
				var Title=require('./Title');
				ReactDOM.unmountComponentAtNode(section);
				ReactDOM.render(<Title/>,section);
				break;
			case 1:
				var Teacher=require('./Teacher');
				ReactDOM.unmountComponentAtNode(section);
				ReactDOM.render(<Teacher/>,section);
				break;
			case 2:
				var She=require('./She');
				ReactDOM.unmountComponentAtNode(section);
				ReactDOM.render(<She/>,section);
				break;
			case 3:
				var Walk=require('./Walk');
				ReactDOM.unmountComponentAtNode(section);
				ReactDOM.render(<Walk/>,section);
				break;
			case 4:
				var My=require('./My');
				ReactDOM.unmountComponentAtNode(section);
				ReactDOM.render(<My/>,section);
				break;
			default:
				break;
		}
	},
	render:function(){
		return (
			<ul>
				<li className={this.state.activeIndex == 0? 'active':''} onClick={this.clickHandle} data-id="0">
					<i className="iconfont log log1">&#xe672;</i>
					<span>专题</span>
				</li>
				<li className={this.state.activeIndex == 1? 'active':''} onClick={this.clickHandle} data-id="1">
					<i className="iconfont log">&#xe66a;</i>
					<span>设计师</span>
				</li>
				<li className={this.state.activeIndex == 2? 'active':''} onClick={this.clickHandle} data-id="2">
					<i className="iconfont log">&#xe65f;</i>
					<span>TA说</span>
				</li>
				<li className={this.state.activeIndex == 3? 'active':''} onClick={this.clickHandle} data-id="3">
					<i className="iconfont log log2">&#xe663;</i>
					<span>逛</span>
				</li>
				<li className={this.state.activeIndex == 4? 'active':''} onClick={this.clickHandle} data-id="4">
					<i className="iconfont log">&#xe677;</i>
					<span>我的</span>
				</li>
			</ul>
		)
	}
})
module.exports=MainFoot;