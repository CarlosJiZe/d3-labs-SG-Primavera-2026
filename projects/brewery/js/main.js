/*
*    main.js
*/

d3.json("data/revenues.json").then((data)=>{

    data.forEach((d)=>{
        d.revenue = +d.revenue
    })

const width = 600;
const height = 400;

const margin = {left: 180, right: 10, top: 130, bottom: 60};

const svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

svg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "black");

const header = svg.append("g")
    .attr("transform", "translate(0, 3)");

header.append("rect")
    .attr("width", "100%")
    .attr("height", 90)
    .attr("fill", "rgb(132, 90, 11)");

header.append("image")
    .attr("href", "img/logo.png")
    .attr("x", 10)
    .attr("y", 5)
    .attr("height", 80);

const g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const x = d3.scaleBand()
    .domain(data.map(d=> d.month))
    .range([0,width])
    .paddingInner(0.3)
    .paddingOuter(0.3);

const bottomAxis = d3.axisBottom(x);

g.append("g")
    .attr("class","bottom axis")
    .attr("transform","translate(0, "+height+")")
    .call(bottomAxis);

g.append("text")
    .attr("class", "x axis-label")
    .attr("x", (width / 2))
    .attr("y", height + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .style("fill","white")
    .text("Month");  

const y = d3.scaleLinear()
    .domain([0,d3.max(data, d=> d.revenue)])
    .range([height,0]);

const leftAxis = d3.axisLeft(y)
    .ticks(11)
    .tickFormat(d=>"$"+ (d/1000) + "K");

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
    .style("fill","white")
    .text("Revenue (dlls.)");  

// Estilos para los ejes
g.selectAll(".axis path, .axis line")
    .attr("stroke", "white");

g.selectAll(".axis text")
    .attr("fill", "white");

const rect = g.selectAll("rect")
    .data(data)

rect.enter()
    .append("rect")
        .attr("x", d=> x(d.month))
        .attr("y",d=> y(d.revenue))
        .attr("width",x.bandwidth())
        .attr("height", d=> height - y(d.revenue))
        .attr("fill", "rgb(204,204,2)");

}).catch((error)=> {
    console.log(error);
});