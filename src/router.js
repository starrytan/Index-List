import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexList from './routes/IndexList';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexList} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
