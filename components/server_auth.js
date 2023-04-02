"use strict";
/**
 ==================================================================================
 Description:       desc
 Creation Date:     3/12/16
 Author:            Osipe
 ==================================================================================
 Revision History
 ==================================================================================
 Rev    Date        Author           Task                Description
 ==================================================================================
 1     3/12/16    Osipe          TaskNumber          Created
 ==================================================================================
 */


//var ForerunnerDB = require("forerunnerdb");
//var mobile_utils = require('./mobile_utils');

//var fdb = new ForerunnerDB();
//var db = fdb.db('xenforma');
//var Buffer = require('buffer').Buffer;

var auth_info; // Cached auth_info json object used for authentication

var authenticate_username_password = function(server_url, username, pass) {
    return new Promise(function(resolve, reject) {
        var login_route = server_url + 'auth/sign_in';
        console.log(login_route);       
	    fetch(login_route, {
             method: "POST",
                headers: {
                    'Accept': 'application/json',
					'Content-Type': 'application/json',
					"cookie" : ""
					
                },				
				 body: JSON.stringify({
					email: username,
					password: pass,
				   })
        }).then((response) => {
			console.log(response.status);
			if(response.status==200){
				auth_info=response;
				return resolve(response);
			}
			else{
			   response.json().then(function(json_response) {			  		  
			   return reject(json_response.errors);
		   }).catch(function(err) {			 
			  return reject(err);
           }); 				
			
		 }			
        }).catch(function(err) {
			return reject(err);
        });
    });
	
};
var password_recoveryrr=function(server_url, username){
	return new Promise(function(resolve, reject) {
        var login_route = server_url + 'users/send_sms_with_recovery_password';
        console.log(login_route);       
	    fetch(login_route, {
             method: "POST",
                headers: {
                    'Accept': 'application/json',
					'Content-Type': 'application/json',
					"cookie" : ""
					
                },				
				 body: JSON.stringify({
					 phone: username,
					
				   })
        }).then((response) => {
			console.log(response);
			if(response.status==200){
				auth_info=response;
				//return resolve(response);
			}
			else{
			   response.json().then(function(json_response) {			  		  
			   //return reject(json_response.errors);
		   }).catch(function(err) {			 
			  //return reject(err);
           }); 				
			
		 }			
        }).catch(function(err) {
			return reject(err);
        });
    });
};
var logout=function(server_url){
  var login_route=server_url+'auth/sign_out';
    console.log(auth_info);
    console.log(login_route);
	/**
	fetch(login_route, {
             method: "POST",
                headers: {
                    'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Access-Token': hg57eelNkNi0uM0A1KDSUw
					'Token-Type': Bearer
					'Client': mg57OsS526P-TaepBGkexQ
					'Expiry': 1459106316
					'Uid': 124durward@schmeler.io
					'Host': example.org
					'Content-Type': application/x-www-form-urlencoded
					'Cookie': 
					
                },				
				 body: JSON.stringify({
					email: username,
					password: pass,
				   })
        }).then((response) => {
		});
		**/
};
var is_user_authenticated = function() {
    return new Promise(function(resolve, reject) {
        var check_login_status = function() {
            do_authenticated_http_call("api/auth/is_logged_in", {
                method: "GET",
                headers: {
                    "Accept":"application/json"
                }
            }).then((response) => {
				
                response.json().then((json_response) => {
					
                    if (json_response.logged_in) {						
                        return resolve();
                    }
                    else {
                        return reject("NOT_LOGGED_IN");
                    }
                }).catch((err) => {					
                    return reject(err);
                });
            });
        };

        if (!auth_info) {
			
            var xenforma_auth_info = db.collection('xenforma_auth_info');
            xenforma_auth_info.load(function(err) {
              
			  if (err) {
                    return reject(err);
                }

                var db_auth_info = xenforma_auth_info.find({});               
				if (db_auth_info.length > 0) {
                    auth_info = db_auth_info[0];
                    check_login_status();
                }
                else {
                    return reject("NOT_LOGGED_IN");
                }
            });
        }
        else {
            check_login_status();
        }
    });
};

var do_authenticated_http_call = function(url_path, options) {
     
   if (!auth_info) {	   
        return new Promise(function(resolve, reject) { return reject("MISSING_CREDENTIALS"); });
    }

    if (options === undefined) {
        options = {};
    }

    if (options.headers === undefined) {
        options.headers = {};
    }
	
	console.log("auth info server_url "+auth_info.server_url);
    options.headers["Authorization"] = "JWT " + auth_info.login_token;

    return fetch(auth_info.server_url + url_path, options);
};
var did_forget_password=function(server_url, request){
	 var request = {};
	
      
};
exports.do_authenticated_http_call = do_authenticated_http_call;
exports.is_user_authenticated = is_user_authenticated;
exports.authenticate_username_password = authenticate_username_password;