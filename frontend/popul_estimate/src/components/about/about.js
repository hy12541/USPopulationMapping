import React, { Component } from "react";
import { Typography, Divider } from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const About = () => {
  const { Title, Paragraph, Text } = Typography;
  return (
    <div style={{ width: "80%", margin: "auto", marginTop: "50px" }}>
      <Typography>
        <Title level={2}>Introduction</Title>
        <Paragraph>
          <ul>
            <li>
              Population prediction at US county level using machine learning
              approach (ML) by exploring the relationships between county
              population and four characteristics - county geographical land
              area, income per capita, average life expectancy, and housing
              units.
            </li>
            <li>Provide interactive visualization tool for users</li>
          </ul>
        </Paragraph>
        <Divider></Divider>
        <Title level={2}>Motivation</Title>
        <ul>
          <li>
            Traditional field-based population census data collection:
            expensive, time-consuming
          </li>
          <li>
            Current population projection methods: failed to reach the level of
            accuracies
          </li>
          <li>
            Getting accurate population estimation is a crucial component of
            many decision-making processes that many government institute
            and private businesses care. E.g. urban development, infectious
            disease containment, evacuation planning, risk management,
            conservation planning, etc.
          </li>
        </ul>
        <Divider></Divider>
        <Title level={2}>Method</Title>
        <Paragraph>
          <ul>
            <li>
              5 machine learning algorithms for regression are applied:
              <ul>
                <li>Linear Regression</li>
                <li>k-Nearest Neighbor (KNN)</li>
                <li>Decision Tree</li>
                <li>Random Forest</li>
                <li>Support Vector Regression (SVR)</li>
              </ul>
            </li>
            <li>2010 dataset: 70% training set, 30% testing set</li>
            <li>
              Features X: county geographical land area, income per capita,
              average life expectancy, and housing units. Y: Population in
              county.
            </li>
            <li>Hyperparameter tuning to achieve higher prediction accuracy</li>
            <li>
              Intuition: Assuming county’s population is correlated to its 4
              characteristics
            </li>
            <li>
              Innovation
              <ul>
                <li>
                  (i) Machine Learning techniques are applied as a powerful
                  forecasting approach.
                </li>
                <li>
                  (ii) 4 features are indirectly related to demographic
                  characteristics, i.e. birth rate, death rate, immigration, and
                  emigration
                </li>
              </ul>
            </li>
          </ul>
        </Paragraph>
        <Divider></Divider>
        <Title level={2}>Data</Title>
        <Paragraph>
          <ul>
            <li>
              Our datasets are downloaded from the following sources:
              <ul>
                <li>
                  <a
                    href="
                   https://factfinder.census.gov/faces/nav/jsf/pages/download_center.xhtml 
                  "
                    target="_blank"
                  >
                    2010 Decennial Census: (3100+ records)
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="
                  https://www.cdc.gov/nchs/nvss/usaleep/usaleep.html, Life
                    "
                  >
                    Life expectancy data: (65662 records)--Expectancy Files -
                    United States – CSV 
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="
                  https://factfinder.census.gov/faces/nav/jsf/pages/download_center.xhtml 
                  "
                  >
                    Housing units &amp; land area data: (3200+ records)
                    --Population, Housing Units, Area, and Density:
                    DEC_10_SF1_GCTPH1.US05PR, table ID: GCT-PH1
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="
                  https://factfinder.census.gov/faces/nav/jsf/pages/download_center.xhtml
                    "
                  >
                    Income per capita data: (3100+ records)--Per capita income
                    in the past 12 months (in 2010 inflation-adjusted dollars),
                    table ID: B19301 
                  </a>
                </li>
              </ul>
            </li>
            <li>Data cleaning and transforming: OpenRefine+Python</li>
            <li>Data analysis and modeling: Python</li>
          </ul>
        </Paragraph>
        <Divider></Divider>
        <Title level={2}>Experiments and Results</Title>
        <Title level={3}>Prediction results and evaluation:</Title>
        <Paragraph>
          <ul>
            <li>
              3 evaluation metrics: MAE, RMSE, R2. Benchmark: 2010 population
              census data.
            </li>
            <li>
              Linear regression is the best in terms of accuracy (R2 of 0.986)
              and simplicity.
            </li>
            <li>
              Feature housing units is highly correlated to population. Other
              three features have minimal correlations with population.
            </li>
          </ul>
        </Paragraph>
        <Divider></Divider>
        <Title level={2}>Data visualization</Title>
        <ul>
          <li>
            <Link to="/map">
              Heatmap, bubble chart, dot density distribution of population
              estimation 
            </Link>
          </li>
          <li>
            <Link to="/history">
              Rank &amp; yearly growth trend of state-wise population estimation
            </Link>
          </li>
        </ul>

        <Divider></Divider>
        <Title level={2}>Limitations and Future Work</Title>
        <Paragraph>
          <ul>
            <li>
              Population estimation is a time series analysis. Due to the short
              time frame and scope, the time factor is not considered in our
              study.
            </li>
            <li>
              Deep learning of remote sensing image could be an alternative
              approach.
            </li>
          </ul>
        </Paragraph>
      </Typography>
    </div>
  );
};

export default About;
