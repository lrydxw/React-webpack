var React=require('react');
var ReactDOM=require('react-dom');
var List=React.createClass({
	getInitialState:function(){
//		console.log(this.props.mountType);
		return {
			mountType:this.props.mountType,
			classesName:"",
			proItem:""
		}
	},
	back:function(){
//		console.log(this.state.mountType);
		var mountType=this.state.mountType;
		if(mountType == "teacher"){
			$("#footer").css('display','flex');
			var Teacher = require("./Teacher");
			ReactDOM.render(<Teacher/>,document.getElementById("section"));
		
		}
	},
	componentWillMount:function(){
		var that =this;
		var id=this.props.listId*1;
		$.ajax({
			type:"get",
			url:"json/list.json",
			success:function(response){
//				console.log(response);
				for(var i=0;i<response.length;i++){
					if(response[i].id==id){
						var objArr=response[i]
						
					}
				}
//				console.log(objArr);
				var brandDesigner=objArr.brand;
				var len=brandDesigner.length;
				var classifyItem=[];
				for(var i=0;i<len;i++){
//					console.log(brandDesigner[i].name);
					classifyItem.push(
						<li key={i}>
								<div>
									<img src={brandDesigner[i].img}/>
								</div>
								<div>
									<p>
										<span>{brandDesigner[i].name}</span>
										<span>{brandDesigner[i].identify}</span>
										<span>{brandDesigner[i].style}</span>
									</p>
									<p>{brandDesigner[i].number}作品</p>
								</div>
								
						</li>
					)
				}
				that.setState({
					classesName:objArr.classesName,
					proItem:classifyItem
				})
			}
		});
		
	},
	render:function(){
		return (
			<div id="listContent">
				<div className="listTop">
					<i className="iconfont" onClick={this.back}>&#xe605;</i>
					<p>{this.state.classesName}</p>
					
				</div>
				<ul className="listCon">
					{this.state.proItem}
				</ul>
			</div>
		)
	}
});

module.exports=List;