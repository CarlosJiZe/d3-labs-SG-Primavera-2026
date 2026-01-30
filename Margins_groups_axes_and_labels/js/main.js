/*
*    main.js
*/


d3.json("data/buildings.json").then((data)=>{

    data.forEach((d)=>{
        d.height = +d.height
    })

const width = 600;
const height = 400;

const margin = {left: 100, right: 10, top: 10, bottom: 150};



const g = d3.select("body")
    .append("svg")
        .attr("width",width + margin.left + margin.right)
        .attr("height",height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const x = d3.scaleBand()
    .domain(data.map(d=> d.name))
    .range([0,width])
    .paddingInner(0.3)
    .paddingOuter(0.3);

const bottomAxis = d3.axisBottom(x);

g.append("g")
    .attr("class","bottom axis")
    .attr("transform","translate(0, "+height+")")
    .call(bottomAxis)
        .selectAll("text")
        .attr("x", -5)
        .attr("y", 10)
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)");

g.append("text")
	.attr("class", "x axis-label")
	.attr("x", (width / 2))
	.attr("y", height + 140)
	.attr("font-size", "20px")
	.attr("text-anchor", "middle")
	.style("fill","black")
	.text("The world's tallest buildings");  

const y = d3.scaleLinear()
    .domain([0,d3.max(data, d=> d.height)])
    .range([height,0]);

const leftAxis = d3.axisLeft(y)
    .ticks(5)
    .tickFormat(d=> d + "m");

g.append("g")
    .attr("class","left axis")
    .call(leftAxis);

g.append("text")
	.attr("class", "y axis-label")
	.attr("x", - (height / 2))
	.attr("y", -60)
	.attr("font-size", "20px")
	.attr("text-anchor", "middle")
	.attr("transform", "rotate(-90)")
	.style("fill","black")
	.text("Height (m)");  


const color = d3.scaleOrdinal()
    .domain(data.map(d=> d.name))
    .range(d3.schemeSet3);

const rect = g.selectAll("rect")
    .data(data)

rect.enter()
    .append("rect")
        .attr("x", d=> x(d.name))
        .attr("y",d=> y(d.height))
        .attr("width",x.bandwidth())
        .attr("height", d=> height - y(d.height))
        .attr("fill", d => color(d.name));

}).catch((error)=> {
console.log(error);
});