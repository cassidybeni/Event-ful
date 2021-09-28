import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserProvider } from "./Providers/UserProvider";
import { apiURL } from "./util/apiURL";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./App.css";
import useGeoLocation from "./hooks/useGeoLocation";
import axios from "axios";
import Booked from "./Pages/Booked.js";
import Dashboard from "./Pages/Dashboard.js";
import Event from "./Pages/EventPage";
import Favorites from "./Pages/Favorites.js";
import Landing from "./Pages/Landing.js";
import SignUp from "./Pages/SignUp.js";
import VendorIndex from "./Pages/VendorIndex.js";
import VendorShow from "./Pages/VendorShow.js";
import EditBooked from "./Pages/EditBooked.js";
import ScrollToTop from "./Components/ScrollToTop.js";
import NavBar from "./Components/NavBar/NavBar.js";
import NewEventForm from "./Pages/NewEventForm.js";
import EditFormPage from "./Pages/EditFormPage.js";
import EventCheckboxPg from "./Pages/EventCheckboxPg";
import SignIn from "./Pages/SignIn.js"

const user_id = 1;
const name = "jasleen";

function App() {
  const location = useGeoLocation();
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    if (location.coordinates) {
      setLat(location.coordinates.latitude);
      setLng(location.coordinates.longitude);
    }
  }, [location]);

  const capitalizeName = (name) => {
    return name[0].toUpperCase() + name.slice(1);
  };

  return (
    <div className="site">
      <UserProvider>
        {/* <Router> */}

      <ScrollToTop />
      <NavBar user_id={user_id} />
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>

        <Route path="/signup">
          <SignUp />
        </Route>

        <Route path="/signin">
          <SignIn />
        </Route>

        <Route path="/dashboard/new_event/checklist/:id">
          <EventCheckboxPg user_id={user_id} />
        </Route>

        <Route path="/dashboard/new_event">
          <NewEventForm user_id={user_id} />
        </Route>

        <Route path="/dashboard/:event_id/edit">
          <EditFormPage user_id={user_id} />
        </Route>

        <Route path="/dashboard">
          <Dashboard user_id={user_id} name={capitalizeName(name)} />
        </Route>

        <Route path="/task/:category/:event_id/:task_id">
          <EditBooked
            user_id={user_id}
            lat={lat}
            lng={lng}
            formatter={formatter}
          />
        </Route>

        <Route path="/event/:event_id">
          <Event formatter={formatter} user_id={user_id} />
        </Route>

        <Route path="/vendor/:category/:provider_id">
          <VendorShow user_id={user_id} />
        </Route>

        <Route path="/favorites">
          <Favorites user_id={user_id} name={capitalizeName(name)} />
        </Route>

        <Route path="/vendors/:category">
          <VendorIndex location={location} />
        </Route>

        <Route path="/booked/:event_id/:event_name">
          <Booked user_id={user_id} />
        </Route>
      </Switch>
            {/* </Router> */}
      </UserProvider>
    </div>
  );
}

export default App;
