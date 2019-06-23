var overallData = [{
    name: 'OK',
    value: 82.5,
    color: 'red'
}, {
    name: 'NC',
    value: 17.5,
    color: 'gray'
}];

var dailyData = [{
    name: 'OK',
    value: 82.5,
    color: 'green'
}, {
    name: 'NC',
    value: 17.5,
    color: 'gray'
}];

var weeklyData = [{
    name: 'OK',
    value: 82.5,
    color: 'red'
}, {
    name: 'NC',
    value: 17.5,
    color: 'gray'
}];

var monthlyData = [{
    name: 'OK',
    value: 82.5,
    color: 'yellow'
}, {
    name: 'NC',
    value: 17.5,
    color: 'gray'
}];


function renderAllChart(){
    // renderPieChart('#overall-chart', overallData);
    
    
    
    renderPieChart('#daily-chart', dailyData);
    renderPieChart('#weekly-chart', dailyData);
    renderPieChart('#monthly-chart', dailyData);
}



function renderPieChart(selector, data, margin) {
    var containerWidth = d3.select(selector).style('width').slice(0, -2),
        containerHeight = d3.select(selector).style('height').slice(0, -2);

    console.log('[' + selector + ']' + containerWidth + ',' + containerHeight);



    if(!margin) {
        margin = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        }
    }

    var height = d3.select(selector).node().style.height;

    // margin and radius
    var width = containerWidth - margin.right - margin.left,
        height = containerHeight - margin.top - margin.bottom,
        radius = width / 2;

    // arc generator
    var arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius((radius - 10) - 45);

    var labelArc = d3.arc()
        .outerRadius(radius - 50)
        .innerRadius(radius - 50);

    // pie generator
    var pie = d3.pie()
        .sort(null)
        .value(function (d) {
            return d.value
        });

    // define svg
    var svg = d3.select(selector).append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    // append ag elements (arc)
    var g1 = svg.selectAll('.arc')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc');

    // append the path of the arc
    g1.append('path')
        .attr('d', arc)
        .style('fill', function (d) {
            return d.data.color;
        });

    // append the text (labels)
    g1.append('text')
        .attr('transform', function (d) {
            return 'translate(' + labelArc.centroid(d) + ')';
        })
        .attr('dy', '.35em')
        .text(function (d) {
            return d.data.name;
        })

    svg.append('text')
        .attr('text-anchor', 'middle')
        .text('점검률98%');

}