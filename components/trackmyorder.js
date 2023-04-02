"use strict";
/**
 ==================================================================================
 Description:       desc
 Creation Date:     3/17/16
 Author:            Osipe
 ==================================================================================
 Revision History
 ==================================================================================
 Rev    Date        Author           Task                Description
 ==================================================================================
 1      3/17/16     Osipe          TaskNumber          Created
 ==================================================================================
 */
var React = require('react-native');
var {NativeModules} = require('react-native');
var server_auth = require('./server_auth');
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
	DrawerLayoutAndroid,
	
	} = React;
	
var MapView = require('react-native-maps');


var { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

	
var Trackmyorder = React.createClass({
   getInitialState: function() { 
     var context=this;
	// var paymenttxt= context.getwallet();
    return {     
	 LATITUDE :11.0154863,LONGITUDE :76.9538486,
	 
    }
  },
 
  onsubmitpress: function(){
	  var context = this;
	  console.log("submit");
	  context.password_recovery("https://rivo.herokuapp.com/", this.state.phone).then((res) => {
           //	context.props.setState.user_inf	=res;			
			
			context.setState({error1:"555"});
            context.drawer.closeDrawer(); 
            
        }).catch((err) => {         
             
			context.setState({error1:"no user with such phone registered"});
           		
        });		 
  },
  onBackPress:function(){
	   this.props.navigator.pop();
  },
  onproceedpayment:function(){
	  this.props.navigator.push({ name: 'deliverto' });
  }, 
	 
  render: function() {
	   
	  
         return (           
									
		  <View style={styles.container}>       
		  
		
            <View style={styles.header_havbar}>       
			 
				 <View style={styles.left_navbar}>
				   <TouchableOpacity  onPress={this.onBackPress}>
					 <Image style={styles.Menu_btn} source={require('../images/back.png')}></Image>
				   </TouchableOpacity>		  
				  </View>			  
				   <View style={styles.center_navbar}>
					 <Text style={{color:'#f47239',fontSize:20}}>{'Track my Order'}</Text>
				   </View>

				   <View style={styles.right_navbar}>
					 <Text>{''}</Text>
				   </View>			 			   
			</View>		
			
			 <View style={{flex:.85,padding:7,paddingBottom:0,}}>
			    <View style={{flex:1}} >
			     <MapView
					  ref="map"
					  style={styles.map}
					  initialRegion={{
						latitude: this.state.LATITUDE,
						longitude: this.state.LONGITUDE,
						latitudeDelta: LATITUDE_DELTA,
						longitudeDelta: LONGITUDE_DELTA,
					  }}
					  >
					
					<MapView.Marker
						coordinate={{
						  latitude: this.state.LATITUDE + SPACE,
						  longitude: this.state.LONGITUDE + SPACE,
						}}
						centerOffset={{ x: -18, y: -60 }}
						anchor={{ x: 0.69, y: 1 }}
						image={require('../images/flag-pink.png')}
						/>
					</MapView>	
			  </View>
				 
			   
			 </View> 
			
			 
			 <View style={{flex:.15,backgroundColor:'#FFF' ,alignItems:'center',flexDirection:'row'}}>
			   
               <View style={{flex:.50,flexDirection:'row',overflow :'visible',}}>
			      <View  style={{flex:.35,justifyContent: 'center',
		alignItems:'center',}}>
				      <Image style={{width:30,height:30,}} 
				    source={require('../images/transformer.png')}/>
				  
				  </View>
			      <View  style={{flex:.30,justifyContent: 'center',
		alignItems:'center',}}>
					
				 <Text  >{'15 min'}</Text>
				 </View>
				 
				 <View style={{flex:.35,justifyContent: 'center',
		alignItems:'center',}}>
				    <Image style={{width:30,height:30,}} 
				      source={require('../images/deliver_home.png')}/>
				 </View>
					
			   </View>
			   
			   
				<View style={{flex:.50,flexDirection:'row'}}>
				 <Image style={{width:30,height:30,left:5}} 
				 source={require('../images/trackorder_home.png')}/>
				 <Text style={{left:25,top:3}}>{'Call Driver'}</Text>
			   </View>
			 </View>
			
			
			
          </View>
		
         );
		
  },
  
});

var styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent'
    },   
    header_havbar: {
        flexDirection: 'row',
		height:53,			  
        backgroundColor: '#FFF',
        borderColor: '#FFF',  
        borderBottomColor: '#CCC',
        borderWidth:2,     
     },
	left_navbar:{		
		flex:.15,
		justifyContent: 'center',
		alignItems:'center',
		
	},
	right_navbar:{		
		flex:.15,
		justifyContent: 'center',
		alignItems:'center',
		
	},
	Menu_btn:{
	  width: 20,
	  height: 15,
	  marginLeft:20
	},
	 center_navbar:{
		paddingLeft:40,
		paddingRight:40,
		flexDirection:'row',		
		flex:.70,
		justifyContent: 'center',
		alignItems:'center', 
		
	 },
	  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
	 
})

AppRegistry.registerComponent('Trackmyorder', () => Trackmyorder);
module.exports = Trackmyorder;