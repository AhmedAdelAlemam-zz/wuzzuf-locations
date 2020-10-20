import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Areas from "./Areas";
import Cities from "./Cities";
import Countries from "./Countries";
import ShowEntries from "./ShowEntries";

class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      cities: [],
      areas: [],
      currentCountryId: "",
      selectedCountry: "",
      selectedCity: "",
      selectedArea: "",
      isCitySelected: false,
      baseUrl: "http://46.101.108.59/api",
    };
  }
  componentDidMount() {
    const countriesUrl = `${this.state.baseUrl}/countries`;
    fetch(countriesUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const countries = data.data;
        countries.map((country) => {
          //setting countries
          return this.setState({
            countries: this.state.countries.concat(country),
          });
        });
      });
    this.getCountryDataOnSelect = this.getCountryDataOnSelect.bind(this);
    this.getCityDataOnSelect = this.getCityDataOnSelect.bind(this);
    this.getAreaDataOnSelect = this.getAreaDataOnSelect.bind(this);
    this.toggleDarkMode = this.toggleDarkMode.bind(this);
  }

  getCountryDataOnSelect(e) {
    const index = e.nativeEvent.target.selectedIndex;
    const checkIfCitySelected = e.nativeEvent.target[index].selected;
    const selectedCountry = e.nativeEvent.target[index].text;
    this.setState({
      currentCountryId: e.target.value,
      isCitySelected: checkIfCitySelected,
      selectedCountry: selectedCountry,
    });
    this.getCities(e.target.value);
  }

  getCities(id) {
    const citiesUrl = `${this.state.baseUrl}/country/${id}/city`;
    fetch(citiesUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const cities = data.data;
        cities.map((city) => {
          this.setState({ cities: this.state.cities.concat(city) });
        });
      });
    //resetting cities and selected city on new country select
    this.setState({ cities: [], selectedCity: "" });
  }

  getAreas(countryId, cityId) {
    const areasUrl = `${this.state.baseUrl}/country/${countryId}/city/${cityId}/area`;
    //blocking the request if country not Egypt
    if (countryId === "56") {
      fetch(areasUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const areas = data.data;
          areas.map((area) => {
            this.setState({ areas: this.state.areas.concat(area) });
          });
        });
    }
    //resetting areas on new city select
    this.setState({ areas: [] });
  }

  getCityDataOnSelect(e) {
    const index = e.nativeEvent.target.selectedIndex;
    const selectedCity = e.nativeEvent.target[index].text;
    this.setState({
      selectedCity: selectedCity,
      selectedArea: "",
    });

    const countryId = this.state.currentCountryId;
    this.getAreas(countryId, e.target.value); //second parameter here is for city id
  }

  toggleDarkMode() {
    const body = document.body;
    const container = document.getElementById("container");
    const toggler = document.getElementById("toggler");
    body.classList.toggle("dark-mode");
    container.classList.toggle("text-white");
    toggler.classList.toggle("transform");
  }

  getAreaDataOnSelect(e) {
    const index = e.nativeEvent.target.selectedIndex;
    const selectedArea = e.nativeEvent.target[index].text;
    this.setState({ selectedArea: selectedArea });
  }

  render() {
    const {
      countries,
      cities,
      areas,
      currentCountryId,
      selectedCity,
      selectedCountry,
      isCitySelected,
      selectedArea,
    } = this.state;
    return (
      <Container fluid id="container" className="mt-4">
        <Row>
          <Col md="4" />
          <Col md="4">
            <Row>
              <Col md="7">
                <h2 className="mb-3">Locations</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <Countries
                  countries={countries}
                  getCountryDataOnSelect={this.getCountryDataOnSelect}
                  selectedCountry={selectedCountry}
                />
                {isCitySelected ? (
                  <Cities
                    cities={cities}
                    selectedCity={selectedCity}
                    getCityDataOnSelect={this.getCityDataOnSelect}
                  />
                ) : null}
                {currentCountryId === "56" && isCitySelected ? (
                  <Areas
                    areas={areas}
                    getAreaDataOnSelect={this.getAreaDataOnSelect}
                  />
                ) : null}
                <ShowEntries
                  selectedCity={selectedCity}
                  selectedCountry={selectedCountry}
                  currentCountryId={currentCountryId}
                  selectedArea={selectedArea}
                />
              </Col>
            </Row>
          </Col>
          <Col md="2" />
          <Col md="2">
            <Row className="pointer" onClick={this.toggleDarkMode}>
              <Col md="2">
                <i className="fa fa-sun-o"></i>
              </Col>
              <Col md="1">
                <span className="slider round pointer" id="toggler"></span>
              </Col>
              <Col md="2">
                <i className="fa fa-moon-o"></i>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Locations;
