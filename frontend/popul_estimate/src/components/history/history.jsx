import React, { Component } from "react";
import { Select, Layout } from "antd";
import { backendAPI } from "../../config";
import axios from "axios";
import {
  retrieveStateYearlyData,
  retrieveStateDataForChosenYear,
  retrieveNationalDataForChosenYear,
  retrieveCountyDataInChosenState
} from "../../services/dataRetriever";
import {
  convertCodeToFullName,
  convertCodeToAbbr,
  stateToCode
} from "../../services/codeNameConverter";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { format } from "path";
import Axios from "axios";

class History extends Component {
  constructor(props) {
    super(props);
    this.stateArray = [];
    Object.keys(stateToCode).forEach(stateName => {
      this.stateArray.push({
        stateName: stateName,
        code: stateToCode[stateName]
      });
    });
    this.state = {
      selectedYear: 2018,
      chosenState: "01",
      stateData: {},
      nationalData: [],
      countyData: [],
      yearlyDataForChosenState: []
    };
  }
  getYearlyDataForChosenState = stateID => {
    retrieveStateYearlyData(stateID).then(results => {
      let data = [];
      console.log(results);
      for (let [index, result] of results.entries()) {
        data.push({
          name: result.data[1][0],
          year: (2018 - index).toString(),
          population: result.data[1][1]
        });
      }
      data.sort((a, b) => a.year - b.year);
      this.setState({ yearlyDataForChosenState: data });
    });
    /* axios.get(backendAPI + `population/state/${stateID}`).then(result => {
      let data = result.data.map(record => {
        return {
          name: record.stateName,
          year: record.year,
          population: record.population
        };
      }); */
    //data.sort((a, b) => a.year - b.year);
    // this.setState({ yearlyDataForChosenState: data });
    // axios.get(backendAPI + `predict/state/${stateID}`).then(result => {
    //   data.sort((a, b) => a.year - b.year);
    //   data[0].population = result.data[0].population;
    //   this.setState({ yearlyDataForChosenState: data });
    // });
    // });
  };
  getDataForChosenStateChosenYear = (state, year) => {
    retrieveStateDataForChosenYear(state, year).then(result => {
      this.setState({
        stateData: {
          id: result.data[1][2],
          population: +result.data[1][1],
          name: result.data[1][0]
        }
      });
    });
    /*  if (year != 2010) {
      axios
        .get(backendAPI + `population/state/${state}/year/${year}`)
        .then(result => {
          this.setState({
            stateData: {
              id: result.data.stateFips,
              population: +result.data.population,
              name: result.data.stateName
            }
          });
        });
    } else {
      axios
        .get(backendAPI + `predict/state/${state}/year/${year}`)
        .then(result => {
          this.setState({
            stateData: {
              id: result.data.stateFips,
              population: +result.data.population,
              name: result.data.stateName
            }
          });
        });
    } */
  };
  getNationalDataForChosenYear = year => {
    retrieveNationalDataForChosenYear(year).then(result => {
      let nationalData = result.data.slice(1).map(stateData => {
        return {
          population: +stateData[1],
          id: stateData[2],
          name: convertCodeToFullName(stateData[2].toString()),
          abbr: convertCodeToAbbr(stateData[2].toString())
        };
      });
      nationalData = nationalData.filter(data => data.name !== null);
      nationalData.sort((a, b) => {
        return b.population - a.population;
      });
      this.setState({ nationalData });
    });
    /* if (year != 2010) {
      axios.get(backendAPI + `population/year/${year}/state`).then(result => {
        let nationalData = result.data.map(stateData => {
          return {
            population: +stateData.population,
            id: stateData.stateFips,
            name: stateData.stateName,
            abbr: stateData.stateAbbr
          };
        });
        nationalData = nationalData.filter(data => data.name !== null);
        nationalData.sort((a, b) => {
          return b.population - a.population;
        });
        this.setState({ nationalData });
      });
    } else {
      axios.get(backendAPI + `predict/year/${year}/state`).then(result => {
        let nationalData = result.data.map(stateData => {
          return {
            population: +stateData.population,
            id: stateData.stateFips,
            name: stateData.stateName,
            abbr: stateData.stateAbbr
          };
        });
        nationalData = nationalData.filter(data => data.name !== null);
        nationalData.sort((a, b) => {
          return b.population - a.population;
        });
        this.setState({ nationalData });
      }); */
    //}
  };
  getCountyDataInState = (state, year) => {
    retrieveCountyDataInChosenState(state, year).then(result => {
      let data = result.data.slice(1).map(countyData => {
        return {
          population: +countyData[1],
          id: countyData[3],
          name: countyData[0],
          stateID: countyData[2]
        };
      });
      data = data.filter(data => data.name !== null);
      data.sort((a, b) => {
        return b.population - a.population;
      });
      data = data.slice(0, 20);
      this.setState({ countyData: data });
    });
    /* if (year != 2010) {
      axios
        .get(backendAPI + `population/state/${state}/year/${year}/county`)
        .then(result => {
          let data = result.data.map(countyData => {
            return {
              population: +countyData.population,
              id: countyData.countyFips,
              name: countyData.countyName,
              stateID: countyData.stateFips
            };
          });
          data = data.filter(data => data.name !== null);
          data.sort((a, b) => {
            return b.population - a.population;
          });
          data = data.slice(0, 20);
          this.setState({ countyData: data });
        });
    } else {
      axios
        .get(backendAPI + `predict/state/${state}/year/${year}/county`)
        .then(result => {
          let data = result.data.map(countyData => {
            return {
              population: +countyData.population,
              id: countyData.countyFips,
              name: countyData.countyName,
              stateID: countyData.stateFips
            };
          });
          data = data.filter(data => data.name !== null);
          data.sort((a, b) => {
            return b.population - a.population;
          });
          data = data.slice(0, 20);
          this.setState({ countyData: data });
        });
    } */
  };
  componentDidMount() {
    this.getCountyDataInState(this.state.chosenState, this.state.selectedYear);
    this.getYearlyDataForChosenState(this.state.chosenState);
    this.getDataForChosenStateChosenYear(
      this.state.chosenState,
      this.state.selectedYear
    );
    this.getNationalDataForChosenYear(this.state.selectedYear);
  }
  handleSelectYear = selectedYear => {
    this.setState({ selectedYear });
    this.getNationalDataForChosenYear(selectedYear);
    this.getCountyDataInState(this.state.chosenState, selectedYear);
  };
  handleSelectState = chosenState => {
    this.setState({ chosenState });
    this.getYearlyDataForChosenState(chosenState);
    this.getCountyDataInState(chosenState, this.state.selectedYear);
  };
  handleBarClick = (data, index) => {
    if (data.id < 10) {
      this.setState({ chosenState: "0" + data.id.toString() });
    } else {
      this.setState({ chosenState: data.id.toString() });
    }
    this.getYearlyDataForChosenState(data.id);
    this.getCountyDataInState(data.id, this.state.selectedYear);
  };
  handleLineClick = data => {
    console.log(data);
  };
  populationTickFormatter = value => {
    // hundreds
    if (value <= 999) {
      return value;
    }
    // thousands
    else if (value >= 1000 && value <= 999999) {
      return value / 1000 + "K";
    }
    // millions
    else if (value >= 1000000 && value <= 999999999) {
      return value / 1000000 + "M";
    }
    // billions
    else if (value >= 1000000000 && value <= 999999999999) {
      return value / 1000000000 + "B";
    } else return value;
  };
  render() {
    const { Option } = Select;
    const { Header, Content, Footer, Sider } = Layout;

    return (
      <Layout>
        <Sider width={250}>
          <h4 style={{ color: "white", textAlign: "center", marginTop: 20 }}>
            Selected Year:
          </h4>
          <Select
            onChange={this.handleSelectYear}
            defaultValue={"2018"}
            style={{ display: "block", margin: "auto", width: "80%" }}
          >
            <Option value="2018">2018</Option>
            <Option value="2017">2017</Option>
            <Option value="2016">2016</Option>
            <Option value="2015">2015</Option>
            <Option value="2014">2014</Option>
            <Option value="2013">2013</Option>
            <Option value="2012">2012</Option>
            <Option value="2011">2011</Option>
            <Option value="2010">2010</Option>
          </Select>
          <h4 style={{ color: "white", textAlign: "center", marginTop: 20 }}>
            Selected State:
          </h4>
          <Select
            value={convertCodeToFullName(this.state.chosenState)}
            style={{ display: "block", margin: "auto", width: "80%" }}
            onChange={this.handleSelectState}
          >
            {this.stateArray.map(state => {
              return (
                <Option value={state.code} key={state.code}>
                  {state.stateName}
                </Option>
              );
            })}
          </Select>
        </Sider>
        <Layout>
          <Content>
            <h3 style={{ textAlign: "center", marginTop: 20 }}>
              Population estimation for all states in the year{" "}
              {this.state.selectedYear}
            </h3>
            <div style={{ width: "80%", height: 500, margin: "auto" }}>
              <ResponsiveContainer>
                <BarChart
                  data={this.state.nationalData}
                  margin={{
                    top: 5,
                    right: 50,
                    left: 50,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-60}
                    textAnchor="end"
                    height={100}
                    interval={0}
                  />
                  <YAxis tickFormatter={this.populationTickFormatter} />
                  <Tooltip />
                  <Legend margin={{ top: 200 }} />
                  <Bar
                    dataKey="population"
                    fill="#8884d8"
                    onClick={this.handleBarClick}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* <div style={{ width: "80%", height: 400, margin: "auto" }}>
              <ResponsiveContainer>
                <LineChart
                  data={this.state.yearlyDataForChosenState}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="population" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div> */}
            <h3 style={{ textAlign: "center" }}>
              Population estimates from 2010 to 2018 for the state{" "}
              {convertCodeToFullName(this.state.chosenState)}
            </h3>
            <div style={{ width: "80%", height: 400, margin: "auto" }}>
              <ResponsiveContainer>
                <AreaChart
                  data={this.state.yearlyDataForChosenState}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis
                    domain={["auto", "auto"]}
                    tickFormatter={this.populationTickFormatter}
                  />
                  <Tooltip />
                  <Area
                    onClick={this.handleLineClick}
                    type="monotone"
                    dataKey="population"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <h3 style={{ textAlign: "center" }}>
              Top 20 counties in {convertCodeToFullName(this.state.chosenState)}{" "}
              in the year {this.state.selectedYear}
            </h3>
            <div style={{ width: "80%", height: 1600, margin: "auto" }}>
              <ResponsiveContainer>
                <BarChart
                  data={this.state.countyData}
                  layout="vertical"
                  margin={{
                    top: 5,
                    right: 10,
                    left: 50,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    tickFormatter={this.populationTickFormatter}
                  />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="population" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default History;
