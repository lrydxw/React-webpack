var React=require('react');
var ReactDOM=require('react-dom');
var Brand=React.createClass({
	getInitialState:function(){
//		console.log('mountType',this.props.mountType);
		return {
			mountType:this.props.mountType
		}
	},
	back:function(){
		var mountType = this.props.mountType;
		console.log(mountType);
		ReactDOM.unmountComponentAtNode(document.getElementById("section"));
		if(mountType == "teacher"){
			$("#footer").css('display','flex');
			var Teacher = require("./Teacher");
			ReactDOM.render(<Teacher/>,document.getElementById("section"));
		
		}else if(mountType == "list"){
			var List = require("./List");
			ReactDOM.render(<List/>,document.getElementById("section"));
		}
	},
	render:function(){
	
		return (
			<div id="brandContent">
				<div className="brandHeader">
					<i className="iconfont back" data-type={this.state.mountType} onClick={this.back}>&#xe605;</i>
					<i className="iconfont">&#xe600;</i>
				</div>
				<div className="brandTop">
					<div className="brandImg">
						<img src="http://xqtopic.xiangqu.com/FuRYyjFKxCNv-xW5Twl_qiyZTfud?imageView2/2/w/640/q/90/format/jpg/960x645/"/>
					</div>
					<div className="brandTip">
						<img src="http://xquser.xiangqu.com/FhzU4QWF3A9bLvTy1SJ0pgeRO53X?imageView2/2/w/120/q/90/format/jpg/180x180/"/>
					</div>
				</div>
				<div className="brandIntro">
					<div>
						<h3>南拾壹</h3>
						<p>我是咩。我是小懒。<br/>我们是南拾壹，两个刚过而立的女子。社会学，法学。硕士毕业后进入国有四大行，开会应酬加班是生活常态。六年兢兢业业的光阴，一晃就这么过去了。伴着疑惑，面孔慢慢改变，孩子终于出生。心却执着地留在原地，想要做自己的念头愈发的强烈。哪怕只有一次，人生，我们想做自己爱的事。</p>
					</div>

					<div>
						<h3>品牌介绍</h3>
						<p>我们爱云南这片湛蓝通透的天空<br/>
						我们爱云南这片湛蓝通透的天空<br/>
						我们爱云南这片湛蓝通透的天空<br/>
						我们爱云南这片湛蓝通透的天空<br/>
						我们爱云南这片湛蓝通透的天空</p>
						<img src=""/>
					</div>
					
				</div>
			</div>
		)
	}
});

module.exports=Brand;