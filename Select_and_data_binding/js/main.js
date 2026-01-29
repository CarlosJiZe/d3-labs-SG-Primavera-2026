/*
*    main.js
*/

const svg = d3.select("#chart-area")
    .append("svg")
    .attr("width",400)
    .attr("height",400);

var data = [25, 20, 15, 10, 5];

const rect = svg.selectAll("rect")
    .data(data)

rect.enter()
    .append("rect")
        .attr("x", (d,i)=> {return (i*50)})
        .attr("y",(d)=> {return 255-d})
        .attr("width",40)
        .attr("height", (d)=> {return d})
        .attr("fill", (d,i)=>{return `rgb(${i*10},${d*10},${i*15})`});