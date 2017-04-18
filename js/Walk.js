var React=require('react');
var ReactDOM=require('react-dom');
var Walk=React.createClass({
	getInitialState:function(){
		return {
			imgesList:"",
			imgsLunbo:"",
			selectTitle:""
		}
	},
	walkTitleHandle:function(e){
		var walkTitleNum=e.target.getAttribute('data-id');
		$('#footer').css({'display':'none'});
		var WalkDetil=require('./WalkDetil');
		var section=document.getElementById('section');
		ReactDOM.unmountComponentAtNode(section);
		ReactDOM.render(<WalkDetil num={walkTitleNum}/>,section);
	},
	shopHandle:function(e){
//		console.log(e.target.getAttribute('data-id'));
//		console.log(e.target.getAttribute('type'));
		var ShoppingNum=e.target.getAttribute('data-id');
		var ShoppingNm=e.target.getAttribute('type');
		var Shopping=require('./Shopping');
		$('#footer').css({'display':'none'});
		var section=document.getElementById('section');
		ReactDOM.unmountComponentAtNode(section);
		ReactDOM.render(<Shopping num={ShoppingNum} nm={ShoppingNm} currentId="10" />,section);
	},
	componentWillMount:function(){
		var that =this;
		$.ajax({
			method:'get',
			url:"json/guang_banner.json",
			success:function(response){
				var len = response.data.content.length;
				var arr = [];
				for(var i = 0; i　< len; i++){
					var items = response.data.content[i].items;
					var lens = items.length;
					var imgs = [];
					for(var j=0;j<lens;j++){
						imgs.push(<div className="swiper-slide" key={"lens"+j}>
								<div className="swiper-img"><img src={response.data.content[i].items[j].image} onClick={that.shopHandle} data-id={i} type={j} /></div>
								<div className="swiper-txt">
									<p>{response.data.content[i].items[j].brandName}</p>
									<p>{response.data.content[i].items[j].keyword}</p>
									<p>$ {response.data.content[i].items[j].price}</p>
								</div>
							</div>);
					}
					that.setState({
						imgsLunbo:imgs
					})
					arr.push(<div className="wrap" key={"len"+i}>
								<div className="walkBanner">
									<a href={response.data.content[i].h5Url}>
										<img src={response.data.content[i].image} />
										<div className="walkSend">
											<p>{response.data.content[i].name}</p>
											<p>{response.data.content[i].title}</p>
											<p>产看全部</p>
										</div>
									</a>
								</div>
								<div className="swiper-container">
									<div className="swiper-wrapper">
										{that.state.imgsLunbo}
									</div>
									<div className="swiper-pagination"></div>
								</div>
							</div>);
				}
				
				that.setState({
					imgesList:arr
				})
			}
		});
		$.ajax({
			method:'get',
			url:"json/kuang_child.json",
			success:function(data){
				var length=data.data.length;
				var arrTitle=[];
				console.log(data.data[0].logo);
				for(var i = 0; i　< length; i++){
					arrTitle.push(
						<li key={"data"+i}>
							<img src={data.data[i].logo} onClick={that.walkTitleHandle} data-id={i}/>
							{data.data[i].name}
						</li>
					)
					
				}
				that.setState({
					selectTitle:arrTitle
				})
				
			}
		})
	},
	render:function(){
		return (
			<div className="walk">
				<header id="walkHeader">
					<i className="iconfont search">&#xe602;</i>
					<input type="text" placeholder="搜索好设计"/>
					<i className="iconfont xiao">&#xe649;</i>
				</header>
				<div className="walkSelect">
					<ul>
						{this.state.selectTitle}	
					</ul>
				</div>
				<div className="walkMain">
					{this.state.imgesList}
				</div>
			</div>
		)
	},
	componentDidUpdate:function(){
		var swiper = new Swiper(".swiper-container",{
	        slidesPerView: 2.6,
	        paginationClickable: true,
	        spaceBetween: 10,
	        freeMode: true
		});
	}
});

module.exports=Walk;