import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import Api from "./Api";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      zip: props.zip === undefined ? "" : props.zip,
      isValidZip: false,
      formSubmitted: false,
      data: {}
    };
  }

  updateZip = e => {
    const zip = e.target.value;
    if (/^\d*$/.test(zip) && zip.length < 6) {
      this.setState({
        zip,
        isValidZip: zip.length === 5
      });
    }
  };

  submitZip = e => {
    e.preventDefault();
    this.setState({
      formSubmitted: true,
      data: {}
    });
    Api.getZipData(
      this.state.zip,
      result => {
        this.setState({
          formSubmitted: false,
          data: result
        });
      },
      error => {
        this.setState({
          formSubmitted: false
        });
        alert(error);
      }
    );
  };

  render() {
    return (
      <div className="App">
        <h1 id="description">
          Get City Name, Temperature, Time-Zone, and Elevation from a Zip Code
        </h1>

        <form onSubmit={this.submitZip}>
          <label htmlFor="zip">Enter a zip code:</label>
          <input
            id="zip"
            type="tel"
            autoFocus
            onChange={this.updateZip}
            value={this.state.zip}
            disabled={this.state.formSubmitted}
          ></input>
          <button
            type="submit"
            disabled={this.state.formSubmitted || !this.state.isValidZip}
          >
            Submit
          </button>
        </form>

        {this.state.formSubmitted && <FontAwesomeIcon icon={faSync} spin />}

        {Object.keys(this.state.data).length !== 0 && (
          <p>
            At the location {this.state.data.city}, the temperature is {this.state.data.temperature.toFixed(0)}*C, the timezone is {this.state.data.timeZone}, and the elevation is {this.state.data.elevation.toFixed(0)} meters.
          </p>
        )}
      </div>
    );
  }
}

export default App;
