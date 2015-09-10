var width = 500;
var height = 500;
var radius = 6;

var margin = {bottom: 20, top: 40, left: 40, right: 20};


var data = [
	{x: 0, y: 0, 'name': 'AB'},
	{x: 50, y: 10, 'name': 'ON'},
	{x: 60, y: 20, 'name': 'QU'},
	{x: 10, y: 41, 'name': 'MA'},
	{x: 34, y: 55, 'name': 'SA'},
	{x: 39, y: 67, 'name': 'BC' },
	{x: 44, y: 77, 'name': 'NU'},
	{x: 40, y: 88, 'name': 'YU'},
	{x: 22, y: 0, 'name': 'NS'},
	{x: 190, y: 120, 'name': 'NF'}

];

var tool = d3.select('.tip_one')
				.style('position', 'absolute')
                .style('padding', '0 10px')
                .style('opacity', 0)
                .style('background-color', 'white')

var color = d3.scale.category20b();

var xScale = d3.scale.linear()
				.domain([0, d3.max(data, function(d) { return d.x } )])
				.range([margin.left, width - margin.right]);

var yScale = d3.scale.linear()
				.domain([0, d3.max(data, function(d) { return d.y } )])
				.range([height - margin.bottom, margin.top]);

var svg = d3.select('#chart')
			.append('svg')
			.attr('height', height)
			.attr('width', width);


var plots = svg.selectAll('circle')
				.data(data)
				.enter()
				.append('circle')
				.attr('cx', function(d){
					return xScale(d.x);
				})
				.attr('cy', function(d){
					return yScale(d.y);
				})
				.attr('fill', function(d, i){
					return color(i);
				})
				.attr('r', radius)
				.on('mouseover', function(d){
					d3.select(this)
						.transition()
						.attr('opacity', 0.5)

						tool.transition()
							.style('opacity', 1);

						tool.html(d['name'] + '<br /> 2011: ' + d.x
							+ '%' + '<br />' + '2015: ' + d.y + '%')
							.style('left', (d3.event.pageX + 5) + 'px')
							.style('top', (d3.event.pageY - 20) + 'px')
				})
				.on('mouseout', function(d){
						d3.select(this)
						.transition()
						.attr('opacity', 1)

						tool.transition()
							.style('opacity', 0);
				});


var xAxis = d3.svg.axis()
				.scale(xScale)
				.orient('bottom')

svg.append('g')
	.attr({
		"class": "axis",
		transform: 'translate(' + [0, height - margin.bottom] + ')'
	})
	.call(xAxis);

var yAxis = d3.svg.axis()
				.scale(yScale)
				.orient('left')

svg.append('g')
	.attr({
		'class': 'axis',
		transform: 'translate(' + [margin.left ,0] + ')'	
	})
	.call(yAxis);	


// Draw Legend
var legend = svg.selectAll('.legend')
				.data(color.domain())
				.enter()
				.append('g')
				.attr('class', 'legend')
				.attr('transform', function(d, i){
					return "translate(0," + i * 20 + ")";
				});	

legend.append('rect')
		.attr('x', width - 48)
		.attr('width', 18)
		.attr('height', 18)
		.style('fill', color);

legend.append('text')
		.attr('x', width - 54)
		.attr('y', 9)
		.attr("dy", ".35em")
		.style("text-anchor", "end")
		.text(function(d, i){
			return data[i].name;
		});	


// Labels

svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height - 40)
    .text("Percentge of vote in 2011 Election)");

svg.append("text")
    .attr("class", "y_label")
    .attr("text-anchor", "end")
    .attr("y", -3)
    .attr("x", -175)
    .attr("dy", ".95em")
    .attr("transform", "rotate(-90)")
    .text("Expected Percentge in 2015")
    .attr({'font-size': '16px'});