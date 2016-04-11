var opportunityModule = angular.module('opportunityViewer', []);

function escapeRegExp(string){
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
function hasNaics(opportunity) {
    return (opportunity.fields.naics !== "");
}

function createFilterLists(objectArray, interiorProperty, picklistsArray) {
    angular.forEach(objectArray, function(item, key, obj) {
        if (item.model === 'opportunities.opportunity') {
            angular.forEach(picklistsArray, function(picklist, idx) {
                if (item.hasOwnProperty(interiorProperty) &&
                    item[interiorProperty].hasOwnProperty(picklist.name)) {

                    var match = false;
                    var picklistEntry = item[interiorProperty][picklist.name];
                    // if the picklist already has this item, increment
                    // if not, create and set count to 1
                    angular.forEach(picklist.entries, function(entry) {
                        if (entry.value === picklistEntry) {
                            entry.count++;
                            match = true;
                        }
                    });
                    if (match === false) {
                        picklist.entries.push( { value: picklistEntry, count: 1 } );
                    }
                }
            });
        }
    });
}

opportunityModule.controller('searchController', function ($scope) {
    $scope.opportunityList = opportunities;
    $scope.selectedAgency = 'GSA';
    $scope.picklists = [
        {name: 'naics', entries:[]},
        {name: 'agency', entries:[]},
        {name: 'award_status', entries:[]},
        {name: 'estimated_fiscal_year', entries:[]},
        {name: 'place_of_performance_state', entries:[]},
        {name: 'place_of_performance_city', entries:[]}
    ];
    createFilterLists(opportunities, 'fields', $scope.picklists);
    $scope.naics = '';
    var regex;
    $scope.$watch('naics', function (value) {
        regex = new RegExp('\\b' + escapeRegExp(value), 'i');
    });
});

