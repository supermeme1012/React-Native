"use strict";
/**
 ==================================================================================
 Description:       desc
 Creation Date:     3/18/16
 Author:            Osipe
 ==================================================================================
 Revision History
 ==================================================================================
 Rev    Date        Author           Task                Description
 ==================================================================================
 1      3/18/16     Osipe          TaskNumber          Created
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
	ListView,
	TouchableHighlight
	} = React;
	

	
var MapView = require('react-native-maps');
var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');

var { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;



/***/
var geocod={'ONDIPUDUR':{"lat" : 11.0104033,"lng" : 76.94990279999999},
            "VASANTHAMILL" : {"lat" : 11.001336,"lng" : 77.03410079999999},
            "NEELIKONAMPALAYAM" : { "lat" : 11.0199304, "lng" : 77.0420541},
            "SINGANALLUR" : {  "lat" : 11.3657808,  "lng" : 77.5332796},
            "UPPILIPALAYAM" : { "lat" : 11.0126165,"lng" : 77.0190056},
            "RAMANATHA PURAM" : { "lat" : 10.9974549,"lng" : 76.9915961},
            "NANJUNDAPURAM" : {  "lat" : 10.972417,  "lng" : 76.9908379},
            "SOWRIPALYAM" : {"lat" : 11.0013763,"lng" : 76.99494199999999},
            "PULIYAKULAM" : { "lat" : 11.0003174, "lng" : 76.9875692},
            "OLAMBUS" : {"lat" : 11.0003174, "lng" : 76.9875692}, ////
            "SUNGAM" : {"lat" : 10.9917275,"lng" : 76.9898676},
            "TOWNHALL" : { "lat" : 22.5540312, "lng" : 72.95093129999999},			
            "SELVAPURAM" : {"lat" : 10.9877242, "lng" : 76.9333826},
            "TELUNGUPALAYA" : { "lat" : 11.1798966,   "lng" : 77.0782864},
			
            "KUNIYAMUTHUR" : {"lat" : 10.933127, "lng" : 76.939657},
            "KALAVAI" : { "lat" : 12.7674633,  "lng" : 79.4169356},
            "ATHUPALAM" : {"lat" : 10.9746942,"lng" : 76.9618756},
			
            "SUNDARAPURAM" : {"lat" : 8.4816699, "lng" : 78.02167919999999},
            "KURUCH" : {"lat" : 10.9642427,  "lng" : 76.97006689999999},            
            "KARUMBUKADAI" : {"lat" : 10.8415015,  "lng" : 76.91470889999999},
            "UKKADAM" : {"lat" : 10.9902127,       "lng" : 76.96286580000002},
			
			

};

