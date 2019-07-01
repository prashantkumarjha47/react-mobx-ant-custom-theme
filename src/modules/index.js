import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import AuthRoutes from "../globals/hoc/AuthRoutes";

const Dashboard = lazy(() => import("./dashboard"));
const Requests = lazy(() => import("./requests"));
const Organisation = lazy(() => import("./organisations/Organisation"));
const Roles = lazy(() => import("./roles/Roles"));
const User = lazy(() => import("./user/User"));


const Moduleroutes = props => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Switch>
        <Route path="/" exact render={() => <Dashboard {...props} />} />
        <Route path="/dashboard" render={() => <Dashboard {...props} />} />
        <Route path="/organisation" render={() => <Organisation {...props} />} />
        <Route path="/users" render={() => <User {...props} />} />
        <Route path="/roles" render={() => <Roles {...props} />} />
        <Route path="/requests" render={() => <Requests {...props} />} />
      </Switch>
    </Suspense>
  );
};

export default AuthRoutes(Moduleroutes);
