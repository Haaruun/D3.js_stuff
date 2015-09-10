var margin = {top: 40, bottom: 20, left: 40, right: 20};
var height = 500 - margin.top - margin.bottom;
var width = 900 - margin.left - margin.right;


var theData = [
	{x: 2006, y: 2, 'name': 'AB'},
	{x: 2007, y: 7, 'name': 'ON'},
	{x: 2008, y: 14, 'name': 'QU'},
	{x: 2009, y: 21, 'name': 'MA'},
	{x: 2010, y: 22, 'name': 'SA'},
	{x: 2011, y: 15, 'name': 'BC' },
	{x: 2012, y: 11, 'name': 'NU'},
	{x: 2013, y: 12, 'name': 'YU'},
	{x: 2014, y: 20, 'name': 'NS'},
	{x: 2015, y: 39, 'name': 'NF'}
];


var color = d3.scale.linear()
			  .domain([0, d3.max(theData, function(d){ return d.y; })])
			  .range(['#f1c40f', 'red']);

var yScale = d3.scale.linear()
			   .domain([0, d3.max(theData, function(d){ return d.y; })])
			   .range([margin.top, height - margin.bottom]);

var yaxisScale = d3.scale.linear()
			   .domain([0, d3.max(theData, function(d){ return d.y; })])
			   .range([height - margin.bottom, 0]);

var xScale = d3.scale.ordinal()
			   .domain(d3.range(0, theData.length))
			   .rangeBands([margin.left, width - margin.right], 0.5);
			   	


var svg = d3.select('#chart_bar')
			.append('svg')
			.attr("width", width + margin.left + margin.right)
  		    .attr("height", height + margin.top + margin.bottom)
    		.attr("transform", "translate(" + margin.left + "," + margin.top + ")"); 

var tool = d3.select('.tip_one')
				.style('position', 'absolute')
                .style('padding', '0 10px')
                .style('opacity', 0)
                .style('background-color', 'white')


var bar = svg.selectAll('rect')
			 .data(theData)
			 .enter()
			  .append('rect')
			  	.attr('height', 0)
			  	.attr('width', xScale.rangeBand() + 10)
			  	.attr('x', function(d, i){
			  		return xScale(i);	
			  	})
			  	.attr('y', height)
			  	.attr('fill', function(d, i){
			  		return color(i);
			  	})
			  	.on('mouseover', function(d){
			  		d3.select(this)
			  			.style('opacity', 0.5)

			  		tool.transition()
			  			.style('opacity', 1)

			  		tool.html('Year: ' + d.x + '<br />  Increase to (%): '  + d.y + '<br /> Largest contributor: ' + d.name)
			  			.style('left', (d3.event.pageX + 5) + 'px')
			  			.style('top', (d3.event.pageY - 20) + 'px')			  		
			  	})
			  	.on('mouseout', function(d){
			  		tool.transition()
			  			.style('opacity', 0)

			  			d3.select(this)
			  			.transition()
			  			.style('opacity', 1)

			  	});


// Animation

bar.transition()
	.attr('height', function(d){
			  		return yScale(d.y);
			  	})
	.attr('y', function(d){
			  		return height - yScale(d.y);
			  	})
	.delay(function(d, i){
		return i * 80;
	})
	.ease('bounce');


var xAxis = d3.svg.axis()
			  .scale(xScale)
			  .orient('bottom')
			  .tickFormat(function(d) { return theData[d].x; })


svg.append('g')
	.attr({
		'class': 'axis',
		transform: 'translate(' + [0, height] + ')'
	})
	.call(xAxis)
	.selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)" );	


var yAxis = d3.svg.axis()
			  .scale(yaxisScale)
			  .orient('left')
			  .tickSize(2);
svg.append('g')
	.attr({
		'class': 'axis',
		transform: 'translate(' + [margin.left, margin.right] + ')'
	})
	.call(yAxis);	

// Labels
svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + 60)
    .text("Year");

svg.append("text")
    .attr("class", "y_label")
    .attr("text-anchor", "end")
    .attr("y", -3)
    .attr("x", -175)
    .attr("dy", ".95em")
    .attr("transform", "rotate(-90)")
    .text("Green House Gase Admission (%)")
    .attr({'font-size': '16px'}); 

// Creating the Grid

function make_x_axis() {        
    return d3.svg.axis()
        .scale(xScale)
         .orient("bottom")
         .ticks(5)
}

function make_y_axis() {        
    return d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(5)
}

svg.append("g")         
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .call(make_x_axis()
            .tickSize(-height, 0, 0)
            .tickFormat("")
        )

    svg.append("g")         
        .attr("class", "grid")
        .attr("transform", "translate(" +  margin.left + ",0)")
        .call(make_y_axis()
            .tickSize(-width + margin.left + margin.right, 0, 0)
            .tickFormat("")
        )


