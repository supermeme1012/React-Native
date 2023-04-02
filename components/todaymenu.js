"use strict";
/**
 ==================================================================================
 Description:       desc
 Creation Date:     3/15/16
 Author:            Osipe
 ==================================================================================
 Revision History
 ==================================================================================
 Rev    Date        Author           Task                Description
 ==================================================================================
 1      3/15/16     Osipe          TaskNumber          Created
 ==================================================================================
 */
var React = require('react-native');
var {NativeModules} = require('react-native');


var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');



const DropDown = require('react-native-dropdown');
const {
  Select,
  Option,
  OptionList,
  updatePosition
} = DropDown;


var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
	Image,
	ScrollView,
	TouchableOpacity,
	
	} = React;

var TodaymenuComponent = React.createClass({
   
   getInitialState: function() { 
     var context=this;
     console.log("this instance");
	 context.getfoodimages();
     
   
   
    return {
      username: 'sathish1@greenridge.in',     
    }
  },  
  getfoodimages : function(){
	  var context=this;
	 if(context.props.firstlocatid==undefined)
		var apiurl="https://rivo.herokuapp.com/products?city_id="+0;
	 else 
		var apiurl="https://rivo.herokuapp.com/products?city_id="+context.props.firstlocatid;
	
	 // var apiurl="https://rivo.herokuapp.com/products?city_id="+1;
	  console.log(apiurl);
	  context.getdata(apiurl).then((res) => {
      
			 var response = JSON.parse(res._bodyInit);	   
             
			  context.setState({image_count:response.length});
			  if(response.length==1){
				  context.setState({top_img:response[0].image_url})
			  }
			  else if(response.length>1){
				   context.setState({top_img:response[0].image_url})
				   context.setState({bottom_img:response[1].image_url})
			  }
			 
			
        }).catch((err) => {             
			console.log(err);
			//context.setState({error1:"no user with such phone registered"});           		
        });
  },
 getdata:function(apiurl){
	  var context = this;
		return new Promise(function(resolve, reject) {
			var location_route = apiurl;
		
			fetch(location_route, {
				 method: "GET",
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',						
						
					}
			}).then((response) => {
				
			 if(response.status==200){				
							
					return resolve(response);
			  }
			 else{								 
				   return reject();			
				
			  }			
			}).catch(function(err) {
				return reject();
			});
		});
  },
 
  render: function() {
	  var context=this;
	 

  if(context.state.image_count==110)	 {
    return (				
	 <View style={styles.container}> 
	    
		<View style={{ flex: .50,  borderColor:'red',borderWidth:2,flexDirection: 'column',}}> 
            <Image style={styles.bg} source={require('../images/Back_bg.png')} />
			  
			 <View style={{flex:.80,borderColor:'green', borderWidth:2,backgroundColor: 'transparent',}}>
			 
			 </View>
			 
			 <View style={{flex:.20,borderColor:'blue', borderWidth:2}}>
			   <Text>{this.props.locationname}</Text>
			 </View>
		  
		</View>
		
		<View style={{ flex: .50,  borderColor:'red',borderWidth:2,flexDirection: 'column',}}> 
            <Image style={styles.bg} source={require('../images/Back_bg.png')} />
			  
			 <View style={{flex:.80,borderColor:'green', borderWidth:2,backgroundColor: 'transparent',}}>
			 
			 </View>
			 
			 <View style={{flex:.20,borderColor:'blue', borderWidth:2}}>
			   <Text>{'Fragi name'}</Text>
			 </View>
		  
		</View>
		 
	 </View>
    );
  }
  else if(context.state.image_count==1111){
	  console.log(context.state.top_img);
	  return (				
	 <View style={styles.container}> 
	    
		<View style={{ flex: .50,  borderColor:'red',borderWidth:2,flexDirection: 'column',}}> 
            <Image style={styles.bg} source={{uri: context.state.top_img}} />
			  
			 <View style={{flex:.80,borderColor:'green', borderWidth:2,backgroundColor: 'transparent',}}>
			 
			 </View>
			 
			 <View style={{flex:.20,borderColor:'blue', borderWidth:2}}>
			   <Text>{this.props.locationname}</Text>
			 </View>
		  
		</View>
		
		<View style={{ flex: .50,  borderColor:'red',borderWidth:2,flexDirection: 'column',padding:2}}> 
            <Image style={styles.bg} source={require('../images/Back_bg.png')} />
			  
			 <View style={{flex:.80,borderColor:'green', borderWidth:2,backgroundColor: 'transparent',}}>
			 
			 </View>
			 
			 <View style={{flex:.20,borderColor:'blue', borderWidth:2}}>
			   <Text>{'Fragi name'}</Text>
			 </View>
		  
		</View>
		 
	 </View>
     );
  }
  else{
	   return (				
	 <View style={styles.container}> 
	    
		<View style={styles.view_part}> 
           
			<Image style={styles.bg} source={{uri: context.state.top_img}} />
			
			 <View style={{flex:.83,backgroundColor: 'transparent', }}>
			 
			 </View>
			 
			 <View style={styles.bar_part}>
			   <Text style={{color:'#FFF', top:6}}>{this.props.locationname}</Text>
			 </View>
		  
		</View>
		
		<View style={{ flex: .10, backgroundColor: '#FFF',flexDirection: 'row',}}> 
		  <View style={{flex:.35,  justifyContent: 'center',alignItems: 'center',flexDirection: 'row',}}>
		  <Image style={styles.home_left} source={require('../images/Home_left.png')} />
		  <Text style={{marginLeft:15,width:50, textAlign :'center' }}>{'middle'}</Text>
		  
		  </View>
		  <View style={{flex:.25, }}><Text>{''}</Text></View>
		  <View style={{flex:.40,justifyContent: 'center',alignItems: 'center',flexDirection: 'row',}}>
		      <Image style={styles.home_minus} source={require('../images/home_minus.png')} />
		        <Text style={{width:25, textAlign :'center' }}>{'2'}</Text>
		      <Image style={styles.home_minus} source={require('../images/home_plus.png')} />
	     </View>		  
		</View>
		
		
		<View style={styles.view_part}> 
           <Image style={styles.bg} source={{uri: context.state.bottom_img}} />
			  
			 <View style={{flex:.83,backgroundColor: 'transparent',}}>
			 
			 </View>
			 
			 <View style={styles.bar_part}>
			   <Text style={{color:'#FFF', top:6}}>{'Fragi name'}</Text>
			 </View>
		  
		</View>
		
		
		<View style={{ flex: .10, backgroundColor: '#FFF',flexDirection: 'row',}}> 
		  <View style={{flex:.35,  justifyContent: 'center',alignItems: 'center',flexDirection: 'row',}}>
		  <Image style={styles.home_left} source={require('../images/Home_left.png')} />
		  <Text style={{marginLeft:15,width:50, textAlign :'center',color:'#000' }}>{'middle'}</Text>
		  
		  </View>
		  <View style={{flex:.25, }}><Text>{''}</Text></View>
		  <View style={{flex:.40,justifyContent: 'center',alignItems: 'center',flexDirection: 'row',}}>
		      <Image style={styles.home_minus} source={require('../images/home_minus.png')} />
		        <Text style={{width:25, textAlign :'center' }}>{'2'}</Text>
		      <Image style={styles.home_minus} source={require('../images/home_plus.png')} />
	     </View>		  
		</View>
		
		
		
	 </View>
    );
  }
	
  },
});

var styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent',
	  padding:3,
	  paddingTop:5,	 
    },
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 350,
        height: 180,
	    borderRadius:7
    }, 
	top_header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .42,
         backgroundColor: 'transparent',       
    },
	view_part:{ flex: .40,
	borderColor:'#FFF',
	borderWidth:2,
	flexDirection: 'column',
	borderRadius:7},
	bar_part:{
		flex:.17,
		backgroundColor: '#000',
		opacity: 0.8, 
		borderRadius:4,
		paddingLeft:15},
   home_minus:{
		height:23,
		width:23,
	},
	home_left:{
		height:16,
		width:16,
	},
	home_go:{
		height:20,
		width:23,
	},
	border_line:{
		borderColor:'red',
		borderTopWidth:2,
		backgroundColor:'#FFF'
	}
})

AppRegistry.registerComponent('TodaymenuComponent', () => TodaymenuComponent);
module.exports = TodaymenuComponent;