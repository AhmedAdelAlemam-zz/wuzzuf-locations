import React from "react";
import { FormGroup } from "react-bootstrap";

const Cities = (props) => {
  const citiesData = props.cities;
  return (
    <>
      <FormGroup>
        <label className="h4 mt-4">City</label>
        <select
          className="form-control cities"
          onChange={props.getCityDataOnSelect}
          disabled={citiesData.length === 0}
        >
          <option>Select City</option>
          {citiesData.length !== 0
            ? citiesData.map((city) => {
                return (
                  <option
                    key={city.id}
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
      {props.selectedCity === "" ? (
        <h6 className="text-danger">Please select a city</h6>
      ) : null}
    </>
  );
};

export default Cities;
