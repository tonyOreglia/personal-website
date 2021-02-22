import React, { Component } from "react";
import * as moment from "moment";
import Main from "../../layouts/Main";
import { Link } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import Supercluster from "supercluster";
import ReactMarkdown from "react-markdown";
import { fetchBreadcrumbs, saveBreadcrumb } from "../../Connectors/breadcrumbs";
import config from "../../config";
import "./breadcrumbs.css";

/**
 * additional changes needed
 * [x] new breadcrumb endpoint for retrieving all crumbs
 * [x] retrieve users device location from browser
 * [x] button for creating breadcrumb at current location
 * [ ] blog post
 * [ ] explanation blurb of some sort
 * [ ] better crumb icon
 * [ ] loading icon
 * [ ] stop user from double clicking the breadcrumb button
 * [ ] display for multiple breadcrumbs
 * * cycle through by date
 * * pop up with list of breadcrumbs
 * *
 * [ ] add link to instructions on enabling locatin on various devices
 * [ ] add option to add name / nickname
 * [ ] new breadcrumbs endpoint to handle retrieval of points within box
 *
 */

const MAX_ZOOM = 22;
const DEFAULT_ZOOM = 20;
const DEFAULT_CENTER = { lat: 38.6861617, lng: -9.3504081 };

const Marker = ({ children }) => children;

const newGeoJsonPoint = (id, message, lng, lat, timeUnix) => ({
  type: "Feature",
  properties: {
    cluster: false,
    crumbId: id,
    message: message,
    creationTimeUnix: timeUnix || moment.utc().unix(),
  },
  geometry: {
    type: "Point",
    coordinates: [lng, lat],
  },
});

