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
    $scope.stopnow = function() {
        console.log('Search patterns:\n');
        angular.forEach($scope.searchPatterns, function(item,key) {
            console.log('\t' + key + ': ' + item + '\n');
        });
    };
    $scope.opportunityList = opportunities;
    $scope.selectedAgency = 'GSA';
    var picklists = [
        {name: 'naics', entries:[]},
        {name: 'agency', entries:[]},
        {name: 'award_status', entries:[]},
        {name: 'estimated_fiscal_year', entries:[]},
        {name: 'place_of_performance_state', entries:[]},
        {name: 'place_of_performance_city', entries:[]}
    ];
    createFilterLists(opportunities, 'fields', picklists);
    var searchPatterns = {};
    $scope.searchPatterns = searchPatterns;

    angular.forEach(picklists, function(list) {
        $scope.searchPatterns[list.name] = '';
    });
    $scope.picklists = picklists;
});

