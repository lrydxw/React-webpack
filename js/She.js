var React=require('react');
var ReactDOM = require("react-dom");
var SheContent = require("./SheContent");
var SheContentList = require("./SheContentList");
var toast = new Toast();

var section=document.getElementById('section');
var sheDetial=document.getElementById('sheDetial');
var She=React.createClass({
	getInitialState:function(){
		return {
			activeIndex : 0
		}
	},
	changeCon:function(e){
		console.log(e.target.getAttribute("data-id"));
		var currentIndex = e.target.getAttribute("data-id")*1;
		this.setState({
			activeIndex:currentIndex
		});
	},
	render:function(){
		if(this.state.activeIndex == 0){
			return (
				<div id="sheCon">
					<ul className="sheHeader">
						<li onClick={this.toUser}>
							<span className="iconfont">&#xe611;</span>
						</li>
						<li onClick={this.changeCon} data-id="0" >
							<span data-id="0" className={this.state.activeIndex == 0? 'active':''}>发现</span>
						</li>
						<li onClick={this.changeCon} data-id="1">
							<span data-id="1" className={this.state.activeIndex == 1? 'active':''}>关注</span>
						</li>
						<li>
							<span className="iconfont">&#xe649;</span>
						</li>
					</ul>
					<div id="sheDetial">
						<SheContent />
					</div>
				</div>
			)
		}else{
			return (
				<div id="sheCon">
					<ul className="sheHeader">
						<li onClick={this.toUser}>
							<span className="iconfont">&#xe611;</span>
						</li>
						<li onClick={this.changeCon} data-id="0" >
							<span data-id="0" className={this.state.activeIndex == 0? 'active':''}>发现</span>
						</li>
						<li onClick={this.changeCon} data-id="1" >
							<span data-id="1" className={this.state.activeIndex == 1? 'active':''}>关注</span>
						</li>
						<li>
							<span className="iconfont">&#xe649;</span>
						</li>
					</ul>
					<div id="sheDetial">
						<SheContentList />
					</div>
				</div>
			)
		}
		
	}
});
module.exports=She;