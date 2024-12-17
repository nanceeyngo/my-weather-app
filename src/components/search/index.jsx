import React from 'react';

const Search = ({ search, setSearch, handleSearch, handleKeyDown}) => {
    return (
        <>
            <div className='search-engine'>
                <input
                    type="text"
                    placeholder='Enter City Name'
                    name='search'
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
        </>
    );
};

export default Search;
