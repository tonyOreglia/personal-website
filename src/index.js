import ReactDOM from 'react-dom';
import {
  Link, BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import React from 'react';
import About from './views/About';
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
          <p>A beautiful, responsive, react single-page app written with modern Javascript.</p>
        </div>
      </header>
      <p> Welcome to my website. Please feel free to read more <Link to="/about">about me</Link>,
      check out my <Link to="/chess">Chess Engine </Link>,
        or <Link to="/contact">contact me</Link>.
      </p>
      This website is forked from Michael D'Angelo's personal website source code, available <a href="https://github.com/mldangelo/personal-site">here</a>
      <p> Source code for this website available <a href="https://github.com/tonyOreglia/personal-website">here</a>.</p>
    </article>
  </Main>
);

ReactDOM.render(
  <Router basename={'./'}>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route path="/about" component={About} />
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
