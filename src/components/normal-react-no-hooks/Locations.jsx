import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Areas from "./Areas";
import Cities from "./Cities";
import Countries from "./Countries";
import DarkMode from "../shared/DarkMode";
import ShowEntries from "./ShowEntries";
import Axios from "axios";

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
    const fetchCountriesData = async () => {
      const result = await Axios.get(countriesUrl);
      const countries = result.data.data;
      countries.map((country) => {
        //setting countries
        this.setState({
          countries: this.state.countries.concat(country),
        });
      });
    };
    fetchCountriesData();

    this.getCountryDataOnSelect = this.getCountryDataOnSelect.bind(this);
    this.getCityDataOnSelect = this.getCityDataOnSelect.bind(this);
    this.getAreaDataOnSelect = this.getAreaDataOnSelect.bind(this);
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
    document.getElementById("defaultCountriesOption").classList.add("d-none");
  }

  getCities(id) {
    const citiesUrl = `${this.state.baseUrl}/country/${id}/city`;
    const fetchCitiesData = async () => {
      const result = await Axios.get(citiesUrl);
      const cities = result.data.data;
      cities.map((city) => {
        this.setState({ cities: this.state.cities.concat(city) });
      });
    };
    fetchCitiesData();
    //resetting cities and selected city on new country select
    this.setState({ cities: [], selectedCity: "" });
  }

  getAreas(countryId, cityId) {
    const areasUrl = `${this.state.baseUrl}/country/${countryId}/city/${cityId}/area`;
    //blocking the request if country not Egypt
    if (countryId === "56") {
      const fetchAreasData = async () => {
        const result = await Axios.get(areasUrl);
        const areas = result.data.data;
        areas.map((area) => {
          this.setState({ areas: this.state.areas.concat(area) });
        });
      };
      fetchAreasData();
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
    const cityId = e.target.value;
    this.getAreas(countryId, cityId);
    document.getElementById("defaultCitiesOption").classList.add("d-none");
  }

  getAreaDataOnSelect(e) {
    const index = e.nativeEvent.target.selectedIndex;
    const selectedArea = e.nativeEvent.target[index].text;
    this.setState({ selectedArea: selectedArea });
    document.getElementById("defaultAreasOption").classList.add("d-none");
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
                    selectedArea={selectedArea}
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
          <DarkMode />
        </Row>
      </Container>
    );
  }
}

export default Locations;
