var app = angular.module('chartApp', ['ng-fusioncharts']);
app.controller('MyController', function($scope) {

    $scope.selectedValue = 'Click vào cột nào đó.';

    $scope.events = {
        dataplotclick: function(ev, props) {
            $scope.$apply(function() {
                $scope.colorValue = 'background-color:' + props.categoryLabel + ';';
                $scope.selectedValue = 'Đây là ' + props.categoryLabel + '!';
            });
        }
    };

    $scope.dataSource = {
        'chart': {
            'caption': 'Chart + Angular!',
            'captionFontSize': '30',
            'captionPadding': '25',
            'baseFontSize': '13',
            'canvasBorderAlpha': '0',
            'showPlotBorder': '0',
            'placevaluesInside': '1',
            'valueFontColor': '#ffffff',
            'captionFontBold': '0',
            'bgColor': '#2C3E50',
            'divLineAlpha': '50',
            'plotSpacePercent': '10',
            'bgAlpha': '95',
            'canvasBgAlpha': '0',
            'outCnvBaseFontColor': '#FFFFFF',
            'showValues': '0',
            'baseFont': 'Open Sans',
            'paletteColors': '#6495ED, #FF6347, #90EE90, #FFD700, #FF1493',
            'theme': 'zune',

            // tool-tip customization
            'toolTipBorderColor': '#FFFFFF',
            'toolTipBorderThickness': '1',
            'toolTipBorderRadius': '2',
            'toolTipBgColor': '#000000',
            'toolTipBgAlpha': '70',
            'toolTipPadding': '12',
            'toolTipSepChar': ' - ',

            // axis customization
            'xAxisNameFontSize': '18',
            'yAxisNameFontSize': '18',
            'xAxisNamePadding': '10',
            'yAxisNamePadding': '10',
            'xAxisName': 'Các thể loại tiền tiêu',
            'yAxisName': 'Số tiền',
            'xAxisNameFontBold': '0',
            'yAxisNameFontBold': '0',
            'showXAxisLine': '1',
            'xAxisLineColor': '#999999',

        },
        'data': [{
            'label': 'Tiền lương',
            'value': '10'
        }, {
            'label': 'Tiền nhà',
            'value': '81'
        }, {
            'label': 'Tiền ăn',
            'value': '73'
        }, {
            'label': 'Tiền chơi',
            'value': '62'
        }, {
            'label': 'Tiền nợ',
            'value': '89'
        }]
    };

});