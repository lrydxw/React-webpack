var React=require('react');
var ReactDOM = require("react-dom");
var toast = new Toast();

var section=document.getElementById('section');
var SheContent=React.createClass({
	getInitialState:function(){
		return {
			activeIndex : 0,
			contentList:""
		}
	},
	componentWillMount:function(){
		console.log("ajax即将加载");
		var that = this;
		$.ajax({
			type:"get",
			url:"json/say.json",
			success:function(response){
				console.log("data",response.data);
				var arrList = response.data;
				var len = arrList.length;
				var conList = [];
				for(var i=0;i<len;i++){
					conList.push(<div className="conWrap" key={"conWrap"+i}>
									<header className="conHead">
										<div><img src={arrList[i].authorAvatarURL} /></div>
										<div>
											<span>{arrList[i].authorName}</span>
											<span>{arrList[i].authorTag}</span>
										</div>
										<div><span className="careful">+关注</span></div>
									</header>
									<section className="conSection">
										<span>{arrList[i].postTitle}</span>
										<div><img src={arrList[i].contents[0].content} /></div>
									</section>
									<ul className="conFooter">
										<li>
											<i className="iconfont">&#xe65f;</i>
											<span>{arrList[i].favorNum}</span>
										</li>
										<li>
											<i className="iconfont">&#xe672;</i>
											<span>{arrList[i].commentNum}</span>
										</li>
										<li>
											<span>{arrList[i].updateAt}</span>
										</li>
									</ul>
								</div>)
				}
				that.setState({
					contentList:conList
				})
			}
		});
	},
	render:function(){
		return (
			<div className="sheContainer">
				{this.state.contentList}
			</div>
		)
	},
	componentDidUpdate:function(){
		$(".careful").each(function(){
			var careFlag = true;
			//首先判断是否登录,如果是登录状态
			if(localStorage.getItem("isLogin") == "ok"){
				//判断本地是否存有关注的信息,如果存有关注的信息,那么把已关注的信息显示出来
				if((localStorage.getItem("care") != null)&&(localStorage.getItem("care") !="[]")){
					var arr = JSON.parse(localStorage.getItem("care"));
					var careImg = $(this).parent().parent().find("img").attr("src");
					for(var j=0;j<arr.length;j++){
						if(arr[j].img == careImg){
							$(this).html("取消关注");
							careFlag = false;
						}
					}
				}
			}
			
			$(this).on("click",function(){
				if(localStorage.getItem("isLogin") == "ok"){
					if(careFlag){
						$(this).html("取消关注");
						careFlag = false;
						var careImg = $(this).parent().parent().find("img").attr("src");
						var careName = $(this).parent().prev().find("span").eq(0).html();
						var care = {
							img:careImg,
							name:careName,
						};
						var careArr = [];
						if((localStorage.getItem("care") != null)&&(localStorage.getItem("care") !="[]")){
							careArr = JSON.parse(localStorage.getItem("care"));
							careArr.push(care);	
						}else{
							careArr.push(care);
						}
						localStorage.setItem("care",JSON.stringify(careArr));
					}else{
						$(this).html("+关注");
						careFlag = true;
						var careImg = $(this).parent().parent().find("img").attr("src");
						var careArr = JSON.parse(localStorage.getItem("care"));
						for(var i=0;i<careArr.length;i++){
							if(careArr[i].img == careImg){
								careArr.splice(i,1);
							}
						}
						localStorage.setItem("care",JSON.stringify(careArr));
					}
				}else{
					var Login = require("./Login");
					ReactDOM.unmountComponentAtNode(section);
					ReactDOM.render(<Login fromName="sheContent" activeIndex = "0"/>,section);
				}
				
			})
		})
	}
});

module.exports=SheContent;