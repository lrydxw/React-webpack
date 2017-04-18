var React=require('react');
var ReactDOM=require('react-dom');
var WalkDetil=React.createClass({
	getInitialState:function(){
		return {
			imgsList:"",
			nameList:""
		}
	},
	componentWillMount:function(){
		var that =this;
		if(that.props.num=="0"){
			ajax("http://shop.juanpi.com/gsort?key=nvzhuang&type=1&machining=danpin&dtype=JSONP&page_url=%2Fnvzhuang&page=1&zhouyi_ids=p1_c3_a1_l8_18_5_47_51&rows=240&callback=gsort_callback")
		}else if(that.props.num=="1"){
			ajax("http://shop.juanpi.com/gsort?key=nanzhuang&type=1&machining=danpin&dtype=JSONP&page_url=%2Fnanzhuang&page=1&zhouyi_ids=p1_c3_a1_l8_18_5_47_51&rows=240&callback=gsort_callback")
		}else if(that.props.num=="2"){
			ajax("http://shop.juanpi.com/gsort?key=peishi&type=1&machining=danpin&dtype=JSONP&page_url=%2Fpeishi&page=1&zhouyi_ids=p1_c3_a1_l8_18_5_47_51&rows=240&callback=gsort_callback")
		}else if(that.props.num=="3"){
			ajax("http://shop.juanpi.com/gsort?key=xiangbao&type=1&machining=danpin&dtype=JSONP&page_url=%2Fxiangbao&page=1&zhouyi_ids=p1_c3_a1_l8_18_5_47_51&rows=240&callback=gsort_callback")
		}else if(that.props.num=="4"){
			ajax("http://shop.juanpi.com/gsort?key=wenti&type=1&machining=danpin&dtype=JSONP&page_url=%2Fwenti&page=1&zhouyi_ids=p1_c3_a1_l8_18_5_47_51&rows=240&callback=gsort_callback")
		}else if(that.props.num=="5"){
			ajax("http://shop.juanpi.com/gsort?key=jujia&type=1&machining=danpin&dtype=JSONP&page_url=%2Fjujia&page=1&zhouyi_ids=p1_c3_a1_l8_18_5_47_51&rows=240&callback=gsort_callback")
		}else if(that.props.num=="6"){
			ajax("http://shop.juanpi.com/gsort?key=meishi&type=1&machining=danpin&dtype=JSONP&page_url=%2Fmeishi&page=1&zhouyi_ids=p1_c3_a1_l8_18_5_47_51&rows=240&callback=gsort_callback")
		}else if(that.props.num=="7"){
			ajax("http://shop.juanpi.com/gsort?key=shuma&type=1&machining=danpin&dtype=JSONP&page_url=%2Fshuma&page=1&zhouyi_ids=p1_c3_a1_l8_18_5_47_51&rows=240&callback=gsort_callback")
		}
		function ajax(ur){
			$.ajax({
				method:'get',
				url:ur,
				dataType:"jsonp",
				success:function(data){
					var len = data.list.length;
					var arr = [];
					for(var i = 0; i　< len; i++){
						arr.push(
							<div key={"data"+i}>
								<img onClick={that.walkImageHandle} src={data.list[i].pic_url} data-name={i}/>
								<p>{data.list[i].title}</p>
								<p className="p2">${data.list[i].oprice}</p>
							</div>
						)
					}
					that.setState({
						imgsList:arr
					})
				}
			})
		}
		$.ajax({
			method:'get',
			url:"json/name.json",
			success:function(response){
				var ar=[];
				ar.push(<span key={that.props.num} id="walkDetilTop">{response[that.props.num]}</span>)
				that.setState({
					namesList:ar
				})
			}
		})
		
	},
	render:function(){
		console.log(this.state.namesList);
		return (
			<div className="walkDetil">
				<header id="walkDetilHeader">
					<i className="iconfont" onClick={this.backHandle}>&#xe605;</i>
					{this.state.namesList}
					<i className="iconfont">&#xe602;</i>
				</header>
				<div id="walkDetilSelect">
					<div id="walkContent">
						{this.state.imgsList}
					</div>
				</div>
			</div>
		)
	},
	backHandle:function(){
		
		$('#footer').css({
						'display':'flex'
		})
		var Walk=require('./Walk');
		var section=document.getElementById("section");
		ReactDOM.unmountComponentAtNode(section);
		ReactDOM.render(<Walk/>,section);
	},
	walkImageHandle:function(e){
		var currentName=e.target.getAttribute('data-name');
		var Shopping=require('./Shopping');
		var section=document.getElementById('section');
		ReactDOM.unmountComponentAtNode(section);
		ReactDOM.render(<Shopping currentId={this.props.num} currentName={currentName} />,section);
	}
});

module.exports=WalkDetil;