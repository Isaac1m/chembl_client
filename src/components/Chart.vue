<template>
  <div class="heatmap"></div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "Chart",
  data() {
    return {};
  },
  methods: {
    mapData: () => {
      let itemSize = 70,
        cellSize = itemSize - 1,
        margin = { top: 120, right: 20, bottom: 20, left: 110 };

      let width = 1150 - margin.right - margin.left,
        height = 1000 - margin.top - margin.bottom;

      d3.json("/data/db.json", (response) => {

        let data = response.map( (item) =>{
          let entry = {};
          entry.target = item.target_chembl_id;
          entry.molecule = item.molecule_pref_name;
          entry.pchembl = item.pchembl_value;

          return entry;
        });

        // console.log(data);

        let x_elements = d3
            .set(
              data.map( (item) => {
                return item.molecule;
              })
            )
            .values(),
          y_elements = d3
            .set(
              data.map( (item) =>{
                return item.target;
              })
            )
            .values();

        let xScale = d3.scale
          .ordinal()
          .domain(x_elements)
          .rangeBands([0, x_elements.length * itemSize]);

        let xAxis = d3.svg
          .axis()
          .scale(xScale)
          .tickFormat( (d) => {
            return d;
          })
          .orient("top");

        let yScale = d3.scale
          .ordinal()
          .domain(y_elements)
          .rangeBands([0, y_elements.length * itemSize]);

        let yAxis = d3.svg
          .axis()
          .scale(yScale)
          .tickFormat( (d) =>{
            return d;
          })
          .orient("left");

        let colorScale = d3.scale
          .threshold()
          .domain([5, 8.05])
          .range(["#2980B9", "#E67E22", "#27AE60", "#27AE60"]);

        let svg = d3
          .select(".heatmap")
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr(
            "transform",
            "translate(" + margin.left + "," + margin.top + ")"
          );

        svg
          .selectAll("rect")
          .data(data)
          .enter()
          .append("g")
          .append("rect")
          .attr("class", "cell")
          .attr("width", cellSize)
          .attr("height", cellSize)
          .attr("y", (d) => {
            return yScale(d.target);
          })
          .attr("x", (d) => {
            return xScale(d.molecule);
          })
          .attr("fill", (d) => {
            return colorScale(d.pchembl);
          });

        svg
          .append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .selectAll("text")
          .attr("font-weight", "normal");

        svg
          .append("g")
          .attr("class", "x axis")
          .call(xAxis)
          .selectAll("text")
          .attr("font-weight", "normal")
          .style("text-anchor", "start")
          .attr("dx", ".8em")
          .attr("dy", ".5em")
          .attr("transform", () => {
            // d
            return "rotate(-65)";
          });
      });
    } // mapData
  }, // methods

  created() {
    this.mapData();
  }
};
</script>


<style>
.axis path,
.axis line {
  fill: none;
  stroke: black;
  shape-rendering: crispEdges;
}

.axis text {
  font-family: sans-serif;
  font-size: 11px;
}
</style>
