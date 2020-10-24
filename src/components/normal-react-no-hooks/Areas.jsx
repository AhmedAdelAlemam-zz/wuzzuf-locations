import React from "react";
import { FormGroup } from "react-bootstrap";
const Areas = (props) => {
  const { areas, selectedArea } = props;
  return (
    <>
      <FormGroup>
        <label className="h4 mt-4">Area</label>
        <select
          className="form-control areas"
          disabled={areas.length === 0}
          onChange={props.getAreaDataOnSelect}
        >
          <option id="defaultAreasOption">Select Area</option>
          {areas.length !== 0
            ? areas.map((area) => {
                return (
                  <option key={area.id} value={area.id}>
                    {area.attributes.name}
                  </option>
                );
              })
            : null}
        </select>
      </FormGroup>
      {selectedArea === "" ? (
        <h6 className="text-danger">Please select area</h6>
      ) : null}
    </>
  );
};

export default Areas;
