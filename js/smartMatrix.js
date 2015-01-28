// These hardcoded JS objects represent a live data source

function SimData() {
    Object.defineProperty(this, 'awardTypes', {
        enumerable: true,
        value: [
            {
                label: 'IDIQ',
                value: 'idiq'
            },
            {
                label: 'Blanket Purchase Agreement',
                value: 'bpa'
            },
            {
                label: 'Multiple Award Schedule',
                value: 'mas'
            }
        ]
    });

    Object.defineProperty(this, 'contractTypes', {
        enumerable: true,
        value: [
            {
                label: 'Fixed-Price (FAR 16.2)',
                value: 'fp-16.2'
            },
            {
                label: 'Cost Reimburement (FAR 16.3)',
                value: 'cost-16.3'
            },
            {
                label: 'Other',
                value: 'other'
            }
        ]
    });

    Object.defineProperty(this, 'agencies', {
        enumerable: true,
        value: [
            {
                label: 'GSA'
            },
            {
                label: 'DOD'
            },
            {
                label: 'DOI'
            },
            {
                label: 'HHS'
            },
            {
                label: 'State'
            },
            {
                label: 'NASA'
            },
            {
                label: 'OMB'
            },
            {
                label: 'DOE'
            }
        ]
    });

    Object.defineProperty(this, 'solutions', {
        enumerable: true,
        value: [
            {
                name: 'SEWP',
                awardTypes: [
                   'idiq', 'bpa'
                ],
                availableContractTypes: [
                   'Fixed-Price (Far 16.2)', 'Other'
                ],
                agenciesWhereAvailable: [
                   'NASA', 'DOD', 'DOI'
                ],
                link: 'https://www.sewp.nasa.gov',
                linkName: 'NASA SEWP',
                contact: 'wwwwwwwww.nasaSewp',
                expiration: 'May, 2019'
            },
            {
                name: 'NITAAC',
                awardTypes: [
                   'bpa'
                ],
                availableContractTypes: [
                   'Fixed-Price (Far 16.2)', 'Other'
                ],
                agenciesWhereAvailable: [
                   'NASA', 'DOD', 'DOI'
                ],
                link: 'https://www.nih.gov',
                linkName: 'NITAAC',
                contact: 'wwwwwwwww.stew',
                expiration: 'May, 2016'
            },
            {
                name: 'GSA Schedule 70',
                awardTypes: [
                   'idiq', 'bpa'
                ],
                availableContractTypes: [
                   'mas'
                ],
                agenciesWhereAvailable: [
                   'NASA', 'DOI'
                ],
                link: 'https://gsaadvantage.gsa.gov',
                linkName: 'GSA Advantage',
                contact: 'wwwwwwwww.stu',
                expiration: 'December, 2018'
            },
            {
                name: 'Army CHESS',
                awardTypes: [
                   'idiq', 'mas'
                ],
                availableContractTypes: [
                   'Fixed-Price (Far 16.2)'
                ],
                agenciesWhereAvailable: [
                   'DOD', 'DOE'
                ],
                link: 'https://chess.army.mil',
                linkName: 'NASA SEWP',
                contact: 'wwwwwwwww.oasis',
                expiration: 'December, 2026'
            },
        ]
    });
};

angular.module('smartMatrix', []).
            controller('criteriaController', function($scope) {

    var dataSource = new SimData();
    $scope.toolMode = false;
    $scope.awardTypes = dataSource.awardTypes;
    $scope.selectedAwardType = $scope.awardTypes[1];
    $scope.contractTypes = dataSource.contractTypes;
    $scope.selectedContractType = $scope.contractTypes[1];

    $scope.solutionList = {};
    angular.forEach(dataSource.solutions, function(solutionItem) {
       $scope.solutionList[solutionItem.name] = {
            item: solutionItem,
            show: false,
            hovering: false,
            agencyMatch: true,
            matchingSolutionTypes: 0,
            matchingContractTypes: 0
       };
    });

    $scope.updateForAwardType = function(type) {
       // alert (type.value + ': ' + type.enabled);
       // var state = '';
       // angular.forEach($scope.awardTypes, function(award) {
          // state += award.value + ': ' + award.enabled + '\n';
       // });
       // alert(state);

       angular.forEach($scope.solutionList, function(solution) {
           angular.forEach(solution.item.awardTypes, function(award) {
               if (award === type.value) {
                  solution.matchingSolutionTypes +=
                          (type.enabled === true) ? 1 : -1;
               }
           solution.show = (solution.matchingSolutionTypes > 0);
           });
       });
    };

    $scope.updateForHover = function(type) {
       angular.forEach($scope.solutionList, function(solution) {
           angular.forEach(solution.item.awardTypes, function(award) {
               if (award === type.value) {
                  solution.style={ color: 'red' };
                  // solution.matchingSolutionTypes +=
                          // (type.enabled === true) ? 1 : -1;
               solution.show = true;
               }
           });
       });
    };

    $scope.stopHovering = function(type) {
       angular.forEach($scope.solutionList, function(solution) {
           solution.hovering = false;
           solution.style = {};
           solution.show = (solution.matchingSolutionTypes > 0);
       });
    };
});
