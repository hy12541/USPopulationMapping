//import jsonData from "./us-counties.topojson";
import axios from "axios";
import { json, csv } from "d3";
import { feature, mesh } from "topojson";
import { api } from "../../config";

export const LoadData1 = year =>
  Promise.all([
    json("https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json"),
    axios.get(
      // `${api}/${year}/pep/population?get=GEONAME,POP&for=state:*`
      `${api}/${year}/pep/natstprc?get=STNAME,POP&DATE_=7&for=state:*`
    ),
    axios.get(`${api}/2015/pep/population?get=GEONAME,POP&for=county:*`)
    //axios.get(`${api}/year/${year}/state`),
    //axios.get(`${api}/year/${year}/county`)
    //axios.get(`${api}/difference/year/${year}`)
  ]).then(([json, popul, populCounty]) => {
    console.log(json);
    //console.log(populCounty);
    const county = feature(json, json.objects.counties).features;

    const state = feature(json, json.objects.states).features;
    const statePopulation = popul.data.reduce((accumulator, d) => {
      accumulator[d[3]] = { population: +d[1] };
      return accumulator;
    }, {});
    const countyPopulation = populCounty.data.reduce((accumulator, d) => {
      accumulator[d[2].concat(d[3])] = {
        population: +d[1],
        state: d[0].split(", ")[1]
        /* if (d.countyFips < 10) {
        d.countyFips = "00" + d.countyFips;
      } else if (d.countyFips < 100) {
        d.countyFips = "0" + d.countyFips;
      } else {
        d.countyFips = "" + d.countyFips;
      } 

      /* d.stateFips = "" + d.stateFips;

      accumulator[+d.stateFips.concat(d.countyFips)] = {
        population: +d.population,
        state: d.stateName */
      };
      return accumulator;
    }, {});
    console.log(popul.data);
    state.forEach(d => {
      Object.assign(d.properties, statePopulation[d.id]);
    });
    county.forEach(d => {
      Object.assign(d.properties, countyPopulation[d.id]);
    });
    console.log(popul.data);
    const meshed = mesh(json, json.objects.states, function(a, b) {
      return a !== b;
    });
    const meshed1 = mesh(
      json,
      json.objects.counties,
      (a, b) => a !== b && ((a.id / 1000) | 0) === ((b.id / 1000) | 0)
    );
    return [state, county, meshed, meshed1];
  });
