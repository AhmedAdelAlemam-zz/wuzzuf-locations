import React from "react";
import Axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Container, FormGroup, Row } from "react-bootstrap";
import DarkMode from "../shared/DarkMode";

const LocationsWithHooks = () => {
  let [countries, setCountries] = useState([]);
  let [cities, setCities] = useState([]);
  let [areas, setAreas] = useState([]);
  const [currentCountryId, setCurrentCountryId] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [isCitySelected, setIsCitySelected] = useState(false);
  const baseUrl = "http://46.101.108.59/api";

  const countriesUrl = `${baseUrl}/countries`;
  useEffect(() => {
    async function fetchData() {
      const result = await Axios.get(countriesUrl);
      countries = result.data.data;
      countries.map((country) => {
        //setting countries
        return setCountries(countries.concat(country));
      });
    }
    fetchData();
  }, []);

  const getCities = (id) => {
    const citiesUrl = `${baseUrl}/country/${id}/city`;
    async function fetchCities() {
      const citiesResult = await Axios.get(citiesUrl);
      cities = citiesResult.data.data;
      cities.map((city) => {
        setCities(cities.concat(city));
      });
    }
    fetchCities();

    //resetting cities and selected city on new country select
    setCities([]);
    setIsCitySelected(true);
  };

  const getCountryDataOnSelect = (e) => {
    const index = e.nativeEvent.target.selectedIndex;
    const checkIfCitySelected = e.nativeEvent.target[index].selected;
    const selectedCountry = e.nativeEvent.target[index].text;
    setCurrentCountryId(e.target.value);
    setIsCitySelected(checkIfCitySelected);
    setSelectedCountry(selectedCountry);
    getCities(e.target.value);
    document.getElementById("defaultCountriesOption").classList.add("d-none");
  };

  const getAreas = (countryId, cityId) => {
    const areasUrl = `${baseUrl}/country/${countryId}/city/${cityId}/area`;
    //blocking the request if country not Egypt
    if (countryId === "56") {
      async function fetchAreas() {
        const areasResult = await Axios.get(areasUrl);
        areas = areasResult.data.data;
        areas.map((area) => {
          setAreas(areas.concat(area));
        });
      }
      fetchAreas();
    }
    //resetting areas on new city select
    setAreas([]);
  };

  const getCityDataOnSelect = (e) => {
    const index = e.nativeEvent.target.selectedIndex;
    const selectedCity = e.nativeEvent.target[index].text;
    setSelectedCity(selectedCity);
    setSelectedArea("");
    const countryId = currentCountryId;
    getAreas(countryId, e.target.value); //second parameter here is for city id
    document.getElementById("defaultCitiesOption").classList.add("d-none");
  };

  const getAreaDataOnSelect = (e) => {
    const index = e.nativeEvent.target.selectedIndex;
    const selectedArea = e.nativeEvent.target[index].text;
    setSelectedArea(selectedArea);
    document.getElementById("defaultAreasOption").classList.add("d-none");
  };
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
              <>
                <FormGroup>
                  <label className="h4">Country</label>
                  <select
                    className="form-control countries"
                    onChange={getCountryDataOnSelect}
                  >
                    <option id="defaultCountriesOption">Select Country</option>
                    {countries.map((country, i) => {
                      return (
                        <option key={i} value={country.id}>
                          {country.attributes.name}
                        </option>
                      );
                    })}
                  </select>
                </FormGroup>
                {selectedCountry === "" ? (
                  <h6 className="text-danger">Please select a country</h6>
                ) : null}
              </>
              {isCitySelected ? (
                <>
                  <FormGroup>
                    <label className="h4 mt-4">City</label>
                    <select
                      className="form-control cities"
                      onChange={getCityDataOnSelect}
                      disabled={cities.length === 0}
                    >
                      <option id="defaultCitiesOption">Select City</option>
                      {cities.length !== 0
                        ? cities.map((city, x) => {
                            return (
                              <option
                                key={x}
                                value={city.id}
                                name={city.attributes.name}
                              >
                                {city.attributes.name}
                              </option>
                            );
                          })
                        : null}
                    </select>
                  </FormGroup>
                  {selectedCity === "" ? (
                    <h6 className="text-danger">Please select a city</h6>
                  ) : null}
                </>
              ) : null}
              {currentCountryId === "56" && isCitySelected ? (
                <FormGroup>
                  <label className="h4 mt-4">Area</label>
                  <select
                    className="form-control areas"
                    disabled={areas.length === 0}
                    onChange={getAreaDataOnSelect}
                  >
                    <option id="defaultAreasOption">Select Area</option>
                    {areas.length !== 0
                      ? areas.map((area, num) => {
                          return (
                            <option key={num} value={area.id}>
                              {area.attributes.name}
                            </option>
                          );
                        })
                      : null}
                  </select>
                </FormGroup>
              ) : null}
              {selectedCity !== "" && selectedCountry !== "" ? (
                <div className="mt-4">
                  <h3>Your entries are</h3>
                  <ul>
                    <li className="mb-2">
                      <span className="h6 pr-2">Country:</span>
                      <strong>{selectedCountry}</strong>
                    </li>
                    <li className="mb-2">
                      <span className="h6 pr-2">City:</span>
                      <strong>{selectedCity}</strong>
                    </li>
                    {currentCountryId === "56" && selectedArea !== "" ? (
                      <li className="mb-2">
                        <span className="h6 pr-2">Area:</span>
                        <strong>{selectedArea}</strong>
                      </li>
                    ) : null}
                  </ul>
                </div>
              ) : null}
            </Col>
          </Row>
        </Col>
        <Col md="2" />
        <DarkMode />
      </Row>
    </Container>
  );
};
export default LocationsWithHooks;
