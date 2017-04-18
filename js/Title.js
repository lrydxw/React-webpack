var React=require('react');
var ReactDOM = require("react-dom");
var Title=React.createClass({
	getInitialState:function(){
		return {
			imgsList:""
		}
	},
	
	componentWillMount:function(){
		var that =this;
		$.ajax({
			method:'get',
			url:"json/theme_new.json",
			success:function(data){
//				console.log(data.length);
				var len = data.length;
				var arr = [];
				for(var i = 0; i　< len; i++){
					arr.push(<div className="swiper-slide" key={'banner'+i}><img src={data[i].imgUrl} onClick={that.imgHandle} data-id={i} /></div>)
				}
				that.setState({
					imgsList:arr
				})
			}
		})
	},
	render:function(){
		return (
			<div id="titleContent">
				<div className="titleTop">
					<span></span>
					专题
					<span></span>
				</div>
				<div className="swiper-container">
					<div className="swiper-wrapper">
						{this.state.imgsList}
					</div>
					<div className="swiper-pagination"></div>
				</div>
			</div>
		)
	},
	componentDidUpdate:function(){
		var swiper = new Swiper(".swiper-container",{
	        effect: 'coverflow',
	        grabCursor: true,
	        centeredSlides: true,
	        slidesPerView: 'auto',
			coverflow: {
	            rotate: 70,
	            stretch: 0,
	            depth: 100,
	            modifier: 1,
	            slideShadows : true
	        }
		});
	},
	imgHandle:function(e){
		$('#footer').css({'display':'none'})
		var Titledetilnum=e.target.getAttribute('data-id');
		var Titledetil=require('./Titledetil');
		var section=document.getElementById('section');
		ReactDOM.unmountComponentAtNode(section);
		ReactDOM.unmountComponentAtNode(footer);
		ReactDOM.render(<Titledetil num={Titledetilnum}/>,section);
	}
});
module.exports=Title;


















