/*
*    main.js
*/

const svg = d3.select("#chart-area")
    .append("svg")
    .attr("width",400)
    .attr("height",400);


const circle = svg.append("circle")
    .attr("cx",100)
    .attr("cy",250)
    .attr("r",70)
    .attr("fill", "rgb(0,0,255)");

const rect = svg.append("rect")
    .attr("x",20)
    .attr("y",20)
    .attr("width",20)
    .attr("height",30)
    .attr("fill", "rgb(255,0,0)");

