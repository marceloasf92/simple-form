import { useState } from "react";
import { Switch, Route } from "react-router-dom";
import RegisterForm from "../page/RegisterForm";
import Success from "../page/Success";

const Routes = () => {
  const [user, setUser] = useState("");
  return (
    <Switch>
      <Route exact path="/">
        <RegisterForm setUser={setUser} />
      </Route>
      <Route path="/success/:id">
        <Success user={user} />
      </Route>
    </Switch>
  );
};

export default Routes;
