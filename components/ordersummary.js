"use strict";
/**
 ==================================================================================
 Description:       desc
 Creation Date:     3/20/16
 Author:            Osipe
 ==================================================================================
 Revision History
 ==================================================================================
 Rev    Date        Author           Task                Description
 ==================================================================================
 1      3/20/16     Osipe          TaskNumber          Created
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
	
var Ordersummarycomponent = React.createClass({
   getInitialState: function() { 
    return {     
	   mapRegion: undefined,
      mapRegionInput: undefined,
      annotations: [],
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
	  this.props.navigator.push({ name: 'payment' });
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
					 <Text style={{color:'#f47239',fontSize:20}}>{'Order Summery'}</Text>
				   </View>

				   <View style={styles.right_navbar}>
					 <Text>{''}</Text>
				   </View>			 			   
			</View>			   
			 <View style={{flex:.40,padding:6,paddingBottom:0,}}>
			   <View style={{backgroundColor:'#FFF',flex:1,padding:12}}>
			      <View style={{flex:1,  flexDirection: 'column'}}>
				   <View style={{flexDirection: 'row'}}>
				   <Text stlye={{flex:.50}}>{11}</Text>
				   <Text stlye={{flex:.50}}>{22}</Text>
				   </View>
				  </View>
			   
			   </View>
			 </View> 
			 <View style={{flex:.10,padding:6,paddingTop:0}}>
			   <View style={{flex:1,paddingTop:15,flexDirection: 'row'}}>
			     <Image style={styles.bg} source={require('../images/order_barbottom.png')}/>
				
				<View style={{flex:.50}}>
				  <Text style={{fontSize:15,fontWeight:'bold',marginLeft:15,borderWidth:1}}>{'Total'}</Text>
				</View>
				
				<View style={{ alignItems: 'flex-end',flex:.50}}>
				   <Text style={{fontSize:15,fontWeight:'bold',marginRight:10,right:10}}>{'RS 547'}</Text>
				</View>
			   </View>
			   
			 </View> 
			 
			 <View style={{flex:.25,flexDirection: 'row'}}>
			    <View style={{flex:.40,justifyContent: 'center',left:25 }}>
				  <Text>{'Deliver to'}</Text>
				</View>
				 
				<View style={{flex:.60,justifyContent: 'center',alignItems:'center',paddingRight:25 }}>
				  <Text style={{width:200}}>{'16/2 Krishnappa garden 28th Main, Puttappa layout, New Thippasadra Bengalluru'}</Text>
				</View>
			 </View>
			 
			 <View style={{flex:.25,paddingBottom:20}}>
			   <View style={{backgroundColor:'#FFF',flex:1,flexDirection: 'column'}}>
			     <View style={{flex:.20,flexDirection: 'row',paddingTop:10}}>
				    <Text style={{left:20,fontSize:15,fontWeight:'bold'}}>{'Comments'}</Text>
					<Text style={{left:20}}>{'(optional)'}</Text>
				 </View>
				 <View style={{flex:.80,justifyContent: 'center',
		                alignItems:'center'}}>
				    <TextInput 
                        style={{height:250,width:340,}}
                        placeholder="Typle your comments here"
                        placeholderTextColor="#d6d4d4"
						multiline ={true}
						autoCapitalize="none"
						 autoCorrect={false}
						clearButtonMode="always"
						
                        onChangeText={(text) => this.setState({searchtxt:text})}
						
                     />
				 </View>
				 
			   </View>
			 </View>
			
			
			 
			 <View style={{backgroundColor:'#f47239',flex:.10, justifyContent: 'center',alignItems:'center',}}>
			    <TouchableOpacity  onPress={this.onproceedpayment}>
			      <Text style={{fontSize:15,color:'#FFF',fontWeight:'bold'}}>{'Place Order'}</Text>
			   </TouchableOpacity>
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
	 bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        height:55,
		width:348,
        right:5,
		overflow: 'visible'
		//justifyContent: 'center',      
		//alignItems: 'stretch',
    },
	
	 
})

AppRegistry.registerComponent('Ordersummarycomponent', () => Ordersummarycomponent);
module.exports = Ordersummarycomponent;