var React=require('react');
var ReactDOM=require('react-dom');
var Order=React.createClass({
	getInitialState:function(){
		return {
			orderList:""
		}
	},
	back:function(){
		var type=this.props.mountType;
		ReactDOM.unmountComponentAtNode(document.getElementById("section"));		
		if(type=="cart"){
			var Cart=require('./Cart');
			ReactDOM.render(<Cart mountType="my"/>,document.getElementById("section"));
			
		}else if(type="my"){
			var My=require('./My');
			ReactDOM.render(<My/>,document.getElementById("section"));
			$("#footer").css('display','flex');
		}
	},
	componentWillMount:function(){
		var that=this;
		if(localStorage.getItem('order')){
			var order=JSON.parse(localStorage.getItem('order'));
			console.log(order);
			var len=order.length;
			var proList=[];
			for(var i=0;i<len;i++){
				proList.push(
					<li key={i} className="cartItem">
							<div className="itemInfo">
								<div className="itemImg"><img src={order[i].proimg}/></div>
								<div className="otherInfo">
									<p>{order[i].proname}</p>
									<p><span>{order[i].price}</span></p>
									<p><strong>数量:</strong><span onClick={this.countNum} data-img={order[i].proimg}>{order[i].num}</span></p>
							</div>
							</div>
					</li>
				)
				
			}
		}
		that.setState({
			orderList:proList,
		});
	},
	render:function(){
		return (
			<div id="orderContent">
				<div className="orderTop">
					<i className="iconfont" onClick={this.back}>&#xe605;</i>
					<p>我的订单</p>
				</div>
				<ul className="orderCon">
					{this.state.orderList}
				</ul>
			</div>
		)
	}
});

module.exports=Order;