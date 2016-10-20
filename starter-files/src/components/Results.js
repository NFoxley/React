import React from 'react';
import Beer from './Beer';
import Loader from './Loader';

const Results = React.createClass({
  render() {
      if(this.props.loading) {
        return <Loader message="Pouring..."/>
      }

      return (
        <div className="beers">
        {/*
          This isn't practical, just shows moving around some JSON data
          <pre>{JSON.stringify(this.props.beers, null, '')}</pre>
          */}
        {this.props.beers.map((details, i) => <Beer key={i} details={details}/> )}
        </div>
    )
}
});
export default Results;
