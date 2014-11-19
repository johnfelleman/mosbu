angular.module('awardOptimizer', []).controller('criteriaController', function($scope) {
    $scope.primaryRequirement = [
        {
            label: 'Construction or Architect/Engineering under FAR part 36',
            value: 1,
            awardOption: 'na'
        },
        {
            label: 'Product or supply',
            value: 2,
            awardOption: 'mas'
        },
        {
            label: 'Non-professional services, ie Service Contract Act',
            value: 3,
            awardOption: 'mas'
        },
        {
            label: 'Professional Services',
            value: 4,
            awardOption: 'equal'
        }
    ];


    $scope.primaryCriterion = $scope.primaryRequirement[1];

    $scope.secReqs = [
        {
            value: 1,
            label: 'Includes non-commercial services or items',
            oasis: 'best',
            mas: 'ng'
        },
        {
            value: 2,
            label: 'May include open market items',
            oasis: 'best',
            mas: 'possible'
        },
        {
            value: 3,
            label: 'Contains or requires a cost reimbursement contract type',
            oasis: 'best',
            mas: 'ng'
        },
        {
            value: 4,
            label: 'Includes hybrid contract types including cost-type',
            oasis: 'best',
            mas: 'ng'
        },
        {
            value: 5,
            label: 'Professional Service which includes ancillary goods/services',
            oasis: 'best',
            mas: 'possible'
        },
        {
            value: 6,
            label: 'Professional services on FFP with no anticipated open market items',
            oasis: 'possible',
            mas: 'best'
        }
    ];

});
