angular.module('demoModule', ['ngStorage'])
    .config(['localStorageProvider', function(localStorageProvider){
        console.log("configured");
        localStorageProvider.setStorageKey('demoPrefix');
    }])
    .controller('DemoCtrl', [
        '$scope',
        'localStorage',
        function($scope, localStorage) {

        }
    ]);