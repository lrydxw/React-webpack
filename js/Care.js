var React=require('react');
var ReactDOM = require("react-dom");
var toast = new Toast();

var section=document.getElementById('section');
var SheContentList=React.createClass({
	getInitialState:function(){
		return {
			careList:""
		}
	},
	toUser:function(){
		var My = require("./My");
		ReactDOM.unmountComponentAtNode(section);
		ReactDOM.render(<My/>,section);
		$("#footer").css('display','flex');
	},
	componentWillMount:function(){
		console.log("ajax即将加载");
		if((localStorage.getItem("care") != null) && (localStorage.getItem("care") != "[]")){
			var careList = JSON.parse(localStorage.getItem("care"));
			var len = careList.length;
			var conList = [];
			for(var i=0;i<len;i++){
				conList.push(<div className="conListWrap" key={"conListWrap"+i}>
								<section className="conSection">
									<div className="condiv1"><img src={careList[i].img} /></div>
									<div className="box1">
										<div className="condiv">
											<span>{careList[i].name}</span>
										</div>
										<div><span className="sp1">取消关注</span></div>
									</div>
								</section>	
							</div>)
			}
		}
		
		this.setState({
			careList:conList
		})
	},
	render:function(){
		if((localStorage.getItem("care")!=null)&&(localStorage.getItem("care")!="[]")){
			return (
				<div className="care">
					<ul className="careHeader">
						<li onClick={this.toUser}>
							<span className="iconfont">&#xe605;</span>
						</li>
						<li>
							<span>关注</span>
						</li>
						<li></li>
					</ul>
					<div className="careContent">
						{this.state.careList}
					</div>
				</div>
			)
		}else{
			return (
				<div className="care">
					<ul className="careHeader">
						<li onClick={this.toUser}>
							<span className="iconfont">&#xe605;</span>
						</li>
						<li>
							<span>关注</span>
						</li>
						<li></li>
					</ul>
					<div className="careContent">
						您当前暂未关注其他人,快去关注吧!
					</div>
				</div>
			)
		}
	},
	componentDidMount:function(){
		$(".sp1").each(function(){
			$(this).on("click",function(){
				var careImg = $(this).parent().parent().parent().find("img").attr("src");
				var careArr = JSON.parse(localStorage.getItem("care"));
				for(var i=0;i<careArr.length;i++){
					if(careArr[i].img == careImg){
						careArr.splice(i,1);
						$(this).parent().parent().parent().parent().hide();
					}
				}
				localStorage.setItem("care",JSON.stringify(careArr));
			})
		})
	}
});

module.exports=SheContentList;