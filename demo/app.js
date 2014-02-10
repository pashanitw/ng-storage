angular.module('demoModule', ['ngStorage'])
    .config(['localStorageProvider', function(localStorageProvider){
        console.log("configured");
        localStorageProvider.setStorageKey('demoPrefix');
    }])
    .controller('DemoCtrl', [
        '$scope',
        'localStorage',
        function($scope, localStorage) {
            // Start fresh
            /*localStorageService.clearAll();

            $scope.$watch('localStorageDemo', function(value){
                localStorageService.add('localStorageDemo',value);
                $scope.localStorageDemoValue = localStorageService.get('localStorageDemo');
            });

            $scope.storageType = 'Local storage';

            if (!localStorageService.isSupported) {
                $scope.storageType = 'Cookie';
            }*/
            console.log("in demo ctrl");

            localStorage.setItem("pasha","123");
            localStorage.setItem("ammi","123");
            localStorage.setItem("ammi",{name:"pasha"});
           console.log(localStorage.getItem("pasha"));
           console.log(localStorage.getItem("ammi"));
        }
    ]);