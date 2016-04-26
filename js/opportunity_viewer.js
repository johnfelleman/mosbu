var opportunityModule = angular.module('opportunityViewer', []);

function escapeRegExp(string){
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

// TODO: try building all the indices on the fly

function createFilterLists(objectArray, indices, depth) {

}

function createFilterLists(objectArray, interiorProperty, picklistsArray, searchStrings) {
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
    $scope.maxPicklistCount = 20;
    $scope.fields = {
        naics: { friendly: 'NAICS Code', entries:[]},
        agency: {friendly: 'Awarding Agency', entries:[]},
        award_status: { friendly: 'Award Status', entries:[]},
        estimated_fiscal_year: { friendly: 'Estimated Fiscal Year', entries:[]},
        place_of_performance_state: { friendly: 'State', entries:[]},
        place_of_performance_city: { friendly: 'City', entries:[]}
    };
    var picklists = [
        {name: 'naics', friendly: 'NAICS Code', entries:[]},
        {name: 'agency', friendly: 'NAICS Code', entries:[]},
        {name: 'award_status', friendly: 'NAICS Code', entries:[]},
        {name: 'estimated_fiscal_year', friendly: 'NAICS Code', entries:[]},
        {name: 'place_of_performance_state', friendly: 'NAICS Code', entries:[]},
        {name: 'place_of_performance_city', friendly: 'NAICS Code', entries:[]}
    ];
    createFilterLists(opportunities, 'fields', picklists);
    var searchPatterns = {};
    $scope.searchPatterns = searchPatterns;

    angular.forEach(picklists, function(list) {
        $scope.searchPatterns[list.name] = '';
    });
    $scope.picklists = picklists;
});

