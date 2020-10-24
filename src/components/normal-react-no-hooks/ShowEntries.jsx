import React from "react";

const ShowEntries = (props) => {
  const {
    selectedCity,
    selectedCountry,
    currentCountryId,
    selectedArea,
  } = props;

  return selectedCity !== "" && selectedCountry !== "" ? (
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
  ) : null;
};

export default ShowEntries;