const transformBreadCrumbsToGeoJsonPoints = (crumbs) =>
  crumbs.map((crumb, i) =>
    newGeoJsonPoint(
      i,
      crumb.message,
      crumb.longitude,
      crumb.latitude,
      moment.utc(crumb.timestamp).unix()
    )
  );

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbs: [],
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
      bounds: null,
    };
    this.supercluster = new Supercluster({
      radius: 40,
      maxZoom: MAX_ZOOM,
    });
    this.geoJSONPoints = null;
    // retrieve data from DB; generate clusters; generate markers for cluster; finally update state
    this.fetchBreadCrumbs();
  }

  convertClustersToMarkers = (clusters) => {
    return clusters.map((cluster) => {
      const [longitude, latitude] = cluster.geometry.coordinates;
      const {
        cluster: isCluster,
        point_count: pointCount,
      } = cluster.properties;

      if (isCluster) {
        return (
          <Marker key={`cluster-${cluster.id}`} lat={latitude} lng={longitude}>
            <div
              className="cluster-marker"
              style={{
                width: `${
                  10 + (pointCount / this.geoJSONPoints.length) * 20
                }px`,
                height: `${
                  10 + (pointCount / this.geoJSONPoints.length) * 20
                }px`,
              }}
              onClick={() => {
                const expansionZoom = Math.min(
                  this.supercluster.getClusterExpansionZoom(cluster.id),
                  MAX_ZOOM
                );
                this.setState({
                  zoom: expansionZoom,
                  center: { lat: latitude, lng: longitude },
                });
              }}
            >
              {pointCount}
            </div>
          </Marker>
        );
      }

      return (
        <Marker
          key={`crumb-${cluster.properties.crumbId}`}
          lat={latitude}
          lng={longitude}
        >
          <button className="breadcrumb-marker">
            <img
              src="/images/marker.png"
              alt="breadcrumbs for all"
              onClick={console.log("you clicked me!! :grimace")}
            />
          </button>
        </Marker>
      );
    });
  };

  createNewCustomLocationBreadcrumb = (clickEvent) => {
    const { lat, lng } = clickEvent;
    const message = prompt("Please enter your breadcrumb message");
    if (!message) {
      alert("breadcrumb needs a message; bare your soul");
      return;
    }

    saveBreadcrumb(lat, lng, message).then(
      (res) => {
        if (res.status !== 200) {
          alert(
            "sorry, your breadcrumb failed to save; tell Tony\n\n",
            JSON.stringify(res)
          );
        }

        this.geoJSONPoints.push(
          newGeoJsonPoint(this.geoJSONPoints.length, message, lng, lat)
        );

        this.supercluster.load(this.geoJSONPoints);
        this.setState({
          breadcrumbs: this.convertClustersToMarkers(
            this.supercluster.getClusters(this.state.bounds, this.state.zoom)
          ),
        });
      },
      (error) => {
        alert(`Error retrieving device location: ${error.message}`);
        console.error(error);
      },
      { timeout: 3000, enableHighAccuracy: false, maximumAge: 0 }
    );
  };

  /**
   * create new breadcrumb at device's current location
   */
  createNewBreadcrumb = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
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

          this.geoJSONPoints.push(
            newGeoJsonPoint(this.geoJSONPoints.length, message, lng, lat)
          );

          this.supercluster.load(this.geoJSONPoints);
          this.setState({
            breadcrumbs: this.convertClustersToMarkers(
              this.supercluster.getClusters(this.state.bounds, this.state.zoom)
            ),
          });
        });
      },
      (error) => {
        alert(`Error retrieving device location: ${error.message}`);
        console.error(error);
      },
      { timeout: 3000, enableHighAccuracy: false, maximumAge: 0 }
    );
  };

  fetchBreadCrumbs = () => {
    fetchBreadcrumbs().then((res) => {
      // const markers = convertBreadCrumbsToGoogleMapMarkers(res.data);
      this.geoJSONPoints = transformBreadCrumbsToGeoJsonPoints(res.data);

      this.supercluster.load(this.geoJSONPoints);

      this.setState({
        breadcrumbs: this.convertClustersToMarkers(
          this.supercluster.getClusters(this.state.bounds, this.state.zoom)
        ),
      });
    });
  };

  getClusterMarkersForUpdatedMap = (zoom, bounds) => {
    if (!this.supercluster || !this.geoJSONPoints) {
      return;
    }
    const clusters = this.supercluster.getClusters(
      [bounds.nw.lng, bounds.se.lat, bounds.se.lng, bounds.nw.lat],
      zoom
    );
    return this.convertClustersToMarkers(clusters);
  };

  render() {
    return (
      <div>
        <button
          style={{ marginBottom: 20, marginLeft: 20 }}
          className="button"
          onClick={this.createNewBreadcrumb}
        >
          drop a breadcrumb!
        </button>
        <div style={{ height: "90vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: config.googleMapsJsApiKey }}
            defaultCenter={DEFAULT_CENTER}
            center={this.state.center}
            defaultZoom={DEFAULT_ZOOM}
            maxZoom={MAX_ZOOM}
            zoom={this.state.zoom}
            yesIWantToUseGoogleMapApiInternals
            onChange={({ zoom, bounds, center }) => {
              this.setState({
                center,
                zoom,
                bounds: [
                  bounds.nw.lng,
                  bounds.se.lat,
                  bounds.se.lng,
                  bounds.nw.lat,
                ],
                breadcrumbs: this.getClusterMarkersForUpdatedMap(zoom, bounds),
              });
            }}
            onClick={this.createNewCustomLocationBreadcrumb}
          >
            {this.state.breadcrumbs}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

class BreadCrumbs extends Component {
  render() {
    return (
      <Main>
        <article className="post">
          <header>
            <div className="title">
              <h2>Breadcrumbs</h2>
            </div>
          </header>
          <ReactMarkdown
            source={this.props.breadcrumbsData.desc}
            renderers={{
              link: RouterLink,
            }}
            escapeHtml={false}
          />
          <div style={{ position: "relative", width: "100%", height: "40em" }}>
            <GoogleMap />
          </div>
        </article>
      </Main>
    );
  }
}

export default BreadCrumbs;

// Make all hrefs react router links
function RouterLink(props) {
  return props.href.match(/^(https?:)?\/\//) ? (
    <a href={props.href}>{props.children}</a>
  ) : (
    <Link to={props.href}>{props.children}</Link>
  );
}
