"use strict";
/**
 ==================================================================================
 Description:       desc
 Creation Date:     3/21/16
 Author:            Osipe
 ==================================================================================
 Revision History
 ==================================================================================
 Rev    Date        Author           Task                Description
 ==================================================================================
 1      3/21/16     Osipe          TaskNumber          Created
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
	
//import MapView from 'react-native-maps';
	
var Confrimcomponent = React.createClass({
   getInitialState: function() { 
     var context=this;
	// var paymenttxt= context.getwallet();
    return {     
	  showwallet:true,
	  showcash:false,
	  showinterbank:false,
	  showcards:false,
	  content:<Text>{"sss"}</Text>,
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
  ontrackmyorder:function(){
	  this.props.navigator.push({ name: 'trackmyorder' });
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
					 <Text style={{color:'#f47239',fontSize:20}}>{'Confirmation'}</Text>
				   </View>

				   <View style={styles.right_navbar}>
					 <Text>{''}</Text>
				   </View>			 			   
			</View>		
			
			 <View style={{flex:.53,padding:7,paddingBottom:0,}}>
			  
				 <View style={{backgroundColor:'#FFF',flex:1,padding:20,paddingLeft:40,paddingRight:60}}>
			     <View style={{flex:1,flexDirection:'column'}}>
				    <View style={{flex:.18,justifyContent: 'center',alignItems:'center',}}>
					  <Text style={{fontSize:25,}} >{'Thank you'}</Text>
					
					</View>
				    <View style={{flex:.28,justifyContent: 'center',alignItems:'center',paddingLeft:45,paddingRight:45}}>
					  <Text style={{fontSize:12,textAlign:'center'}}>
					     {"Your order is complete!      We'll send you a text with your ETA soon."}
					  </Text>
					</View>
					
					 <View style={{flex:.18,justifyContent: 'center',alignItems:'center'}}>
					   <View stlye={{borderWidth:2,borderColor:'red',borderBottomColor:'#000'}}>	
					     <Text>{''}</Text>
			           </View>
					 </View>
					
				    <View style={{flex:.18,justifyContent: 'center',alignItems:'center'}}>
					  <Text style={{fontSize:12,textAlign:'center'}}>{'You can track your order  here'}</Text>					  
					</View>
					
				   
					
				    <View style={{flex:.18,paddingLeft:5,paddingRight:5,}}>
					
					  <View style={{backgroundColor:'#f47239',justifyContent: 'center',alignItems:'center',flex:1,borderRadius:5}}>
					    <TouchableOpacity  onPress={this.ontrackmyorder}>
							<Text style={{fontSize:15,color:'#FFF',}}>{'Track my Order'}</Text>
						</TouchableOpacity>
					  </View>
					  
					</View>
					
				 </View>
			   </View>
			   
			 </View> 
			
			 
			 <View style={{flex:.47,padding:6,paddingBottom:5,justifyContent: 'center',alignItems:'center',flexDirection:'column'}}>
			     <Text style={{fontSize:12,padding:3}}>{'For support'}</Text>
				 <Text style={{fontSize:15,padding:3}}>{'1800 1700 1600'}</Text>
				 <Image style={{width:35,height:35,top:5}} 
				 source={require('../images/confirm_phone.png')}/>

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
	
	 
})

AppRegistry.registerComponent('Confrimcomponent', () => Confrimcomponent);
module.exports = Confrimcomponent;