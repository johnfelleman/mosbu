var opportunityModule = angular.module('opportunityViewer', []);

function escapeRegExp(string){
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
opportunityModule.controller('searchController', function ($scope) {
    $scope.opportunityList = opportunities;
    console.log(JSON.stringify(opportunities[0]));
    
    /*
    $scope.search = '';
    var regex;
    $scope.$watch('search', function (value) {
        regex = new RegExp('\\b' + escapeRegExp(value), 'i');
    });
    
    $scope.filterBySearch = function(employee) {
        if (!$scope.search) return false;
        return regex.test(employee.name) ||
               regex.test(employee.email) ||
               regex.test(employee.office) ||
               regex.test(employee.station) ||
               regex.test(employee.state);
    };
    */
});

