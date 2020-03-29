import ReactDOM from 'react-dom';
import {
  Link, BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import React from 'react';
import Contact from './views/Contact';
import Projects from './views/Projects';
import Glee from './views/Glee';
import NotFound from './views/NotFound';
import AssemblyGuide from './views/AssemblyGuide/AssemblyGuide';
import GuideResources from './views/AssemblyGuide/Resources';
import GuideGettingStarted from './views/AssemblyGuide/GettingStarted';
import GuideConditions from './views/AssemblyGuide/Conditions';
import GuideDebugWithDocker from './views/AssemblyGuide/DebugWithDocker';
import GuideFunctionParams from './views/AssemblyGuide/Functionparams';
import GuideGdb from './views/AssemblyGuide/Gdb';
import GuidePrinting from './views/AssemblyGuide/Printing';
import GuideQuickReference from './views/AssemblyGuide/QuickReference';
import GuideStringLength from './views/AssemblyGuide/StringLength';
import Main from './layouts/Main';
import './static/css/main.scss';

const Index = () => (
  <Main>
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2><Link to="/">About this site</Link></h2>
          <p>A single-page app written with ReactJS </p>
        </div>
      </header>
      <p>This website is hosted on <Link to="https://www.digitalocean.com/">DigitalOcean</Link>. Updates are automatically tested and deployed with <Link to="https://codeship.com/">CodeShip</Link>.</p>
      <p>Have a look at my <Link to="/projects">projects</Link> and feel free to <Link to="/contact">get in touch</Link>.</p>
    </article>
  </Main>
);

ReactDOM.render(
  <Router basename={'./'}>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route path="/projects" component={Projects} />
      <Route path="/chess" component={Glee} />
      
      <Route path="/assembly" component={AssemblyGuide}/>
      <Route path="/guidegettingstarted" component={GuideGettingStarted}/>
      <Route path="/guideresources" component={GuideResources} />
      <Route path="/guidegdb" component={GuideGdb} />
      <Route path="/guidefunctionparams" component={GuideFunctionParams} />
      <Route path="/guideconditions" component={GuideConditions} />
      <Route path="/guidestringlength" component={GuideStringLength} />
      <Route path="/guidequickreference" component={GuideQuickReference} />
      <Route path="/guidedebugwithdocker" component={GuideDebugWithDocker} />
      <Route path="/guideprinting" component={GuidePrinting} />
      
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} status={404} />
    </Switch>
  </Router>,
  document.getElementById('root'),
);
