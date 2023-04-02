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
	
var Paymemtcomponent = React.createClass({
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
  onproceedpayment:function(){
	  this.props.navigator.push({ name: 'confirmpay' });
  },
  onwallet:function(){
	  this.setState({showwallet:true,showcash:false,showcards:false,showinterbank:false});
	  var paymenttxt= this.getwallet();
  },
  oncash:function(){
	this.setState({showwallet:false,showcash:true,showcards:false,showinterbank:false});
	 var paymenttxt= this.getwallet();
  },
  oncards: function(){
	  this.setState({showwallet:false,showcash:false,showcards:true,showinterbank:false});
	  var paymenttxt= this.getwallet();
  },
  oninterbank:function(){
	  this.setState({showwallet:false,showcash:false,showcards:false,showinterbank:true});
	  var paymenttxt= this.getwallet();
  },
  getwallet:function(){
	  var context=this;
	  
	  if(context.state.showwallet)
	   var paycontent=<Text style={{width:100}}>{"current balence"}</Text>
      else if(context.state.showcards)
		var paycontent=<Text style={{width:100}}>{"show cards"}</Text> 
	  else if(context.state.showcash){
		var paycontent=<Text style={{width:100}}>{"show cashs"}</Text> 
	  }
	  else{
		var paycontent=<Text style={{width:100}}>{"show internet bank"}</Text> 
	  }
	
	context.setState({content:paycontent});
		
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
					 <Text style={{color:'#f47239',fontSize:20}}>{'Payment'}</Text>
				   </View>

				   <View style={styles.right_navbar}>
					 <Text>{''}</Text>
				   </View>			 			   
			</View>		
			
			 <View style={{flex:.35,padding:7,paddingBottom:0,}}>
			   <View style={{backgroundColor:'#FFF',flex:1,
			   paddingBottom:0,borderWidth:2,borderColor:'#FFF',borderBottomColor:'#CCC'}}>
			     
				 <View style={{flex:.15, flexDirection: 'column'}}>
				 
						<View style={styles.tabbar}>
						 <TouchableOpacity  style={{flex: .20,
							 justifyContent: 'center', 
							 alignItems:'center',
							 borderColor:'#FFF',
							 borderBottomColor:'#f47239',
							 borderWidth:this.state.showwallet?2:0}} 
							 onPress={this.onwallet}>
						 
							<Text style={{fontSize:14,}}>Wallet</Text>
						  </TouchableOpacity>
						  
						  <TouchableOpacity style={{flex:.20,
						  justifyContent: 'center',
						  alignItems:'center',
						  borderColor:'#FFF',
						  borderBottomColor:'#f47239',
						  borderWidth:this.state.showcash==true?2:0}} 
						  onPress={this.oncash}>						 
							<Text style={{fontSize:14,}}>Cash</Text>
						  </TouchableOpacity>
						 
						   <TouchableOpacity style={{flex:.20,
						   justifyContent: 'center',
						   alignItems:'center',
						  borderColor:'#FFF',
						  borderBottomColor:'#f47239',
						  borderWidth:this.state.showcards?2:0}} 
						  onPress={this.oncards}>
						   
							<Text style={{fontSize:14,}}>Cards</Text>
						   </TouchableOpacity>
						   
						   <TouchableOpacity style={{flex:.40,
						   justifyContent: 'center',
						   alignItems:'center',
						   borderColor:'#FFF',
						   borderBottomColor:'#f47239',
						   borderWidth:this.state.showinterbank?2:0}} 
						   onPress={this.oninterbank}>
						   
							<Text style={{fontSize:14,}}>Internet Banking</Text>
						   </TouchableOpacity>
						   
						  	   
						 </View>
				 
				 </View>
				 
				 <View style={{flex:.85,justifyContent: 'center', alignItems:'center',}}>
					 {this.state.content}
				 </View>
			   
			   </View>
			 </View> 
			
			 
			 <View style={{flex:.40,padding:6,paddingBottom:5,}}>
			   <View style={{flex:1,backgroundColor:'#FFF',flexDirection: 'column',padding:10,paddingBottom:0,
			   borderWidth:2,borderColor:'#FFF',borderBottomColor:'#CCC'}}>
			       <View style={{flex:.18,}}>
				       <Text style={{fontSize:15,marginLeft:15,}}>{'Promo Code'}</Text>
				   </View>
				   
			       <View style={{flex:.28,flexDirection:'row'}}>
			           <View style={{flex:.50,top:10}}>
							 <TextInput						   
							  style={{ alignItems: 'flex-end',width:260,height:35,padding:1,marginLeft:15,}}
							  placeholder="RIVOFA100"
							  placeholderTextColor="#d6d4d4"							 
							  onChangeText={(text) => this.setState({password:text})}/>
						</View>
						
						<View style={{ alignItems: 'flex-end',flex:.50,top:10}}>
						  <TouchableOpacity >						
						 <Text style={{fontSize:15,marginRight:10,color:'#f47239'}}>{'Apply'}</Text>
						  </TouchableOpacity >
				        </View>
				   </View>
				   
			       <View style={{flex:.18,flexDirection:'row'}}>
				     
				       <View style={{flex:.50,top:3}}>
						  <Text style={{fontSize:15,marginLeft:15,}}>{'Total'}</Text>
						</View>
						
						<View style={{ alignItems: 'flex-end',flex:.50,top:10}}>
						<Text style={{fontSize:15,marginRight:10}}>{'Rs547'}</Text>
				        </View>
						
				   </View>
				   
			       <View style={{flex:.18,flexDirection:'row'}}>
				          <View style={{flex:.50,top:3}}>
						   <Text style={{fontSize:15,marginLeft:15,color:'green'}}>{'Discount'}</Text>
						  </View>
						
						 <View style={{ alignItems: 'flex-end',flex:.50,top:10}}>
						   <Text style={{fontSize:15,marginRight:10,color:'green'}}>{'-100'}</Text>
				         </View>
				   </View>
				   
			       <View style={{flex:.18,flexDirection:'row'}}>
				        <View style={{flex:.50,top:3}}>
						   <Text style={{fontSize:15,marginLeft:15,borderWidth:1}}>{'Payable'}</Text>
						  </View>
						
						 <View style={{ alignItems: 'flex-end',flex:.50,top:5}}>
						  <Text style={{fontSize:15,marginRight:10}}>{'R.447'}</Text>
				         </View>
				   
				   </View>
			   </View>
			 </View>
			 
			 <View style={{flex:.15,}}>				 
			   
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

AppRegistry.registerComponent('Paymemtcomponent', () => Paymemtcomponent);
module.exports = Paymemtcomponent;