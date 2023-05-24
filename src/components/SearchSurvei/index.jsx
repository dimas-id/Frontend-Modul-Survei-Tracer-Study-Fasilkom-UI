import { useState } from "react";
import classes from "./style.module.css";

const SearchInput = ({ valHandler }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleTextChange = (textQuery) => {
        setSearchQuery(textQuery);
    };

    const handleSubmitQuery = (event) => {
        valHandler(searchQuery);
        event.preventDefault();
    };

    const clearSearchQuery = (event) => {
        setSearchQuery("");
        document.getElementById("search-bar").value = "";
        event.preventDefault();
    };

    const handleEnterPress = (event) => {
        if (event.key === "Enter") {
          event.preventDefault(); // Prevent the form from being submitted
          handleSubmitQuery();
        }
      };

    return (
        <div className={classes["input-wrapper"]}>
            <form>
                <input
                id="search-bar"
                className={classes["search-bar"]}
                onInput={(e) => {
                   handleTextChange(e.target.value);
                }}
                onKeyDown={handleEnterPress}
                label="Search"
                variant="outlined"
                placeholder="Cari Survei ..."
                size="small"
                />
                <button className={classes["custom-button"]} onClick={clearSearchQuery}>
                    <span className={classes["clear-icon"]}>
                    &#x2716;
                    </span>
                </button>
                <button className={classes["custom-button"]} onClick={handleSubmitQuery}>
                    <span className={classes["submit-icon"]}>
                    &#x1F50D;
                    </span>
                </button>
            </form>
        </div>
    );
};

export default SearchInput;
