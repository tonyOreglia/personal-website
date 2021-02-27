import { data } from "./index";
export const postInfo = data.find((post) => post.id === 4);
export const breadcrumbsPost = `
## What is Location Based Social Networking 
Location Based Social Networking is a new approach to online networking. The idea is that the connections and interactions between users are based on creating virtual data that is tied to a specific location. In the most simple example, a user can store a message in a specific location in virtual reality. A Location Based Social Network would then allow other users to "find" this message by arriving at that same location. The information does not exist in the real world; it is only the application that these messages can be created and found.

## What is the potential for Location Based Social Networks 
The potential for this type of networking are vast and already there are a number of application on the market experimenting with this concept. Notably, 
[Pokémon GO](https://pokemongolive.com/en/) enables users to find Pokémon out in the real world via augmented reality seen through the phone. Others, like [Wallame](https://en.wikipedia.org/wiki/WallaMe) provides a platform to create virtual graffiti. [Holo](https://holo.me/) is already experimenting with location based holograms. 

Like all technologies, augmented reality will become cheaper and less obtrusive as time goes on. As augmented reality becomes more accessible it is likely to become [ubiquitous](https://www.scirp.org/html/40277.html). If this is the case; we will see every type of media being tied to specific locations, landmarks and surfaces within competing augmented realities. This includes images, [drawings](https://en.wikipedia.org/wiki/Virtual_graffiti), videos, business reviews, advertisements, city tours, location triggered alarms/notifications/reminders, performing arts and more. It's a layer on top of the real world. Given that a location can hold media over a long period of time, these applications can offer users the opportunity to explore the history of a given place. 

This is why I was so excited to build "Breadcrumbs". My own location based data server; for general use by applications.

## Technical Details
### Building the Breadcrumbs Backend
Breadcrumbs is a RESTful HTTP spatial server written in Golang. This API allows users to generate and retrieve location based textual messages. A PostgreSQL database is run in a Docker container. [PostGIs](https://postGIs.net/) is used for storage and efficient retrieval of spatial data.

#### Tech Stack
* [Go Programming Language](https://golang.org/): Go is an open source programming language that makes it easy to build simple, reliable, and efficient software.
* [PostgreSQL](https://www.postgresql.org/): PostgreSQL is a powerful, open source object-relational database system.
* [PostGIs](https://postGIs.net/): A spatial database extender for PostgreSQL
* [Docker](https://www.docker.com/): Docker uses OS-level virtualization to deliver software in packages called containers.
* [Flyway](https://flywaydb.org/): Flyway is an open-source database migration tool.
* [modd](https://github.com/cortesi/modd): A flexible developer tool that runs processes and responds to filesystem changes
* [Nginx](https://www.nginx.com/): open source software for web serving.

#### Primary Challenges
The primary challenge of serving spatial data is maintaining performance and flexibility as the data set expands. And actually these two challenges are linked. The nature of spatial data it requires a lot of math to reason about. For example, determining all of the points within a rectangle bounded by two longitudinal array and two latitudinal -- if this box is the size of Portugal, the naive solution starts to break down and the math must take into account the curved surface of the planet to maintain accuracy. Thus, as the application demands more flexibility, performance is directly impacted. 

This is why I chose PostGIs. PostGIs adds spatial functions such as distance, area, union, intersection, and specialty geometry data types to PostgreSQL. Spatial data types like point, line and plane are first class citizens and spatial functions, posed in SQL, are available for querying of spatial properties and relationships. PostGIS is an industry standard tool and can be used to achieve optimal performance in serving spatial data.

### Building the Breadcrumbs Frontend Demo - Using Google Maps API with React
The Breadcrumbs frontend demo is a React component utilizing the [Google Maps API](https://developers.google.com/maps/) for displaying location based data. The demo allows people visiting the website to write a message at their devices current location; and see past messages written by any other users of the demo. The created data is stored and served using the Breadcrumbs Server described above. 

The demo connects over https to the Breadcrumbs Server hosted on my local server behind [Nginx](https://www.nginx.com/). Currently, the demo support storing and retrieving textual data.

#### Tech Stack
* [Google Maps API](https://developers.google.com/maps/): Exposes the latest Maps, Routes, and Places features from Google Maps Platform.
* [BreadCrumbs Server](https://github.com/tonyOreglia/breadcrumbs): a RESTful HTTP spatial server written in Golang.
* [google-map-react](https://github.com/google-map-react/google-map-react#readme): a component written over a small set of the Google Maps API.
* [Supercluster](https://github.com/mapbox/supercluster#readme): A very fast JavaScript library for geospatial point clustering for browsers and Node.
* [axios](https://github.com/axios/axios): Promise based HTTP client for the browser and node.js.
* [material-ui](https://material-ui.com/): React UI components for faster and easier web development.
* [react-router-dom](https://github.com/ReactTraining/react-router#readme): Declarative routing for React.
`;
