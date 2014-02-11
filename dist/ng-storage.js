/**
 * ng-storage
 * @version v0.0.1 - 2014-02-11
 * @link https://github.com/pashanitw/ng-storage
 * @author  <>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
/* include this dependency in your module */
var ngStorage = angular.module('ngStorage', []);


ngStorage.provider('localStorage', function () {
    'use strict';
    var _self = this;
    /* default storage prefix name for storage key*/
    _self.storageKey = '';
    /* storage prefix can be configured before runtime of application */
    _self.setStorageKey = function (key) {
        this.storageKey = key;
    };
    /* default connfiguration for cookie, in case browser does not support HTML5 local storage*/
    _self.cookie = {
        expiry: 30,
        path: '/'
    };
    /* cookie can be configure before runtime of application */
    _self.setCookie = function (exp, path) {
        _self.cookie.expiry = exp;
        _self.cookie.path = path;
    };

    _self.$get = function ($rootScope) {

        var localStoragService = {},
            localStorageSupport = (function () {
                var key = "ngStorage";
                try {
                    localStorage.setItem(key, '');
                    localStorage.removeItem(key);
                    return true;
                } catch (e) {
                    $rootScope.$broadcast('ngStorage.localStorage.error', e.message);
                    return false;
                }

            }()),
        /* create cookie in case of HTML5 localstorage absence, cookie format must match the below convention */
        /*document.cookie ='ppkcookie2=yet another test; expires=Fri, 3 Aug 2001 20:47:11 UTC; path=/' */
            createCookie = function (name, value, days) {
                var expire, date;
                if (days) {
                    date = new Date();
                    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
                    expire = "; expires=" + date.toGMTString();
                } else {
                    expire = "";
                }
                document.cookie = name + "=" + value + expire + "; path=" + _self.cookie.path;
            },
        /* extract the item from cookie based on given key */
            readCoockie = function (key) {
                var regexp, match;
                key += "=";
                regexp = new RegExp("(?:^|;\\s)" + key + "(.*?)(?:;\\s|$)");
                match = regexp.exec(document.cookie);
                return match ? match[1] : undefined;
            },
        /* delete cookie */
            eraseCookie = function (name) {
                /* set expirydate to previous date to delete coockie */
                createCookie(name, "", -1);
            },
        /* add prefix to given key tp avoid naming conflict*/
            addPrefixToKey = function (key) {
                return _self.storageKey + "_" + key;
            },
        /* return the cookie data based on given index */
            getCookieOfIndex = function (index) {
                var regexp = new RegExp("(?:^|;\\s)" + index + "(.*?)(?:;\\s|$)");
            };
        /*if HTML5 storage is supported retun native storage setItem function by adding prefix to the given key
         else create cookie and return it*/
        localStoragService.setItem = function (key, item) {
            key = addPrefixToKey(key);
            return localStorageSupport ? localStorage.setItem(key, item) : createCookie(key, item, _self.cookie.expiry);
        };

        /*if HTML5 storage is supported retun native storage getItem function by adding prefix to the given key
         else return earlier created cookie*/
        localStoragService.getItem = function (key) {
            key = addPrefixToKey(key);
            return localStorageSupport ? localStorage.getItem(key) : readCoockie(key);
        };

        /*if HTML5 storage is supported return native storage removeItem function by adding prefix to the given key
         else return  remove cookie function to remove earlier created cookie*/
        localStoragService.removeItem = function (key) {
            key = addPrefixToKey(key);
            return localStorageSupport ? localStorage.removeItem(key) : eraseCookie(key);
        };

        /*if HTML5 storage is supported return native storage length function by adding prefix to the given key
         else calculate the cookie length and return it*/
        localStoragService.length = function () {
            return localStorageSupport ? localStorage.length : document.cookie.split('; ').length;
        };

        /* if HTML5 storage is supported retun native storage setItem function by adding prefix to the given key
         else create cookie and return it*/
        localStoragService.key = function (index) {
            return localStorageSupport ? localStorage.key(index) : getCookieOfIndex(index);
        };
        /*if Html5 return native clear function*/
        localStoragService.clear = function () {
            return localStorageSupport ? localStorage.clear() : '';
        }
        /* RETURN THE LOCAL STORAGE SERVICE WITH FALLBACK OF COOKIE BASED APPROACH */
        return localStoragService;
    };
});

