import {googleConfig} from '../../../config'

// Client ID and API key from the Developer Console
var CLIENT_ID = '480147456770-btcj5q928eoai1qn2ftsfsv9q7tmo3oo.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDOy1JRRQfHO7TD-vbFuHqxcw4PQiXaUOc';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = googleConfig.discoveryDocs

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = googleConfig.scope;



export function handleClientLoad(callback) {
    
    //Here callback disables the load screen signifying that the scripts are loaded
    window.gapi.load('client:auth2', initClient);
    
    
    function initClient() {
        
        window.gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
        }).then(function () {
            window.gapi.client.load("https://content.googleapis.com/discovery/v1/apis/drive/v2/rest")
            .then(()=>{
                callback();
                
            })
            
        }
        , function(error) {
        });
    }
}
