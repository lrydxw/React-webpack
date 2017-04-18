var React=require('react');
var ReactDOM=require('react-dom');
var Business = require("./Business");
var Style = require("./Style");
var Teacher=React.createClass({
	getInitialState:function(){
		return {
			arrStyle:"",
			activeIndex : 0
		}
	},
	tabHandle:function(evt){
		var currentIndex=evt.target.getAttribute("data-id")*1;
//		console.log(currentIndex);
//		if(currentIndex==0){
//			
//			ReactDOM.unmountComponentAtNode(document.getElementById("proList"));
//			ReactDOM.render(<Business/>,document.getElementById("proList"));
//		}else if(currentIndex==1){
//			var Style = require("./Style");
//			ReactDOM.unmountComponentAtNode(document.getElementById("proList"));
//			ReactDOM.render(<Style/>,document.getElementById("proList"));
//		}
		this.setState({
			activeIndex:currentIndex
		});
	},
	brandText:function(){
		var Brand = require("./Brand");
		ReactDOM.unmountComponentAtNode(document.getElementById("section"));
		ReactDOM.render(<Brand mountType="teacher"/>,document.getElementById("section"));
		$("#footer").css('display','none');
	},
	render:function(){
		if(this.state.activeIndex== 0 ){
			return (
				<div id="designerContent">
					<div className="designerTop" onClick={this.brandText}>
						<img src="http://xqtopic.xiangqu.com/FuRYyjFKxCNv-xW5Twl_qiyZTfud?imageView2/2/w/640/q/90/format/jpg/960x645/"/>
						<div className="designerText">
							<p>南拾壹 | 南拾壹</p>
							<p>品牌创始人</p>
							<p>美食</p>
						</div>
					</div>
					<div className="designerTab">
						<ul className="designTab_nav">
							<li className={this.state.activeIndex==0?'active':''} data-id="0" onClick={this.tabHandle}>行业</li>
							<li className={this.state.activeIndex==1?'active':''} data-id="1" onClick={this.tabHandle}>风格</li>
						</ul>
						<div className="designTab_content">
							<ul id="proList">
								<Business/>
							</ul>
						</div>
					</div>
				</div>
			)
		}else if(this.state.activeIndex== 1){
			return (
				<div id="designerContent">
					<div className="designerTop" onClick={this.brandText}>
						<img src="http://xqtopic.xiangqu.com/FuRYyjFKxCNv-xW5Twl_qiyZTfud?imageView2/2/w/640/q/90/format/jpg/960x645/"/>
						<div className="designerText">
							<p>南拾壹 | 南拾壹</p>
							<p>品牌创始人</p>
							<p>美食</p>
						</div>
					</div>
					<div className="designerTab">
						<ul className="designTab_nav">
							<li className={this.state.activeIndex==0?'active':''} data-id="0" onClick={this.tabHandle}>行业</li>
							<li className={this.state.activeIndex==1?'active':''} data-id="1" onClick={this.tabHandle}>风格</li>
						</ul>
						<div className="designTab_content">
							<ul id="proList">
								<Style/>
							</ul>
						</div>
					</div>
				</div>
			)
		}
		
	}
	
});

module.exports=Teacher;