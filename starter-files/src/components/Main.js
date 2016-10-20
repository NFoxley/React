import React from 'react';
import Header from './Header';
import Beer from './Beer';
import Results from './Results';
import Search from './Search';

const Main = React.createClass({
getInitialState(){
return {
  numBeers: 10,
  beers: [],
  loading: true
};
},
//load data on page load (as early as possible)
 componentWillMount() {
   const params = this.props.params || {};
   const searchTerm = params.searchTerm || undefined;
   this.loadBeers(searchTerm);
 },

// componentWillUpdate(nextProps) {
// this.loadBeers(nextProps.params.searchTerm);
// },

incrementBeers() {
  const beerAmount = this.state.numBeers + 1;
  this.setState({
    numBeers: beerAmount
  });
},
loadBeers(searchTerm = 'hops') {
  this.setState({ loading: true});
  //first check if we can use local storage
const localStorageBeers = localStorage.getItem(`search-${searchTerm}`);
if (localStorageBeers) {
  const localBeers = JSON.parse(localStorageBeers);
  this.setState({ beers: localBeers, loading: false });
  return;
}

  fetch(`http://api.react.beer/v2/search?q=${searchTerm}&type=beer`)
  //when the data comes back, convert to json
    .then(data => data.json())
    //when json is converted, put it in state
    .then(beers => {
      //check there are beer labels first
      const filteredBeers = beers.data.filter(beer => !!beer.labels);
      //set beers into state
      this.setState({
        beers: filteredBeers,
        loading: false
      });
      //save to local storage
      localStorage.setItem(`search-${searchTerm}`, JSON.stringify(filteredBeers));
    })

},
  render() {
    return (
      <div className="wrapper">
        <Header siteName="D'oh!"/>
        <Search />
        <button onClick={this.incrementBeers}>{this.state.numBeers}</button>
        <Results {...this.state} />

      </div>
    )
  }
});

export default Main;
