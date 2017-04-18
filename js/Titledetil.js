var React=require('react');
var ReactDOM = require("react-dom");
var Titledetil=React.createClass({
	getInitialState:function(){
		return {
			igsList:""
		}
	},
	componentWillMount:function(){
		var that =this;
		$.ajax({
			method:'get',
			url:"json/theme_list.json",
			success:function(response){
				var len = response.data[that.props.num].list.length;
				var ar = [];
				console.log(len);
				for(var i = 0; i　< len; i++){
					ar.push(<div className="swiper-slide" key={'banner'+i}>
								<img src={response.data[that.props.num].list[i].img} />
								<p>{response.data[that.props.num].list[i].text}</p>
							</div>)
				}
				that.setState({
					igsList:ar
				})
			}
		})
	},
	render:function(){
		return (
			<div id="Titledetil">
				<div className="swiper-container">
					<div className="swiper-wrapper">
						{this.state.igsList}
					</div>
					<div className="swiper-pagination swiper-pagination-white"></div>
				</div>
				<i className="iconfont back" onClick={this.backHandle}>&#xe604;</i>
			</div>
		)
	},
	componentDidUpdate:function(){
		var swiper = new Swiper(".swiper-container",{
			"pagination":".swiper-pagination",
			autoplay:2000,
			loop:true,
			autoplayDisableOnInteraction:false
		});
	},
	backHandle:function(){
		
		$('#footer').css({
						'display':'flex'
		})
		var MainFoot=require('./MainFoot');
		var Title=require('./Title');
		var section=document.getElementById("section");
		ReactDOM.unmountComponentAtNode(section);
		ReactDOM.render(<Title/>,section);
	}
});

module.exports=Titledetil;