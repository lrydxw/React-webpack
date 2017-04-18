var React=require('react');
var ReactDOM=require('react-dom');
var toast = new Toast();
var Shopping=React.createClass({
	getInitialState:function(){
		return {
			imgsList:""
		}
	},
	componentWillMount:function(){
		var that =this;
		if(this.props.currentId=="10"){
			$.ajax({
				method:'get',
				url:"json/guang_banner.json",
				success:function(response){
					var len = response.data.content.length;
					console.log(that.props.num)
					var arr = [];
					arr.push(
						<div className="box" key={that.props.num}>
							<img src={response.data.content[that.props.num].items[that.props.nm].image}/>
							<p className="p1">{response.data.content[that.props.num].description}</p>
							<p className="p3"><span>温馨提示:</span>右上角有购物车，点击即可查看</p>
							<p className="p2">
								<span>${response.data.content[that.props.num].items[that.props.nm].price}</span>
							</p>
							<div className="btndiv" onClick={that.addCart}><button>加入购物车</button></div>
						</div>
					)
					that.setState({
						imgsList:arr
					})
				}
			})
		}else if(this.props.currentId=="0"){
			ajax("http://shop.juanpi.com/gsort?key=nvzhuang&type=1&machining=danpin&dtype=JSONP&page_url=%2Fnvzhuang&page=1&zhouyi_ids=p1_c3_a1_l8_18_5_47_51&rows=240&callback=gsort_callback")
		}else if(this.props.currentId=="1"){
			ajax("http://shop.juanpi.com/gsort?key=nanzhuang&type=1&machining=danpin&dtype=JSONP&page_url=%2Fnanzhuang&page=1&zhouyi_ids=p1_c3_a1_l8_18_5_47_51&rows=240&callback=gsort_callback")
		}else if(this.props.currentId=="2"){
			ajax("http://shop.juanpi.com/gsort?key=peishi&type=1&machining=danpin&dtype=JSONP&page_url=%2Fpeishi&page=1&zhouyi_ids=p1_c3_a1_l8_18_5_47_51&rows=240&callback=gsort_callback")
		}else if(this.props.currentId=="3"){
			ajax("http://shop.juanpi.com/gsort?key=xiangbao&type=1&machining=danpin&dtype=JSONP&page_url=%2Fxiangbao&page=1&zhouyi_ids=p1_c3_a1_l8_18_5_47_51&rows=240&callback=gsort_callback")
		}else if(this.props.currentId=="4"){
			ajax("http://shop.juanpi.com/gsort?key=wenti&type=1&machining=danpin&dtype=JSONP&page_url=%2Fwenti&page=1&zhouyi_ids=p1_c3_a1_l8_18_5_47_51&rows=240&callback=gsort_callback")
		}else if(this.props.currentId=="5"){
			ajax("http://shop.juanpi.com/gsort?key=jujia&type=1&machining=danpin&dtype=JSONP&page_url=%2Fjujia&page=1&zhouyi_ids=p1_c3_a1_l8_18_5_47_51&rows=240&callback=gsort_callback")
		}else if(this.props.currentId=="6"){
			ajax("http://shop.juanpi.com/gsort?key=meishi&type=1&machining=danpin&dtype=JSONP&page_url=%2Fmeishi&page=1&zhouyi_ids=p1_c3_a1_l8_18_5_47_51&rows=240&callback=gsort_callback")
		}else if(this.props.currentId=="7"){
			ajax("http://shop.juanpi.com/gsort?key=shuma&type=1&machining=danpin&dtype=JSONP&page_url=%2Fshuma&page=1&zhouyi_ids=p1_c3_a1_l8_18_5_47_51&rows=240&callback=gsort_callback")
		}
		function ajax(ur){
			$.ajax({
				method:'get',
				url:ur,
				dataType:"jsonp",
				success:function(data){
					var currentName=that.props.currentName*1;
					var len = data.list.length;
					var arr = [];
					arr.push(
						<div className="box" key={"data"+currentName}>
							<img src={data.list[currentName].pic_url}/>
							<p className="p1">没有产品介绍,将就着看吧</p>
							<p className="p2">
								<span>${data.list[currentName].oprice}</span>
							</p>
							<div className="btndiv"><button onClick={that.addCart}>加入购物车</button></div>
						</div>
					)
					
					that.setState({
						imgsList:arr
					})
				}
			})
		}
	},
	addCart:function(){
		console.log("cart","加入购物车");
		var proimg = $(".box").find("img").attr("src");
		var proname = $(".p1").html();
		var price = $(".p2").find("span").text();
		var pro = {
			proimg:proimg,
			proname:proname,
			price:price,
			num:1
		};
		var product = [];
		//console.log("currentId",this.props.currentId);
		//console.log("currentName",this.props.currentName);
		if(localStorage.getItem("isLogin") == "ok"){
			if((localStorage.getItem("product")!=null)&&(localStorage.getItem("product")!="[]")){
				var product = JSON.parse(localStorage.getItem("product"));
				var len = product.length;
				var flag = true;
				for(var i=0;i<len;i++){
					if(product[i].proimg == pro.proimg){
						product[i].num += pro.num;
						flag = false;
					}
				}
				if(flag){
					product.push(pro);
				}
			}else{
				product.push(pro);
			}
			localStorage.setItem("product",JSON.stringify(product));
			toast.show("添加购物车成功，请继续购物",1000);
		}else{
			var Login = require("./Login");
			ReactDOM.unmountComponentAtNode(section);
			ReactDOM.render(<Login fromName="shopping" currentId={this.props.currentId} currentName={this.props.currentName} num={this.props.num} nm={this.props.nm}/>,section);
		}	
		return false;
	},
	render:function(){
		return (
				<div className="shopping">
					<header id="shoppingHeader">
						<i className="iconfont" onClick={this.backHandle} data-id={this.props.currentId}>&#xe605;</i>
						<i className="iconfont">&#xe63f;</i>
					</header>
					<div id="shoppingSelect">
						{this.state.imgsList}
					</div>
				</div>
		)
	},
	backHandle:function(e){
		//2017-1-2 修改
		
		if(e.target.getAttribute('data-id')=="10"){
			var Walk=require('./Walk');
			var section=document.getElementById("section");
			ReactDOM.unmountComponentAtNode(section);
			ReactDOM.render(<Walk/>,section);
			$('#footer').css({'display':'flex'});
		}else{
			var backNum=e.target.getAttribute('data-id');
			var WalkDetil=require('./WalkDetil');
			var section=document.getElementById("section");
			ReactDOM.unmountComponentAtNode(section);
			ReactDOM.render(<WalkDetil num={backNum}/>,section);
		}
	}

});

module.exports=Shopping;