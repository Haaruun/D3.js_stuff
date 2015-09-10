var dataset = [
  { label: 'Trudeau', count: 25 }, 
  { label: 'Harper', count: 20 },
  { label: 'May', count: 4 },
  { label: 'Duceppe', count: 4 },
   { label: 'Mulcair', count: 35 }
];

var width = 400;
var height = 400;
var radius = 400/2; 

var donutWidth = 100;


 var color = d3.scale.ordinal()
   .range(['#e74c3c', '#2980b9', '#2ecc71', '#34495e', '#f39c12']); 

var svg = d3.select('#pie')
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.append('g')
			.attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');

// Create Arc/shape	

var arc = d3.svg.arc()
			.outerRadius(radius)
			.innerRadius(radius - donutWidth);

// Tooltip
var tool = d3.select('.tip_one')
				.style('position', 'absolute')
                .style('padding', '0 10px')
                .style('opacity', 0)
                .style('background-color', '#ecf0f1')


// Create the pie

var pie = d3.layout.pie()
			.value(function(d){ return d.count; })
			.sort(null);

var path = svg.selectAll('path')
			  .data(pie(dataset))
			  .enter()
			  .append('path')
			  .attr('d', arc)
			  .attr('fill', 'white')
			  .on('mouseover', function(d){
			  	d3.select(this)
			  		.style('opacity', 0.5);

			  		tool.transition()
			  			.style('opacity', 1)

			  		tool.html('Percent of Vote: ' + d.data.count)
			  			.style('left', (d3.event.pageX + 5) + 'px')
			  			.style('top', (d3.event.pageY - 10) + 'px')
			  })
			  .on('mouseout', function(d){
			  	d3.select(this)
			  		.style('opacity', 1);

			  		tool.transition()
			  			.style('opacity', 0)
			  });


path.transition()
	.attr('fill', function(d, i){
	 return color(d.data.label);
    })
    .delay(function(d, i){
    	return i * 250;
    })
    .ease('cubic');

// Legend
var legendRectSize = 18;
var legendSpacing = 4;

var legend = svg.selectAll('.legend')
				.data(color.domain())
				.enter()
				.append('g')
				.attr('class', 'legend')
				.attr('transform', function(d, i){
					var height = legendRectSize + legendSpacing;
    				var offset =  height * color.domain().length / 2;
    				var horz = -2 * legendRectSize;
    				var vert = i * height - offset;
    				return 'translate(' + horz + ',' + vert + ')';
				});

legend.append('rect')
	  .attr('width', legendRectSize)
	  .attr('height', legendRectSize)
	  .style('fill', color)
  	  .style('stroke', color);

 legend.append('text')
 		.attr('x', legendRectSize - legendSpacing + 10)
 		.attr('y', legendRectSize - legendSpacing)
 		.text(function(d){ return d; });




