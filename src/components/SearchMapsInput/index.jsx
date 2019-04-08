import React, { useState } from "react";
import PropTypes from "prop-types";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng
} from "react-places-autocomplete";

export default function SearchMapsInput({ onSelect }) {
  // handle the address by itself
  const [address, setAddress] = useState("");
  const handleChange = addresss => {
    setAddress(address);
  };

  // user just get the detail when selected
  const handleSelect = address => {
    geocodeByAddress(address)
      .then(
        results =>
          // call onSelect with result from promise and give utility functions
          onSelect && onSelect(results, { getLatLng, geocodeByPlaceId })
      )
      .catch(error => null); // should use raven for error
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: "Search Places ...",
              className: "location-search-input"
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: "#fafafa", cursor: "pointer" }
                : { backgroundColor: "#ffffff", cursor: "pointer" };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}

SearchMapsInput.propTypes = {
  onSelect: PropTypes.func.isRequired
};
