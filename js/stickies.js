angular.module('agStickies', [ 'ngDragDrop' ]).controller('agStickiesController',
                                        function($scope) {

    // each stickie has this structure
    //  color:  CSS color spec
    //  elem:   Jquery selector of referenced element
    //  title:  display in banner
    //  contents:   value of text area
    //  xCoord: What it is
    //  yCoord: What it is
    //  width: What it is
    //  height: What it is
    //  id:     id of sticky

    $scope.agStickies = [
    ];

    $scope.newStickie = function ( config ) {
        var newStickie = {
            color: 'rgba(255,255,0,0.5)',
            elem: 'body',
            title: 'Untitled',
            contents: 'I am not content.',
            width: 150,
            height: 150,
            id: Date.now()
        };
        config.title = event.target.dataset.agTitle;
        angular.forEach( config, function(value, key) {
            newStickie[key] = value;
        });
        $scope.agStickies.push(newStickie);
    }

    $scope.mail = function() {
        var stickeroo = '';
        angular.forEach($scope.agStickies, function(v, k) {
            stickeroo += 'id: ' + v.id + ', color: ' + v.color + ', title: ' + v.title +
                    ', contents:\n\t' + v.contents + '\n\n';
        });
        alert(stickeroo);
    };

    $scope.iChanged = function(e) {
           alert('object with id: ' + e.target.attribute['id'] + ' says:\n' +
                    $scope.stickyContent);
    };

});
/*
}).directive("agSticklet", function ($compile) {
    return {
        template: stickletTemplate,
        restrict: 'E',
        add: '=',
        scope: {
            color: '='
        },
        link: function (scope, elm) {
              scope.add = function( color ) {
                  var index = agStickies.push( {
                      id: Date.now(),
                      color: scope.color,
                      title: 'Stickie',
                      contents: 'OxDEADBEEF' } );
                  scope.color = color;
                  scope.id = agStickies[scope.index].id;
                  
                  console.log(elm);
                  var x = $compile('<ag-sticklet></ag-sticklet>')(scope);
                  $(x).children('div.stickie').
                  attr('id', 2).css('background-color', color);
                  $('#sticklet-anchor').after(x);
              }
           }
        }
});
*/
