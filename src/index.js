import ReactDOM from "react-dom";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import Contact from "./views/Contact";
import MyWiki from "./views/MyWiki";
import Blog from "./views/BlogTOC";
import Projects from "./views/Projects";
import Glee from "./views/Glee";
import NotFound from "./views/NotFound";
import AssemblyGuide from "./views/blog/AssemblyGuide/AssemblyGuide";
import Tetris from "./views/Tetris";
import Snake from "./views/Snake";
import BreadCrumbs from "./views/breadcrumbs/BreadCrumbs";

import BlogDynamicIp from "./views/blog/dynamicIp";
import DockerPostgres from "./views/blog/dockerPostgres";
import BreadcrumbsPost from "./views/blog/breadcrumbs";
import BabelRoulettePost from "./views/blog/babelRoulette";

import GuideResources from "./views/blog/AssemblyGuide/Resources";
import GuideGettingStarted from "./views/blog/AssemblyGuide/GettingStarted";
import GuideConditions from "./views/blog/AssemblyGuide/Conditions";
import GuideDebugWithDocker from "./views/blog/AssemblyGuide/DebugWithDocker";
import GuideFunctionParams from "./views/blog/AssemblyGuide/Functionparams";
import GuideGdb from "./views/blog/AssemblyGuide/Gdb";
import GuidePrinting from "./views/blog/AssemblyGuide/Printing";
import GuideQuickReference from "./views/blog/AssemblyGuide/QuickReference";
import GuideStringLength from "./views/blog/AssemblyGuide/StringLength";

import data from "./data/projects";

import Main from "./layouts/Main";
import "./static/css/main.scss";

const Index = () => (
  <Main>
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2>
            <Link to="/">About this site</Link>
          </h2>
          <p>A single-page app written with ReactJS </p>
        </div>
      </header>
      <p>
        This website is hosted on a home server running{" "}
        <a href="https://www.nginx.com/">Nginx</a>. Changes to this website are
        automatically tested and deployed with{" "}
        <a href="https://app.codeship.com/home">CodeShip</a>.
      </p>
      <p>
        Have a look at my <Link to="/projects">projects</Link> and feel free to{" "}
        <Link to="/contact">get in touch</Link>.
      </p>
    </article>
  </Main>
);

ReactDOM.render(
  <Router basename={"./"}>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route path="/projects" component={Projects} />
      <Route path="/contact" component={Contact} />
      <Route path="/wiki" component={MyWiki} />
      <Route path="/blog" component={Blog} />

      <Route path="/chess" component={Glee} />
      <Route path="/assembly" component={AssemblyGuide} />
      <Route path="/tetris" component={Tetris} />
      <Route path="/snake" component={Snake} />

      <Route
        path="/breadcrumbs"
        render={(props) => (
          <BreadCrumbs
            {...props}
            breadcrumbsData={data.find((d) => d.title === "BreadCrumbs")}
          />
        )}
      />

      <Route path="/dynamicip" component={BlogDynamicIp} />
      <Route path="/dockerpostgres" component={DockerPostgres} />
      <Route path="/buildingBreadcrumbs" component={BreadcrumbsPost} />
      <Route path="/babelRoulettePost" component={BabelRoulettePost} />

      <Route path="/guidegettingstarted" component={GuideGettingStarted} />
      <Route path="/guideresources" component={GuideResources} />
      <Route path="/guidegdb" component={GuideGdb} />
      <Route path="/guidefunctionparams" component={GuideFunctionParams} />
      <Route path="/guideconditions" component={GuideConditions} />
      <Route path="/guidestringlength" component={GuideStringLength} />
      <Route path="/guidequickreference" component={GuideQuickReference} />
      <Route path="/guidedebugwithdocker" component={GuideDebugWithDocker} />
      <Route path="/guideprinting" component={GuidePrinting} />

      <Route component={NotFound} status={404} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
