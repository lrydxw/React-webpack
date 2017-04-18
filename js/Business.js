var React=require('react');
var ReactDOM=require('react-dom');
var Business=React.createClass({
	getInitialState:function(){
		return {
			busList:""
		}
	},
	componentWillMount:function(){
		var that =this;
		$.ajax({
			method:'get',
			url:"json/style.json",
			success:function(response){
//				console.log(response.data[0].tags);
				var data=response.data[0].tags;
				var len=data.length;
				var arrBus=[];
				for(var i=0;i<len;i++){
					arrBus.push(
								<li className="classify" data-id={data[i].id} key={i}><span>{data[i].name}</span><img src={data[i].image}/></li>
						)
				}
				that.setState({
					busList:arrBus
				})
			}
		});
	},
	render:function(){
		return (
			<ul className="busList">
				{this.state.busList}
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

module.exports=Business;