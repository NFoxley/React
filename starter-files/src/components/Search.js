import React from 'react';

const Search = React.createClass({
  handleSubmit(e) {
    // 1. stop it from refreshing the page
    e.preventDefault();
    // 2. get data from input
    const searchTerm = this.refs.q.value;
    console.log(searchTerm);
    // 3. chagne the url to /search/searchTerm
    this.context.router.transitionTo(`/search/${searchTerm}`);
  },
  contextTypes: {
    router: React.PropTypes.object
  },
  render() {
    return (
      <div className="search">
      <form onSubmit={this.handleSubmit}>
      <input type="text" placeholder="Search" ref="q" />
      <input type="submit" value="Search" />
      </form>
      </div>
    );
  }
});
export default Search;
