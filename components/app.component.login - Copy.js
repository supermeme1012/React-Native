"use strict";
/**
 ==================================================================================
 Description:       desc
 Creation Date:     3/10/16
 Author:            Osipe
 ==================================================================================
 Revision History
 ==================================================================================
 Rev    Date        Author           Task                Description
 ==================================================================================
 1      3/10/16     Osipe          TaskNumber          Created
 ==================================================================================
 */
var React = require('react-native');
var {NativeModules} = require('react-native');
var FBLogin = require('react-native-facebook-login');
var server_auth = require('./server_auth');
var FBLoginManager = NativeModules.FBLoginManager; // if needed

var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
	Image,
	TouchableOpacity
	} = React;

var LoginComponent = React.createClass({
   getInitialState: function() {
    return {
      username: '',
      password: ''
    }
  },
  login_check:function(){
	  	var context=this;	
		context.setState({ login_state: true});
		var context = this;
        server_auth.authenticate_username_password("https://rivo.herokuapp.com/", this.state.username, this.state.password).then(() => {
           // if (this.props.on_auth_successful) {
			console.log("login ok");
             //   this.props.on_auth_successful();
            //}
        }).catch((err) => {
            if (err == "INVALID_CREDENTIALS") {
                context.setState({error:"Invalid credentials"});
            }
            else {
                context.setState({error:err});
            }
			
        });
		  
		  //context.props.on_auth_successful();
  },
  render: function() {
    return (
        <View style={styles.container}>
            <Image style={styles.bg} source={require('../images/Back_bg.png')} />
		
            <View style={styles.header}>
          
            </View>
            <View style={styles.inputs}>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputUsername} source={require('../images/iVVVMRX.png')}/>
                    <TextInput 
                        style={[styles.input, styles.blackFont]}
                        placeholder="Enter your mobile number"
                        placeholderTextColor="#d6d4d4"
                        onChangeText={(text) => this.setState({username:text})}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputPassword} source={require('../images/ON58SIG.png')}/>
                    <TextInput
                        password={true}
                        style={[styles.input, styles.blackFont]}
                        placeholder="Password"
                        placeholderTextColor="#d6d4d4"
                        onChangeText={(text) => this.setState({password:text})}
                    />
                </View>
                <View style={styles.forgotContainer}>
                    <TouchableOpacity >
					<Text style={styles.yellowFont}>Forgot Password?</Text>
					</TouchableOpacity>
                </View>
				
				<View style={styles.signin}>   
				  <TouchableOpacity onPress={this.login_check}>				
					<Text style={styles.whiteFont}>Sign In</Text>	
				  </TouchableOpacity>					
			    </View>
				
				 <View style={styles.FBfont}>                 
					<FBLogin style={styles.FBLogin}/>				   
			    </View>
		   </View>
		   
		
           
            <View style={styles.signup}>
                <View>
				<Text style={styles.greyFont}>Don't have an account? </Text></View>
				<View >
				<TouchableOpacity><Text style={styles.yellowFont}>       Register</Text></TouchableOpacity></View>
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
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height,
		justifyContent: 'center',      
		alignItems: 'stretch',
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .45,
         backgroundColor: 'transparent'
       // backgroundColor: 'red'
    },
    mark: {
        width: 150,
        height: 150
    },
    signin: {
        backgroundColor: '#f46527',
        padding: 12,        
		top:8,  
        alignItems: 'center',
		borderTopRightRadius :5,
		borderTopLeftRadius :5,
		borderBottomLeftRadius :5,
		borderBottomRightRadius :5,
    },
	signinbox:{
		backgroundColor: 'red',
		marginLeft:10,
		marginRight:10,
	},
    signup: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: .10,
	  flexDirection: 'row',
     
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        flex: .45,
		padding:5,
		paddingLeft:40,
		paddingRight:40,
		paddingBottom:5,		
    },
    inputPassword: {
        marginLeft: 1,
        width: 20,
        height: 21
    },
    inputUsername: {
      marginLeft: 1,
      width: 20,
      height: 20
    },
    inputContainer: {
        padding: 10,
        borderWidth: 1,
        borderBottomColor: '#CCC',
        borderColor: 'transparent',      
	    height:50,
		
    },
    input: {
        position: 'absolute',
        left: 41,
        top: 10,
        right: 0,
        height: 47,
        fontSize: 16,
		paddingBottom:22,
	
    },
    forgotContainer: {
      alignItems: 'flex-end',
      padding: 10,
	  paddingRight:0,
	
    },
    greyFont: {
      color: '#424242'
    },
    whiteFont: {
      color: '#FFF'
    },
	blackFont:{
		color:'#000'
	},
	yellowFont:{
	  
		color:'#ffbd54'
	},
	signFont:{
		color: '#FFF',		
	},
	FBfont:{
		top:15,
		paddingTop:10,		
	},
	FBLogin:{
		borderTopRightRadius :5,
		borderTopLeftRadius :5,
		borderBottomLeftRadius :5,
		borderBottomRightRadius :5,
	}
	
	
	
})

AppRegistry.registerComponent('LoginComponent', () => LoginComponent);
module.exports = LoginComponent;