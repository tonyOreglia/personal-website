import * as axios from "axios";
import React, { Component } from "react";
import Main from "../../layouts/Main";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import config from "../../../config/config";

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

  click = (_mapProps, _map, clickEvent) => {
    const message = prompt("Please enter your breadcrumb message");
    const lat = clickEvent.latLng.lat();
    const lng = clickEvent.latLng.lng();
    this.setState({
      breadcrumbs: this.state.breadcrumbs.concat(
        <Marker
          key={this.state.breadcrumbs.length}
          label={message}
          position={{ lat, lng }}
        />
      ),
    });
  };

  fetchBreadCrumbs = () => {
    axios
      .post("/getNotes", {
        longitude: -35.39833,
        latitude: -9.045,
        radius_in_meters: 500000,
      })
      .then((res) => {
        const markers = convertBreadCrumbsToGoogleMapMarkers(res.data);
        this.setState({ breadcrumbs: markers });
      });
  };

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={2}
        style={mapStyles}
        disableDefaultUI={false}
        initialCenter={{
          lat: -1.2884,
          lng: 36.8233,
        }}
        onClick={this.click}
      >
        {this.state.breadcrumbs}
      </Map>
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
