import React, { Component } from "react";
import Main from "../../layouts/Main";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { fetchBreadcrumbs, saveBreadcrumb } from "../../Connectors/breadcrumbs";
import config from "../../config";

/**
 * additional changes needed
 * * [x] new breadcrumb endpoint for retrieving all crumbs
 * * [x] retrieve users device location from browser
 * * [x] button for creating breadcrumb at current location
 * * [ ] blog post
 * * [ ] explanation blurb of some sort
 * * [ ] better icon
 * * [ ] loading icon
 * * [ ] stop user from double clicking the breadcrumb button
 */
const mapStyles = {
  width: "100%",
  height: "100%",
  position: "relative",
};

const convertBreadCrumbsToGoogleMapMarkers = (crumbs) => {
  return crumbs.map((crumb, index) => (
    <Marker
      key={index.toString()}
      label={crumb.message}
      position={{ lat: crumb.latitude, lng: crumb.longitude }}
    />
  ));
};

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbs: [],
    };
    this.fetchBreadCrumbs();
  }

  click = (_mapProps, _map) => {
    navigator.geolocation.getCurrentPosition((position) => {
      if (!position.coords.longitude || !position.coords.latitude) {
        alert("you need to enable geo-location to drop a breadcrumb");
        return;
      }
      const message = prompt("Please enter your breadcrumb message");
      if (!message) {
        alert("breadcrumb needs a message; bare your soul");
        return;
      }
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      saveBreadcrumb(lat, lng, message).then((res) => {
        if (res.status !== 200) {
          alert(
            "sorry, your breadcrumb failed to save; tell Tony\n\n",
            JSON.stringify(res)
          );
        }
        this.setState({
          breadcrumbs: this.state.breadcrumbs.concat(
            <Marker
              key={this.state.breadcrumbs.length}
              label={message}
              position={{ lat, lng }}
            />
          ),
        });
      });
    });
  };

  fetchBreadCrumbs = () => {
    fetchBreadcrumbs().then((res) => {
      const markers = convertBreadCrumbsToGoogleMapMarkers(res.data);
      this.setState({ breadcrumbs: markers });
    });
  };

  render() {
    return (
      <div>
        <button
          style={{ marginBottom: 20, marginLeft: 20 }}
          className="button"
          onClick={this.click}
        >
          drop a breadcrumb!
        </button>
        <Map
          google={this.props.google}
          zoom={2}
          style={mapStyles}
          disableDefaultUI={false}
          initialCenter={{
            lat: -1.2884,
            lng: 36.8233,
          }}
        >
          {this.state.breadcrumbs}
        </Map>
      </div>
    );
  }
}

const GoogleMaps = GoogleApiWrapper({
  apiKey: config.googleMapsJsApiKey,
})(MapContainer);

const BreadCrumbs = () => {
  return (
    <Main>
      <header>
        <div className="title">
          <h2>Breadcrumbs</h2>
        </div>
      </header>
      <div style={{ position: "relative", width: "100%", height: "40em" }}>
        <GoogleMaps />
      </div>
    </Main>
  );
};

export default BreadCrumbs;
