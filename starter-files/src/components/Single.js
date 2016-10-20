import React from 'react';
import Header from './Header';
import Loader from './Loader';

const Single = React.createClass({
    getInitialState() {
        return {beer: {}, loading: true};
    },

    componentWillMount() {
        this.loadBeer(this.props.params.beerId);
    },

    loadBeer(beerId) {
        this.setState({loading: true});

        fetch(`http://api.react.beer/v2/beer/${beerId}`).then(data => data.json()).then(beer => {
            this.setState({beer: beer.data, loading: false});
        })
    },

    render() {
const beer = this.state.beer;
//{beer ? <img></img>}

if (this.props.loading) {
  return <Loader message="pouring" />
}

        return (
            <div>
              <Header siteName="beer" />
            </div>
        )
    }
});
export default Single;
