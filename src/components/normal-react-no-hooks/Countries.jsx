import React from "react";
import { FormGroup } from "react-bootstrap";

const Countries = (props) => {
  const countriesData = props.countries;
  return (
    <>
      <FormGroup>
        <label className="h4">Country</label>
        <select
          className="form-control countries"
          onChange={props.getCountryDataOnSelect}
        >
          <option id="defaultCountriesOption">Select Country</option>
          {countriesData.map((country) => {
            return (
              <option key={country.id} value={country.id}>
                {country.attributes.name}
              </option>
            );
          })}
        </select>
      </FormGroup>
      {props.selectedCountry === "" ? (
        <h6 className="text-danger">Please select a country</h6>
      ) : null}
    </>
  );
};

export default Countries;
