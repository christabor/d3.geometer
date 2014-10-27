var d3_geometer_examples = (function(){
    'use strict';
    var dims = {
        'width': window.innerWidth / 2,
        'height': window.innerHeight / 1.4
    };

    function getSVG(id, dims, container) {
        return d3.select(container || '#svg-container')
        .append('svg').attr('id', id)
        .attr('width', dims.w || dims.width)
        .attr('height', dims.h || dims.height);
    }

    function init() {
        var $coords = getSVG('d3-coords', dims, '#coords');
        var coords = d3_geometer.CoordSpace($coords.append('g'), dims, 3);

        var $protractor = getSVG('d3-protractor', dims, '#protractor');
        var protractor = d3_geometer.Protractor($protractor.append('g'), dims.width / 4);

        protractor.attr('transform', 'translate(' + [dims.width / 2 - 100, dims.height / 2].join(', ') + ')');

        setInterval(function(){
            protractor.updateAngle(~~(Math.random() * 360));
        }, 500);

        var $ngon = getSVG('d3-ngon', dims, '#ngon');
        var ngon = d3_geometer.NGon($ngon.append('g'));

        ngon(dims.width / 4, 8)
        .drawVertices()
        .drawLabels()
        .drawPerimeterInteriorAngles()
        .calculateEdgeOffsets()
        .move(dims.width / 2, dims.height / 2);

        var $kitchensink = getSVG('d3-sink', dims, '#sink');
        var kitchensinkNgon = d3_geometer.NGon($kitchensink.append('g'));
        var coords2 = d3_geometer.CoordSpace($kitchensink.append('g'), dims, 6);

        kitchensinkNgon(dims.width / 4, 8);
        kitchensinkNgon.move(dims.width / 2, dims.height / 2);
        kitchensinkNgon
        .drawVertices()
        .drawLabels()
        .drawCenterPoint(true)
        .drawPerimeterInteriorAngles()
        .drawNearAdjacentEdges()
        .calculateEdgeOffsets();
    }

    return {
        'init': init
    };
})();

window.onload = d3_geometer_examples.init;