var DelivertoComponent = React.createClass({
   getInitialState: function() { 
     var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});  
	 var context=this;
	console.log(geocod['ONDIPUDUR']);
   return {     
	  dataSource: ds.cloneWithRows(this.deliverlocat_items({})),
	   LATITUDE :11.0154863,LONGITUDE :76.9538486,searchtxt:'Search for Location',markshow:false,
    }
  },
  deliverlocat_items:function(){
	   var locat_items=[];	
	  locat_items.push('ONDIPUDUR');
	  locat_items.push('VASANTHAMILL');
	  locat_items.push('NEELIKONAMPALAYAM');
	  locat_items.push('SINGANALLUR');
	  locat_items.push('UPPILIPALAYAM');
	  locat_items.push('RAMANATHA PURAM');
	  locat_items.push('NANJUNDAPURAM');
	  locat_items.push('SOWRIPALYAM');
	  locat_items.push('PULIYAKULAM');
	  locat_items.push('OLAMBUS');
	  locat_items.push('SUNGAM');
	  locat_items.push('TOWNHALL');
	  locat_items.push('SELVAPURAM');
	  locat_items.push('TELUNGUPALAYA');
	  
	  
	  locat_items.push('KUNIYAMUTHUR');
	  locat_items.push('KALAVAI');
	  locat_items.push('ATHUPALAM');
	  
	  locat_items.push('SUNDARAPURAM');
	  locat_items.push('KURUCH');
	  locat_items.push('KARUMBUKADAI');
	  locat_items.push('UKKADAM');
	  
	  
	  
	  return locat_items
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
  onPlaceorder:function(){
	  this.props.navigator.push({ name: 'ordersummary' });
  },
  onsearchlocation :function(){
	  var context=this;
	  context.drawer.openDrawer();
  },
  location_list: function(){
	  return (
	    <View style={{height:230,paddingLeft:20,paddingRight:20}}>
		  <View style={{backgroundColor:'#FFF',flex:1,paddingTop:5}}>
		   
		   <ListView 
			  dataSource={this.state.dataSource}					  
			  renderRow={this._renderRow}
			  keyboardDismissMode="on-drag"
			/>
			  
		  </View>
		</View>
	  )
  },
_renderRow:function(rowData: string, sectionID: number, rowID: number){
	var context=this;
	
	return(
	   <View style={{backgroundColor:'#FFF', justifyContent: 'center', alignItems: 'center',
	   shadowColor:'red',shadowOpacity:0.8,shadowRadius:5,shadowOffset:{height:4,width:0}}}>
	   
	    <View style={{width:270,height:25,justifyContent: 'center', alignItems: 'center',		
		borderColor:'#FFF',borderBottomColor:'#CCCCCC', borderWidth:1,		
		}}> 
		 <TouchableHighlight onPress={() => this._pressRow_submenu(rowID,rowData)}>
		   <Text style={styles.text}>
		     {rowData}
		   </Text>
		  </TouchableHighlight>		 
		 </View>		
	   </View>
	);
	
},
_pressRow_submenu :function (rowID,rowData){  //when location is clicked
	
	var context=this;
	context.setState({LATITUDE:geocod[rowData]['lat']});
	context.setState({LONGITUDE:geocod[rowData]['lng']});
	context.setState({searchtxt:rowData})
	context.drawer.closeDrawer(); 
},
marker_make :function(){
	return(
	  <MapView.Marker
						coordinate={{
						  latitude: this.state.LATITUDE + SPACE,
						  longitude: this.state.LONGITUDE + SPACE,
						}}
						centerOffset={{ x: -18, y: -60 }}
						anchor={{ x: 0.69, y: 1 }}
						image={require('../images/flag-blue.png')}
						/>
	);
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
					 <Text style={{color:'#f47239',fontSize:20}}>{'Deliver to'}</Text>
				   </View>

				   <View style={styles.right_navbar}>
					 <Text>{''}</Text>
				   </View>			 			   
			</View>	
		   <ScrollView key={'scrollView'} horizontal={false} 
			  style={{backgroundColor:'#FFF',borderWidth:1,height:75}}			 		 
			>
				  
				<GooglePlacesAutocomplete
					placeholder='Search'
					minLength={2} // minimum length of text to search
					autoFocus={false}
					fetchDetails={true}
					onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
					console.log(data);
					console.log(details);
					
					
				
					console.log(details['name']);
					
					this.setState({LATITUDE:details['geometry']['location']['lat']});
					this.setState({LONGITUDE:details['geometry']['location']['lng']});
					
					
					  }}
					getDefaultValue={() => {
					  return ''; // text input default value
					}}
					query={{
					  // available options: https://developers.google.com/places/web-service/autocomplete
					  key: 'AIzaSyBO3Jc2pDHH1NunQTridZJuqDX2vPgCAy4',
					  language: 'en', // language of the results
					  types: '(cities)', // default: 'geocode'
					}}
					styles={{
					  description: {
						fontWeight: 'bold',
					  },
					  predefinedPlacesDescription: {
						color: 'green',
					  },
					}}
					
					currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
					currentLocationLabel="Current location"
					nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
					GoogleReverseGeocodingQuery={{
					  
					 // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
					}}
					GooglePlacesSearchQuery={{
					  // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
					  rankby: 'distance',
					  types: 'food',
					}}
					
					
					filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
					
					predefinedPlaces={[]}
					
					predefinedPlacesAlwaysVisible={true}
				  />
				
				
             </ScrollView>
			 <View style={{flex:.65}}>
			     
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
						image={require('../images/flag-blue.png')}
						/>
					</MapView>			   
				
				 
			 </View>
			 <View style={{flex:.25,backgroundColor:'#FFF',flexDirection: 'column',}}>
			   <View style={{flex:.30,flexDirection: 'row',paddingLeft:15}}>
			      <Image style={{width:30,height:30,marginLeft:20,right:15,top:10}} source={require('../images/deliver_home.png')}/>
                    <TextInput
                       
                        style={{ alignItems: 'flex-end',width:270,height:45,padding:3}}
                        placeholder="Mobile number"
                        placeholderTextColor="#d6d4d4"
					     value={this.state.password}
                        onChangeText={(text) => this.setState({password:text})}
                    />
				</View>
				<View style={{flex:.30}}>
				   <TextInput
                        
                        style={{ left:65,alignItems: 'flex-end',width:270,height:45,padding:3}}
                        placeholder="Door number"
                        placeholderTextColor="#d6d4d4"
					     value={this.state.password}
                        onChangeText={(text) => this.setState({password:text})}
                    />
				</View>
				<View style={{flex:.40}}>
				   <Text style={{ left:65,width:270,height:45,padding:3,top:15,fontSize:13,paddingBottom:10,}}
                   >{'Puttapa Lyaout New Thipasada, Bengarula'}</Text>
				</View>
			 </View>
			 <View style={{backgroundColor:'#f47239',flex:.10, justifyContent: 'center',alignItems:'center',}}>
			    <TouchableOpacity  onPress={this.onPlaceorder}>
			      <Text style={{fontSize:15,color:'#FFF',fontWeight:'bold'}}>{'Proceed to Payment'}</Text>
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
	  marginLeft:20,
	},
		text: {
    flex: 1,
    fontSize:12,
    color:'#f47239',
   },
	 center_navbar:{
		paddingLeft:40,
		paddingRight:40,
		flexDirection:'row',		
		flex:.70,
		justifyContent: 'center',
		alignItems:'center', 
		
	 },
	 search_bar:{
		height:85,
		backgroundColor: '#FFF',
		
		borderBottomColor: '#CCC',
		borderWidth:2,
		justifyContent: 'center',
		alignItems:'center', 
		flexDirection: 'row',
		borderColor:'red',
		
	 },
	 search_input:{		
        right:0,
        height: 40,
        fontSize: 13,
	    left:18,
		width:250,			
	 },
	  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
	
  },
	   inputContainer: {
        padding: 10,
        borderWidth: 1,
        borderBottomColor: '#CCC',
        borderColor: 'transparent',      
	    height:50,
		
    },
})

AppRegistry.registerComponent('DelivertoComponent', () => DelivertoComponent);
module.exports = DelivertoComponent;