import React, { Component } from "react";
import {
  select,
  geoPath,
  schemeYlOrRd,
  scaleSqrt,
  schemeRdBu,
  scaleLinear,
  extent,
  scaleLog,
  zoom,
  format,
  event,
  scaleQuantize,
  geoAlbersUsa
} from "d3";
import d3Tip from "d3-tip";
import "./usmap1.css";
import { LoadData1 } from "./loadData1";

import { Legend } from "./legend";
class US extends Component {
  componentDidMount() {
    this.usMap();
  }

  usMap() {
    let display = "State";
    let year = 2010;
    let visualization = "Shaded Area";
    this.map([display, year, visualization]);
  }
  map([display, year, visualType]) {
    const canvasWidth = 960;
    const ratio = 0.6;
    var margin = {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10
    };
    var canvasHeight = canvasWidth * ratio;
    //  console.log(this.refs.usmap1);
    const colorValue = d => d.properties.population;
    const svg = select(this.refs.mapdiv)
      .append("svg")
      .attr("class", "center-container")
      .attr("width", canvasWidth)
      .attr("height", canvasHeight)
      .attr("transform", "translate(150,40)");

    svg
      .append("rect")
      .attr("class", "background center-container")
      .attr("height", canvasHeight + 10)
      .attr("width", canvasWidth + 10);
    let dataCounty, dataState, meshed, meshed1;

    LoadData1(year).then(mapData => {
      dataCounty = mapData[1];
      dataState = mapData[0];
      meshed = mapData[2];
      meshed1 = mapData[3];
      drawMap();
    });

    const tipCounty = d3Tip()
      .attr("class", "tip")
      .html(d => {
        return (
          "<span'>County: " +
          d.properties.name +
          "<br>State: " +
          d.properties.state +
          "<br>Population: " +
          format(",")(d.properties.population) +
          "<br><i>scroll to zoom in/out</i>" +
          "</span>"
        );
      });

    const g = svg.append("g").attr("transform", "translate(0,0)");
    const path = geoPath().projection(geoAlbersUsa());
    const drawMap = () => {
      const colorScaleLog1 = scaleLinear()
        //.clamp(true)
        .domain([1000000, 10000, 100, 0, -100, -10000, -1000000])
        .range(schemeRdBu[7]);

      //const colorScale1 = scaleQuantize()
      // .domain(colorScaleLog1.range()) //排序
      // .range(schemeRdBu[9]);
      const counties = g.append("g").attr("id", "counties");

      counties.call(tipCounty);
      const county = counties
        .selectAll("path")
        .data(dataCounty)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", d => colorScaleLog1(colorValue(d)))
        .attr("class", "county_boundary")
        .on("mouseover", tipCounty.show) //鼠标悬停
        .on("mouseout", tipCounty.hide);
      let legendData = colorScaleLog1.range().reverse();
      let legendText = colorScaleLog1.domain();

      g.call(
        zoom().on("zoom", () => {
          g.attr("transform", event.transform);
        })
      );

      counties
        .append("path")
        .datum(meshed1)
        .attr("id", "county-borders")
        .attr("d", path);
      //zoom out county
      county.attr("class", function(d, i) {
        return "county" + i;
      });

      //state boders
      g.append("path")
        .datum(meshed)
        .attr("id", "state-borders")
        .attr("d", path);

      //legend for diffrent visualization

      svg.call(Legend, {
        data: legendData,
        legendText,
        shape: "rect"
      });
    };
  }

  render() {
    return <div ref="mapdiv"></div>;
  }
}
export default US;
