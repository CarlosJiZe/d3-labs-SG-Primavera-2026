/*
*    main.js
*/


d3.json("data/buildings.json").then((data)=>{

    data.forEach((d)=>{
        d.height = +d.height
    })

const svg = d3.select("#chart-area")
    .append("svg")
    .attr("width",1000)
    .attr("height",1000);


const rect = svg.selectAll("rect")
    .data(data)

rect.enter()
    .append("rect")
        .attr("x", (d,i)=> {return (i*50)})
        .attr("y",(d)=> {return 1000-d.height})
        .attr("width",40)
        .attr("height", (d)=> {return d.height})
        .attr("fill", (d,i)=>{return `rgb(${i*10},${i*15},${i*20})`});

}).catch((error)=> {
console.log(error);
});