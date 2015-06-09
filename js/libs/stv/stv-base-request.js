import STVAPIParams from './stv-api-parameters';
import types from './exceptions/stv-api-types';
import APIBuilder from './stv-api-builder';
import { Implements } from  './stv';

// grab method to retrieve api
let apiUrl = new APIBuilder();

@Implements( types )
@Implements( STVAPIParams )
 export default class STVBaseAPIRequest {
     constructor (api) {
         // the api request - player, news, etc
         // TODO create exception for no required parameters
         this.api = api;
         // required or optional params
         // TODO check if filters exist first
         // build in required option
         // TODO type check for numbers and strings
         this.requestParameters = this.requestParameters || {};
         // TODO better way to set type
         this.type = this.type || 'grouptoken';
     }
     makeAPIRequest () {
         // fetch request API url using APIBuilder.fetchAPI(this.api);
         let request = apiUrl.fetchAPI(this.api) + this.type +'/',
             dfd = $.Deferred();
         // make the request
        $.ajax({
            url : request,
            // send any request parameters
            data : this.requestParameters,
            success : (xhr) => {
                 // send success
                 dfd.resolve(xhr);
             },
             error : (xhr, e) => {
                 // send fail
                 dfd.reject(xhr, e);
             },
             complete : (xhr) => {
                 if (!xhr.success) {
                     // send fail
                     dfd.reject(xhr);
                 }
             }
         });
         // return the promise
         return dfd.promise();
     }
 }
