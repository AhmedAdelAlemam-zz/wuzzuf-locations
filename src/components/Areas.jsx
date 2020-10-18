import React from "react";
import { FormGroup } from "react-bootstrap";
const  Areas =(props)=> {
    const areasData = props.areas;
    return (
      <FormGroup>
        <label className="h4 mt-4">Area</label>
        <select
          className="form-control areas"
          disabled={areasData.length === 0}
          onChange={props.getAreaDataOnSelect}
        >
          <option>Select Area</option>
          {areasData.length !== 0
            ? areasData.map((area) => {
                return (
                  <option key={area.id} value={area.id} >
                    {area.attributes.name}
                  </option>
                );
              })
            : null}
        </select>
      </FormGroup>
    );
  }

  export default Areas