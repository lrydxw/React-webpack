var React=require('react');
var ReactDOM=require('react-dom');
var Style=React.createClass({
	getInitialState:function(){
		return {
			styleList:""
		}
	},
	componentWillMount:function(){
		var that =this;
		$.ajax({
			method:'get',
			url:"json/style.json",
			success:function(response){
//				console.log(response.data[1].tags);
				var data=response.data[1].tags;
				var len=data.length;
				var arrStyle=[];
				for(var i=0;i<len;i++){
					arrStyle.push(
								<li className="classify" data-id={data[i].id} key={i}><span>{data[i].name}</span><img src={data[i].image}/></li>
						)
				}
				that.setState({
					styleList:arrStyle
				})
			}
		});
	},
	render:function(){
		return (
			<ul className="styleList">
				{this.state.styleList}
			</ul>
		)
	},
	componentDidUpdate:function(){
		var that=this;
		$(".classify").on('click',function(){
			var listId=$(this).attr('data-id');
//			console.log(listId);
			var List = require("./List");
			ReactDOM.unmountComponentAtNode(document.getElementById("section"));
			$("#footer").css('display','none');
			ReactDOM.render(<List listId = {listId} mountType="teacher"/>,document.getElementById("section"));
		})
	}
});

module.exports=Style;