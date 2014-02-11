/*global describe,module,it,expect,beforeEach,inject,afterEach*/
describe('Testing localStorage service module functionality', function () {
    'use strict';
    var ls, prefix = 'samplePrefix';
    beforeEach(module('ngStorage', function (localStorageProvider) {
        localStorageProvider.setStorageKey(prefix);
    }));
    beforeEach(inject(function (_localStorage_) {
        ls = _localStorage_;
    }));
    it("should add item to browser local storage", function () {
        ls.setItem("demoKey", "ample");
        expect(ls.getItem('demoKey')).toBe('ample');
    });
    it("should remove item from browser local storage", function () {
        ls.removeItem("demoKey");
        expect(ls.getItem('demoKey')).toBeFalsy();
    });

    it("shoud clear the whole localstorage", function () {
        ls.setItem("testKey", "sample");
        ls.clear();
        expect(ls.length()).toBe(0);
    });
    it("should return the length of storage properly", function () {
        ls.clear();
        ls.setItem("demoKey", "sample");
        ls.setItem("demoKey_two", "{name: 'pasha'}");
        expect(ls.length()).toBe(2);
        ls.removeItem("demoKey");
        expect(ls.length()).toBe(1);
    });

    it("should return the correct item when try to access through index", function () {
        ls.clear();
        ls.setItem("demoKey", "sample");
        ls.setItem("demoKey_two", "{name: 'pasha'}");
        expect(ls.key(0)).toBe(prefix + "_" + "demoKey_two");
    });
    afterEach(function () {
        ls.clear();
    });
});

describe('#NO LOCALSTORAGE SUPPORT Testing localStorage service module functionality', function () {
    'use strict';

});