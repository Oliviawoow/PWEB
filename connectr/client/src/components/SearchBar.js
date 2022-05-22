import React from "react";
import { Link } from "react-router-dom";
const Search = ({searchQuery, setSearchQuery}) => {
    return (
    <form action="/dummy" method="get">
            <label htmlFor="header-search">
            <span className="visually-hidden">
                search for users
            </span>
            </label>
        <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            type="text"
            id="header-seach"
            placeholder="search for users"
            name="s"    
        />
        <button type="submit">Search</button>
    </form>
    );
}

export default Search;
