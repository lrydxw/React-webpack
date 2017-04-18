var React=require('react');
var ReactDOM=require('react-dom');
var Cart=React.createClass({
	getInitialState:function(){
		return {
			cartList:""
		}
	},
	countNum:function(evt){
		var that=this;
//		console.log(evt.target.getAttribute('data-img'));
		var itemNum=evt.target.innerText
		$(".mask").css('display','block');
		$(".sNum").html(itemNum);
		that.setState({
			dataImg:evt.target.getAttribute('data-img')
		})
	},
	addNum:function(){
//		console.log(this.state.dataImg);
		var sNum=$(".sNum").html()
		sNum++;
		$(".sNum").html(sNum);
		var product=JSON.parse(localStorage.getItem('product'));
//		console.log(product);
		var len=product.length;
		for(var i=0;i<len;i++){
			if(this.state.dataImg==product[i].proimg){
				product[i].num=sNum;
			}
		}
		localStorage.setItem('product',JSON.stringify(product));
		
	},
	reduceNum:function(){
		var sNum=$(".sNum").html()
		if(sNum<=1){
			sNum=1;
			var toast=new Toast();
			toast.show('不能再减了',1000);
		}else{
			sNum--;
		}
		$(".sNum").html(sNum);
		var product=JSON.parse(localStorage.getItem('product'));
//		console.log(product);
		var len=product.length;
		for(var i=0;i<len;i++){
			if(this.state.dataImg==product[i].proimg){
				product[i].num=sNum;
			}
		}
		localStorage.setItem('product',JSON.stringify(product));
	},
	componentWillMount:function(){
		var that=this;
		if(localStorage.getItem('product')){
			var product=JSON.parse(localStorage.getItem('product'));
//			console.log(product);
			var len=product.length;
			var proList=[];
			for(var i=0;i<len;i++){
				proList.push(
					<li key={i} className="cartItem">
							<div className="delItem">删除</div>
							<div className="itemInfo">
								<div className="itemSelet"><input className="selected" type="checkbox" data-img={product[i].proimg} onClick={this.selectSingle}/></div>
								<div className="itemImg"><img src={product[i].proimg}/></div>
								<div className="otherInfo">
									<p>{product[i].proname}</p>
									<p><span>{product[i].price}</span></p>
									<p><strong>数量:</strong><span onClick={this.countNum}  data-img={product[i].proimg}>{product[i].num}</span><i className="iconfont iconstyle">&#xe6ac;</i></p>
							</div>
							</div>
					</li>
				)
				
			}
		}
		that.setState({
			cartList:proList,
		});
	},
	back:function(){
		var type=this.props.mountType;
		if(type=="my"){
			var My=require('./My');
			ReactDOM.unmountComponentAtNode(document.getElementById("section"));
			ReactDOM.render(<My/>,document.getElementById("section"));
			$("#footer").css('display','flex');
		}
	},
	selectSingle:function(evt){
		var dataImg=evt.target.getAttribute('data-img');
		var count=$(".countPrice").html()*1;
		var product=JSON.parse(localStorage.getItem('product'));
		var len=product.length;
		for(var i=0;i<len;i++){
			if(product[i].proimg==dataImg){
				var price=(product[i].price).substring(1)*1;
				var num=(product[i].num)*1;
				if(evt.target.checked){
					count+=price*num;
				}else{
					count-=price*num;
				}
				
			}
		}		
		
		$(".countPrice").html(count.toFixed(2));
	},
	selectAll:function(evt){
		var once=evt.target.checked;
		if(once){
			$(".selected").prop('checked',true);
			var count=0;
			var product=JSON.parse(localStorage.getItem('product'));
			console.log(product);
			var len=product.length;
			for(var i=0;i<len;i++){
				var price=(product[i].price).substring(1)*1;
				var num=(product[i].num)*1;
				count+=price*num;
			}	
			$(".countPrice").html(count.toFixed(2));
		}else{
			$(".selected").prop('checked',false)
			$(".countPrice").html('0');
		}
	},
	configNum:function(){
		$('.mask').css('display','none');
		ReactDOM.unmountComponentAtNode(document.getElementById("section"));
		ReactDOM.render(<Cart/>,document.getElementById("section"));
	},
	render:function(){
		return (
			<div id="cartContent">
				<div className="mask">
					<div className="maskShow">
						<div><p>数量</p><p><span onClick={this.reduceNum}>-</span><span className="sNum">1</span><span onClick={this.addNum}>+</span></p></div>
						<div onClick={this.configNum}>确认</div>
					</div>
				</div>
				<div className="cartTop">
					<i className="iconfont" onClick={this.back}>&#xe605;</i>
					<p>购物车</p>
					
				</div>
				<ul className="cartCon">
					{this.state.cartList}
				</ul>
				<div className="cartBottom">
					<p><input type="checkbox" onClick={this.selectAll}/><span>全选</span></p>
					<div className="countInfo">
						<div>
							<p>合计:<span>$</span><span className="countPrice">0</span></p>
						</div>
						<span className="countBtn">结算</span>
					</div>
				</div>
			</div>
		)
	},
	componentDidMount:function(){
		var that=this;
		$(".cartItem").swipeLeft(function(){
				$(this).find(".itemInfo").animate({left:"-0.5rem"},300);
				$(this).siblings().find(".itemInfo").animate({left:"0rem"},300);
			})
		$(".cartItem").swipeRight(function(){
				$(this).find(".itemInfo").animate({left:"0rem"},300);
			})
		$(".delItem").click(function(){
			var index=$(this).parent().index();
			var product=JSON.parse(localStorage.getItem('product'));
			product.splice(index,1);
			localStorage.setItem('product',JSON.stringify(product));
			var toast=new Toast();
		    toast.show("删除成功",1000);
		    ReactDOM.unmountComponentAtNode(document.getElementById("section"));
			ReactDOM.render(<Cart/>,document.getElementById("section"));
		    
		})
		$(".countBtn").click(function(){
			var productPay=[];
			var productAll=JSON.parse(localStorage.getItem('product'));
			$(".selected").each(function(index){
				if($(this).prop("checked")){
					productPay.push(productAll[index]);
				}
			});
			if(localStorage.getItem("order")){
				var order=JSON.parse(localStorage.getItem('order'));
				
				for(var i=0;i<productPay.length;i++){
					var flag=true;
					for(var j=0; j<order.length;j++){
						if(productPay[i].proimg == order[j].proimg){
							order[j].num= Number(order[j].num)+Number(productPay[i].num);
							flag=false;
							break;
						}
													
					}
				if(flag){
					 order.push(productPay[i]);
					}
											
				}
			}else{
				var order=productPay;
				
			}
			
			
			console.log(order);
			localStorage.setItem("order",JSON.stringify(order));
			var Order=require('./Order');
			ReactDOM.unmountComponentAtNode(document.getElementById("section"));
			ReactDOM.render(<Order mountType="cart"/>,document.getElementById("section"));
		})
	}
})

module.exports=Cart;