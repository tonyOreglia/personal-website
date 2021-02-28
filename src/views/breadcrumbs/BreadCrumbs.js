import React, { Component } from "react";
import * as moment from "moment";
import Main from "../../layouts/Main";
import { Link } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import Supercluster from "supercluster";
import { fetchBreadcrumbs, saveBreadcrumb } from "../../Connectors/breadcrumbs";
import CreateBreadcrumbModal from "./createBreadcrumbModal";
import DisplayBreadcrumbModal from "./displayBreadcrumbModal";
import LoadingIcon from "./loadingIcon";
import "./breadcrumbs.css";

/**
 * additional changes needed
 * [x] new breadcrumb endpoint for retrieving all crumbs
 * [x] retrieve users device location from browser
 * [x] button for creating breadcrumb at current location
 * [x] blog post
 * [x] modal for displaying breadcrumbs::: https://material-ui.com/components/dialogs/
 * [x] modal for creating breadcrumbs
 * [x] explanation blurb of some sort
 * [x] better crumb icon
 * [x] loading icon -- https://material-ui.com/components/progress/
 * [x] stop user from double clicking the breadcrumb button
 * [x] display for multiple breadcrumbs
 * [ ] cycle through by date
 * [x] pop up with list of breadcrumbs
 * [ ] add option to add name / nickname
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
      modalOpen: false,
      displayModalOpen: false,
      devicePosition: {},
      displayClusters: [],
      loading: false,
    };
    this.supercluster = new Supercluster({
      radius: 40,
      maxZoom: MAX_ZOOM,
    });
    this.geoJSONPoints = null;
    this.fetchBreadCrumbs();
  }

  convertClustersToMarkers = (clusters) => {
    return clusters.map((cluster) => {
      console.log(cluster);
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
                cursor: "pointer",
              }}
              onClick={() => {
                if (this.state.zoom === 22) {
                  clusters = this.supercluster.getLeaves(cluster.id);
                  this.setState({
                    displayModalOpen: true,
                    displayClusters: [...clusters],
                    center: { lat: latitude, lng: longitude },
                  });
                  return;
                }
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

      this.closeMessageDisplayModal = () => {
        this.setState({ displayModalOpen: false });
      };

      return (
        <Marker
          key={`crumb-${cluster.properties.crumbId}`}
          lat={latitude}
          lng={longitude}
        >
          <div
            style={{ cursor: "pointer" }}
            className="breadcrumb-marker"
            onClick={(e) => {
              console.log("cluster: ", cluster);
              this.setState({
                displayModalOpen: true,
                displayClusters: [{ ...cluster }],
                center: { lat: latitude, lng: longitude },
              });
              // so that the map onClick is not called
              e.stopPropagation();
            }}
          >
            <img src="/images/marker.png" alt="breadcrumbs for all" />
          </div>
        </Marker>
      );
    });
  };

  // not currently used
  _createNewCustomLocationBreadcrumb = (clickEvent) => {
    const { lat, lng } = clickEvent;
    const message = prompt("Please enter your breadcrumb message");
    if (!message) {
      alert("every breadcrumb needs a message; bare your soul");
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

  saveNewBreadcrumb = (lat, lng, message) => {
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
  };

  /**
   * create new breadcrumb at device's current location
   */
  createNewBreadcrumb = () => {
    this.setState({ loading: true }, () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (!position.coords.longitude || !position.coords.latitude) {
            alert("you need to enable geo-location to drop a breadcrumb");
            return;
          }
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          this.setState({
            modalOpen: true,
            devicePosition: { lat, lng },
            loading: false,
          });
        },
        (error) => {
          alert(`Error retrieving device location: ${error.message}`);
          console.error(error);
        },
        { timeout: 4000, enableHighAccuracy: false, maximumAge: 0 }
      );
    });
  };

  fetchBreadCrumbs = () => {
    fetchBreadcrumbs().then((res) => {
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
        <LoadingIcon open={this.state.loading}></LoadingIcon>
        <CreateBreadcrumbModal
          open={this.state.modalOpen}
          handleSave={(message) => {
            if (!message) {
              alert("breadcrumb needs a message; bare your soul");
              return;
            }
            this.setState({ modalOpen: false });
            this.saveNewBreadcrumb(
              this.state.devicePosition.lat,
              this.state.devicePosition.lng,
              message
            );
          }}
          handleClose={() => {
            this.setState({ modalOpen: false });
          }}
        ></CreateBreadcrumbModal>
        <DisplayBreadcrumbModal
          displayClusters={this.state.displayClusters}
          open={this.state.displayModalOpen}
          onClose={this.closeMessageDisplayModal}
        />
        <button
          style={{ marginBottom: 20, marginLeft: 20 }}
          className="button"
          onClick={this.createNewBreadcrumb}
        >
          click here to Drop a breadcrumb in your current location!
        </button>
        <div style={{ height: "90vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.REACT_APP_GOOGLE_APS_JS_API_KEY,
            }}
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
              <h2>
                <Link to="/buildingBreadcrumbs">Breadcrumbs</Link>
              </h2>
            </div>
          </header>
          <p>
            This is a demo of an idea that{" "}
            <a href="https://www.linkedin.com/in/josh-kemp-440">Josh Kemp</a>{" "}
            and I envisioned while surfing; it's called BreadCrumbs. Below, you
            can click the button to "drop a breadcrumb" message; or browse the
            map to see messages created by past visitors.
          </p>
          <ul>
            <li>
              <Link to="/buildingBreadcrumbs">
                Read more about Location Based Social Networking and how this
                demo works
              </Link>
            </li>
            <li>
              <a href="https://github.com/tonyOreglia/breadcrumbs">
                Breadcrumbs server code available
              </a>
              .
            </li>
            <li>
              <a href="https://github.com/tonyOreglia/personal-website/tree/feature/breadCrumbsDemo/src/views/breadcrumbs">
                Breadcrumbs frontend demo code available
              </a>
              .
            </li>
          </ul>
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
