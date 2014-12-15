angular.module('rateCalculator', []).controller('rateCalculatorController',
                                        function($scope) {
    $scope.toolMode = true;
    $scope.destinations = locations;
    $scope.origins = locations;
    $scope.rate = '';
    $scope.weight = 1;

    $scope.weight
    $scope.findRate = function() {
        $scope.rate = 999.99;
        p2pRateStructures.some( function(rateStructure) {
            if (rateStructure.origin === $scope.selectedOrigin &&
                rateStructure.destination === $scope.selectedDestination) {
                    $scope.rate = rateStructure.rates[$scope.weight - 1];
                    return true;
            }
        });
    };

});
