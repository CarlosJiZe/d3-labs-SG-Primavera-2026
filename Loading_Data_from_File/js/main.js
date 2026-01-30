/*
*    main.js
*/

/*
Step 1: Load data from diferent file formats (CSV, TSV, JSON)
*/

console.log("CSV")
d3.csv("data/ages.csv").then((data)=> {
	console.log(data);
});

console.log("TSV")
d3.tsv("data/ages.tsv").then((data)=> {
	console.log(data);
});

console.log("JSON")
d3.json("data/ages.json").then((data)=> {
	console.log(data);
});

/*
Step 2: Loading data transforming age to number
*/

console.log("Ages as numbers")
d3.json("data/ages.json").then((data)=> {
	data.forEach((d)=>{
		d.age = +d.age;
	});
	console.log(data);
});

/*
Step 3: Creating SVG and circles based on data
*/


console.log("Ages as circles")
d3.json("data/ages.json").then((data)=> {

    data.forEach((d)=>{
        d.age = +d.age
    })


const svg = d3.select("#chart-area")
    .append("svg")
    .attr("width",400)
    .attr("height",400);

const circles = svg.selectAll("circle")
    .data(data);

circles.enter()
    .append("circle")
        .attr("cx", (d,i)=> {return (i*25)+12})
        .attr("cy",200)
        .attr("r", (d)=> {return d.age})
        .attr("fill", "blue");
});

/*
Step 4: Showing error handling
*/

console.log("Error handling")
d3.json("data/ajes.json").then((data) => {
    data.forEach((d) => {
        d.age = +d.age;
    });
}).catch((error) => {
    console.log(error);
});

/*
Step 5: Extra: using conditions
*/

console.log("Using conditions")
d3.json("data/ages.json").then((data)=> {

    data.forEach((d)=>{
        d.age = +d.age
    })


const svg = d3.select("#chart-area")
    .append("svg")
    .attr("width",400)
    .attr("height",400);

const circles = svg.selectAll("circle")
    .data(data);

circles.enter()
    .append("circle")
        .attr("cx", (d,i)=> {return (i*25)+12})
        .attr("cy",200)
        .attr("r", (d)=> {return d.age})
        .attr("fill", (d)=> d.age > 10 ? "orange" : "blue");
}).catch((error) => {
    console.log(error);
});