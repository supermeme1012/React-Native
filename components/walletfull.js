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
	
var Walletfullcomponent = React.createClass({
   getInitialState: function() { 
     var context=this;
	// var paymenttxt= context.getwallet();
    return {  
	  showcredit:true,
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
	 this.props.navigator.push({ name: 'placefold' });//
	 
  }, 
  ondebit:function(){
		var content=this;
		content.setState({showinternetbank:false,showcredit:true});
  },
  oninterbank : function(){
	  var content=this;
		content.setState({showinternetbank:true,showcredit:false});
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
					 <Text style={{color:'#f47239',fontSize:20}}>{'Wallet'}</Text>
				   </View>

				   <View style={styles.right_navbar}>
					 <Text>{''}</Text>
				   </View>			 			   
			</View>		
			
			 <View style={{flex:.40,padding:7,paddingBottom:0,}}>
			  
				 <View style={{backgroundColor:'#FFF',flex:1,padding:20,paddingLeft:40,
				 paddingRight:60,paddingBottom:40,borderColor:'#FFF',borderWidth:2,borderBottomColor:'#CCC'}}>				 
			      
				  <View style={{flex:1,flexDirection:'column'}}>
				  
				    <View style={{flex:.30,justifyContent: 'center',alignItems:'center',}}>
					  <Text style={{fontSize:12,}} >{'Current Balence'}</Text>
					
					</View>
					
				    <View style={{flex:.70,justifyContent: 'center',alignItems:'center',paddingLeft:45,paddingRight:45}}>
					  <Text style={{fontSize:20,textAlign:'center'}}>
					     {"RS165"}
					  </Text>
					</View>					
				   
					
				    <View style={{height:35,paddingLeft:5,paddingRight:5,}}>
					
					  <View style={{backgroundColor:'#f47239',justifyContent: 'center',alignItems:'center',flex:1,borderRadius:5}}>
					    <TouchableOpacity  >
							<Text style={{fontSize:15,color:'#FFF',}}>{'Add Money'}</Text>
						</TouchableOpacity>
					  </View>					  
					</View>
					
				 </View>
			   </View>
			   
			 </View> 			
			 
			  <View style={{flex:.60,padding:7,}}>   
			   <View style={{flex:1,flexDirection:'column',borderWidth:2,borderBottomColor:'#CCC',borderColor:'#FFF'}}>
			       
				   <View style={{flex:.20,
				   padding:5,
				   justifyContent:'center',		   
				  
				   }}>
				   
				       <View style={{flex:.1,backgroundColor:'#FFF', justifyContent: 'center',
						  alignItems:'center',}}>
						   <TextInput 
							style={{height:40,width:280,}}
							placeholder="Enter the amount you want to add"
							placeholderTextColor="#d6d4d4"						
							autoCapitalize="none"
							 autoCorrect={false}
							clearButtonMode="always"						
							onChangeText={(text) => this.setState({amount:text})}
							></TextInput>
						</View>
						
				   </View> 
				   
				   <View style={{flex:.80,flexDirection:'column'}}>
				      <View style={{flex:.15}}>
					     <View style={styles.tabbar}>
						       
						  <TouchableOpacity  style={{flex: .50,
							 justifyContent: 'center', 
							 alignItems:'center',
							 borderColor:'#FFF',
							 borderBottomColor:'#f47239',
							 borderWidth:this.state.showcredit?2:0}} 
							 onPress={this.ondebit}>
						 
							<Text style={{fontSize:14,}}>{'Debit/Credit Cards'}</Text>
						  </TouchableOpacity>
						  
						  <TouchableOpacity style={{flex:.50,
						  justifyContent: 'center',
						  alignItems:'center',
						  borderColor:'#FFF',
						  borderBottomColor:'#f47239',
						  borderWidth:this.state.showinternetbank==true?2:0}} 
						  onPress={this.oninterbank}>						 
							<Text style={{fontSize:14,}}>{'Internet Banking'}</Text>
						  </TouchableOpacity>
							   
							   
							   
						 </View>
					  
					  </View>
					  
					  
					  <View style={{flex:.85}}>
					  
					  </View>
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
	   tabbar:{
	  flexDirection: 'row',      
      backgroundColor: '#FFF',	
	  borderColor: '#FFF', 
	  borderBottomColor: '#DDD',
      borderWidth:1.6    ,
	  flex:1
	  
   },
	 
})

AppRegistry.registerComponent('Walletfullcomponent', () => Walletfullcomponent);
module.exports = Walletfullcomponent;