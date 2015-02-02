  angular.module('caposWidgets', [])
  .controller('tableViewController', ['$scope', function($scope) {
    $scope.sample1 = {
        visible: true,
        title: 'Sample Panel 1'
    };
    $scope.sample2 = {
        visible: false,
        title: 'Sample Panel2 invisible'
    };
    $scope.sample3 = {
        visible: true,
        title: 'Sample Panel 3'
    };
    $scope.table1 = {
        visible: true,
        title: 'Sample Table',
        cells: [
            {show: true, html: 'show one'},
            {show: true, html: 'show two'},
            {show: false, html: 'hide three'},
            { show: true, html: 'show four'}
        ]
    };
    $scope.checkbox1 = {
        visible: true,
        title: 'Sample Checkbox List',
        items: [
            {
                onMouseover: function() {alert('mo');},
                onMouseleave: function() {alert('ml');},
                onChange: function() {alert('ch');},
                show: true,
                html: 'show one'
            },
            {
                onMouseover: function() {alert('mo');},
                onMouseleave: function() {alert('ml');},
                onChange: function() {alert('ch');},
                show: true,
                html: 'show two'
            },
            {
                onMouseover: function() {alert('mo');},
                onMouseleave: function() {alert('ml');},
                onChange: function() {alert('ch');},
                show: false,
                html: 'hide three'
            },
            {
                onMouseover: function() {alert('mo');},
                onMouseleave: function() {alert('ml');},
                onChange: function() {alert('ch');},
                show: true,
                html: 'show four'
            }
        ]
    };
  }])
   .directive('cosPanel', function(){
      return {
        restrict: 'E',
        scope: {
            header:'='
        },
        template:
            '<div class="cos-panel ng-hide"' +
                        'ng-show="{{header.visible}}">' +
                '<div class="panel panel-default">' +
                   '<div class="panel-heading">' +
                     '<h3 class="panel-title">{{header.title}}</h3>' +
                   '</div> <!-- panel-heading -->' +
                '</div> <!-- panel-default -->' +
            '</div> <!-- cos-panel -->'
      };
  })
   .directive('cosCheckboxList', function(){
      return {
        restrict: 'E',
        scope: {
            'checkboxList':'='
        },
        template:
            '<div class="cos-checkbox-list ng-hide"' +
                        'ng-show="{{checkboxList.visible}}">' +
                '<div class="panel panel-default">' +
                   '<div class="panel-heading">' +
                     '<h3 class="panel-title">{{checkboxList.title}}</h3>' +
                   '</div> <!-- panel-heading -->' +
                   '<div ng-repeat="item in checkboxList.items">' +
                      '<div class="ng-hide" ng-show="item.show">' +
                          '<input type="checkbox" ng-model="item.enabled" ' +
                          'ng-mouseover="item.onMouseover()" ' +
                          'ng-mouseleave="item.onMouseleave()" ' +
                          'ng-change="item.onChange()">' +
                              '{{item.html}}' +
                          '</input>' +
                      '</div>' +
                   '</div>' +
                '</div> <!-- panel-default -->' +
            '</div> <!-- cos-panel -->'
      };
  })
   .directive('cosTableView', function(){
      return {
        restrict: 'E',
        scope: {
            table:'='
        },
        template:
            '<div class="capos-table-view ng-hide"' +
                        'ng-show="{{table.visible}}">' +
                '<div class="panel panel-default"' +
                   '<div class="panel-heading">' +
                     '<h3 class="panel-title">{{table.title}}</h3>' +
                   '</div> <!-- panel-heading -->' +
                   '<div ng-repeat="cell in table.cells">' +
                      '<div class="ng-hide" ng-show="cell.show">' +
                          '{{cell.html}}' +
                      '</div>' +
                   '</div>' +
                '</div> <!-- panel-default -->' +
            '</div> <!-- cos-table-view -->'
      };
  });
