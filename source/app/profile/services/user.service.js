/**
 * Profile
 * @namespace app.profile.services
 */
(function () {
  'use strict';

  angular
    .module('app.profile.services')
    .factory('User', User);

  User.$inject = ['$rootScope', '$cookieStore', '$http'];

  var rootUrl = "http://10.251.1.61:3000";

  /**
   * @namespace User
   * @returns {Service}
   */
  function User($rootScope, $cookieStore, $http) {

    var vm = this;
    // Will hold info for the currently logged in user
    vm.currentUser = {
      username : "Seelio",
      userType: "Company",
      authdata: ""
    };


    var User = {
      //all: all,
      //get: get,
      create: create,
      login: login,
      //update: update,
      //destroy: destroy
      SetCredentials: SetCredentials,
      ClearCredentials: ClearCredentials,
      getCurrentUser: getCurrentUser,
      setCurrentUser: setCurrentUser
    };

    return User;

    function getCurrentUser(){
      console.log(vm.currentUser.userType);
      return vm.currentUser;
    }

    function setCurrentUser(user){

      vm.currentUser = user
    }




    ////////////////////

    /**
     * @name all
     * @desc get all the users
     */
    function all() {

        return [];

        //return $http.get(rootUrl + '/api/v1/companies/');
    }

    /**
     * @name get
     * @desc get just one user
     */
    //function get(id) {
    //    return $http.get(rootUrl + '/api/v1/users/' + parseInt(id) );
    //}

    /**
     * @name create
     * @desc create a new user record
     */
    function create(user) {
      return $http.post(rootUrl + '/api/v1/users/create', user);
    }

    /**
     * @name login
     * @desc login a new user record
     */
    function login(user) {
      return $http.post(rootUrl + '/api/v1/users/login', user);
    }


    function SetCredentials(username, password, userType) {

      var authdata = Base64.encode(username + ':' + password + ':' + userType);

      vm.currentUser = {
        username: username,
        userType: userType,
        authdata: authdata
      };

      //$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
      $cookieStore.put('globals', vm.currentUser);
    }

    function ClearCredentials() {

      $rootScope.globals = {};
      $cookieStore.remove('globals');

      //$http.defaults.headers.common.Authorization = 'Basic ';
    }

    /**
     * @name update
     * @desc updates a user record
     */
    //function update(content, id) {
    //    return $http.update(rootUrl + '/api/v1/users/' + id, {
    //        content: content
    //    });
    //}

    /**
     * @name destroy
     * @desc destroy a user record
     */
    //function destroy(id) {
    //    return $http.delete(rootUrl + '/api/v1/users/' + id);
    //}
  }

  // Base64 encoding service used by AuthenticationService
  var Base64 = {

    keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

    encode: function (input) {
      var output = "";
      var chr1, chr2, chr3 = "";
      var enc1, enc2, enc3, enc4 = "";
      var i = 0;

      do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }

        output = output +
          this.keyStr.charAt(enc1) +
          this.keyStr.charAt(enc2) +
          this.keyStr.charAt(enc3) +
          this.keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
      } while (i < input.length);

      return output;
    },

    decode: function (input) {
      var output = "";
      var chr1, chr2, chr3 = "";
      var enc1, enc2, enc3, enc4 = "";
      var i = 0;

      // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
      var base64test = /[^A-Za-z0-9\+\/\=]/g;
      if (base64test.exec(input)) {
        window.alert("There were invalid base64 characters in the input text.\n" +
            "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
            "Expect errors in decoding.");
      }
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

      do {
        enc1 = this.keyStr.indexOf(input.charAt(i++));
        enc2 = this.keyStr.indexOf(input.charAt(i++));
        enc3 = this.keyStr.indexOf(input.charAt(i++));
        enc4 = this.keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
          output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
          output = output + String.fromCharCode(chr3);
        }

        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";

      } while (i < input.length);

      return output;
    }
  };

})();
