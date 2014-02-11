angular.module('demoModule', ['ngStorage'])
    .config(['localStorageProvider', function(localStorageProvider){
        localStorageProvider.setStorageKey('demoPrefix');
    }])
    .controller('DemoCtrl', [
        '$scope',
        'localStorage',
        function($scope, localStorage) {

        }
    ]);