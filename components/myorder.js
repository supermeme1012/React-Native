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
 1      3/19/16     Osipe          TaskNumber          Created
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
	
var Myordercomponent = React.createClass({
   getInitialState: function() { 
     var context=this;
	// var paymenttxt= context.getwallet();
    return {     	  
	  footbar:<Text>{""}</Text>,
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
  onaddwallet:function(){
	 this.props.navigator.push({ name: 'walletfull' });//
	 
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
					 <Text style={{color:'#f47239',fontSize:20}}>{'MyOrders'}</Text>
				   </View>

				   <View style={styles.right_navbar}>
					 <Text>{''}</Text>
				   </View>			 			   
			</View>		
			 <View style={{height:33, flexDirection:'row',justifyContent: 'center',
				alignItems:'center',}}>
			    <View style={{flex:.33,justifyContent: 'center',
					alignItems:'center',}}><Text style={{fontSize:15,fontWeight:'bold'}}>{'Date'}</Text></View>
			    <View style={{flex:.34,justifyContent: 'center',
					alignItems:'center',}}><Text style={{fontSize:15,fontWeight:'bold'}}>{'Amount'}</Text></View>
			    <View style={{flex:.33,justifyContent: 'center',
					alignItems:'center',}}><Text style={{fontSize:15,fontWeight:'bold'}}>{'Status'}</Text></View>
			 </View>
			 
			 
			 <View style={{flex:.90,paddingBottom:0}}>
			  <View style={{backgroundColor:'#FFF',flex:1}}>
			  
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
	
	 
})

AppRegistry.registerComponent('Myordercomponent', () => Myordercomponent);
module.exports = Myordercomponent;