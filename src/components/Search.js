import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = useState('');
  const history = useHistory();

  const handleOnChange = (event) => {
    setQuery(event.target.value)
  }

  const navigate = () => {
    if (query.length > 0) {
      history.push(`/list/search/${query}`);
    }
  }

  const handleOnKeyDown = (event) => {
    if (event.keyCode === 13) {
      navigate(); // Enter pressed
    }
  }

  return (
    <div className={"search-container"}>
      <form>
        <input
          id={"search_form"}
          className={"search-form"}
          placeholder="Search for movie, serie or person..."
          onChange={handleOnChange}
          onKeyDown={e => handleOnKeyDown(e)}
        />
      </form>
      <button className={"search-button"} onClick={() => navigate()}>Search</button>
    </div>
  )
}

export default Search;