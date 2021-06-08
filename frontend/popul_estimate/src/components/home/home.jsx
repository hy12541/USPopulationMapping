import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { Component } from "react";
import gatech from "./gatech.png";
import p1 from "./difference-crop.png";
import p2 from "./p3.PNG";

class Home extends Component {
  state = {};
  render() {
    return (
      <div className="bd-example">
        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleCaptions"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={gatech} className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5 style={{ color: "white" }}>
                  Population Prediction by Machinle Learning
                </h5>
                <p>Team 11, CSE 6242, 2019 Fall. GaTech</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={p1} className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5>Prediction Accuracy</h5>
                <p style={{ color: "grey" }}>
                  The difference of the prediction and the census results
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={p2} className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5>Dot Density Map</h5>
                <p></p>
              </div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleCaptions"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleCaptions"
            role="button"
            data-slide="next"
          >
            <span uName="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    );
  }
}

export default Home;
