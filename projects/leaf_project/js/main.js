/*
*    main.js
*/

// *********************
// Basic setup SVG
// *********************

//Set up SVG dimensions
const width = 800;
const height = 500;

//Set up margins
const margin = {left: 100, right: 20, top: 50, bottom: 100};

//Creating SVG
const svg = d3.select("#chart-area")
	.append("svg")
	.attr("width",width+margin.left+margin.right)
	.attr("height",height+margin.top+margin.bottom)

//Setting up a black background
svg.append("rect")
	.attr("width","100%")
	.attr("height","100%")
	.attr("fill", "black");

//Creating a group within SVG
const g = svg.append("g")
	.attr("transform", "translate("+margin.left+","+margin.top+")");

// *********************
// Scales
// *********************

//X axis logaritmic scale
const x = d3.scaleLog()
	.domain([142,150000])
	.range([0,width]);

//Y axis linear scale
const y = d3.scaleLinear()
	.domain([0,90])
	.range([height,0]);

// Area scale for the circles
const area = d3.scaleLinear()
	.domain([2000,1400000000])
	.range([25*Math.PI,1500*Math.PI]);

//Color scale
const color = d3.scaleOrdinal(d3.schemePastel1);

// *********************
// Axis and labels
// *********************

// X axis
const xAxis=d3.axisBottom(x)
	.tickValues([400,4000,40000])
	.tickFormat(d => "$"+d);

// Group for the x axis
const xAxisGroup = g.append("g")
	.attr("class","x axis")
	.attr("transform","translate(0,"+height+")")
	.call(xAxis);

// Y axis
const yAxis=d3.axisLeft(y);

// Group for the y axis
const yAxisGroup = g.append("g")
	.attr("class","y axis")
	.call(yAxis);

// Styles for axes
g.selectAll(".x.axis path, .x.axis line, .y.axis path, .y.axis line")
    .attr("stroke", "white");

g.selectAll(".x.axis text, .y.axis text")
    .attr("fill", "white");

// X axis label
g.append("text")
	.attr("class","x axis-label")
	.attr("x",width/2)
	.attr("y",height+50)
	.attr("font-size","20px")
	.attr("text-anchor","middle")
	.attr("fill","white")
	.text("GDP Per Capita ($)");

// Y axis label
g.append("text")
	.attr("class","y axis-label")
	.attr("x",-height/2)
	.attr("y",-60)
	.attr("font-size","20px")
	.attr("text-anchor","middle")
	.attr("transform","rotate(-90)")
	.attr("fill","white")
	.text("Life Expectancy (Years)");

// Year label
const yearLabel = g.append("text")
	.attr("class","year-label")
	.attr("x",width)
	.attr("y",height-10)
	.attr("font-size","40px")
	.attr("text-anchor","end")
	.attr("fill","grey")
	.text("1800");

// *********************
// Data loading, processing, and legend
// *********************

//Loading data
d3.json("data/data.json").then(function(data){
	console.log(data);

	//Cleaning data
	const formattedData = data.map((year)=>{
		return year["countries"]
			.filter((country)=>{
				const dataExists = (country.income && country.life_exp);
				return dataExists;
			})
			.map((country)=>{
				country.income = +country.income;
				country.life_exp = +country.life_exp;
				return country;
			})
	});

	//Extracting the continents
	const continents = [];
    formattedData[0].forEach(country => {
        if (!continents.includes(country.continent)) {
            continents.push(country.continent);
        }
    });

	//Configuring the color scale domain
	color.domain(continents);

	//Creating the legend
	const legend = g.append("g")
        .attr("transform", `translate(${width-15}, ${height - 125})`);

    continents.forEach((continent, i) => {
        const legendRow = legend.append("g")
            .attr("transform", `translate(0, ${i * 20})`);
        
        legendRow.append("text")
            .attr("x", -10)
            .attr("y", 10)
            .attr("text-anchor", "end")
            .attr("fill", "white")
            .style("text-transform", "capitalize")
            .text(continent);

		legendRow.append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", color(continent));
    });

	//Index to keep track of the year
	let yearIndex = 0;

	// Calling the update function for the first time
	update(formattedData[yearIndex], data[yearIndex].year);

	// Setting up an interval to call the update function every second
	d3.interval(() => {
    	yearIndex = (yearIndex + 1) % formattedData.length;
    	update(formattedData[yearIndex], data[yearIndex].year);
	}, 1000);

}).catch((error)=> {
    console.log(error);
});

// *********************
// Update function
// *********************

function update(data, year) {
	// Update the year label
    yearLabel.text(year);
    
	// JOIN new data with old elements.
    const circles = g.selectAll("circle")
        .data(data, d => d.country);
    
    // EXIT - remove old elements not present in new data.
    circles.exit()
        .transition()
        .duration(500)
        .attr("r", 0)
        .remove();
    
    // UPDATE - update old elements present in new data.
    circles
        .transition()
        .duration(1000)
        .attr("cx", d => x(d.income))
        .attr("cy", d => y(d.life_exp))
        .attr("r", d => Math.sqrt(area(d.population) / Math.PI));
    
    // ENTER - create new elements as needed.
    circles.enter()
        .append("circle")
        .attr("cx", d => x(d.income))
        .attr("cy", d => y(d.life_exp))
        .attr("r", 0) 
        .attr("fill", d => color(d.continent))
        .transition()
        .duration(1000)
        .attr("r", d => Math.sqrt(area(d.population) / Math.PI));
}


