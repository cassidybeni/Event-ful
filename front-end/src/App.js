import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContext } from "./Providers/UserProvider";
import Booked from "./Pages/Booked.js";
import Dashboard from "./Pages/Dashboard.js";
import Event from "./Pages/EventPage";
import Favorites from "./Pages/Favorites.js";
import Landing from "./Pages/Landing.js";
import SignUp from "./Pages/SignUp.js";
import SignIn from "./Pages/SignIn.js";
import VendorIndex from "./Pages/VendorIndex.js";
import VendorShow from "./Pages/VendorShow.js";
import EditBooked from "./Pages/EditBooked.js";
import ScrollToTop from "./Components/ScrollToTop.js";
import NavBar from "./Components/NavBar/NavBar.js";
import EditFormPage from "./Pages/EditFormPage.js";
import FourOFour from "./Pages/FourOFour";
import PrivateRoute from "./Components/PrivateRoute";
import Banner from "./Components/Banner";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./App.css";

const API = process.env.REACT_APP_API;

function App() {
  const { currentUser } = useContext(UserContext);
  const [user_id, setUserId] = useState(null);
  const [created, setCreated] = useState(false);
  const [events, setEvents] = useState([]);
  const [updateEvent, setUpdateEvent] = useState(false);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [city, setCity] = useState("");
  const [signedOut, setSignedOut] = useState(true);
  const [formattedName, setFormattedName] = useState("");
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    try {
      axios
        .get(
          "https://event-ful.adaptable.app/https://api.freegeoip.app/json?apikey=94974ea0-347f-11ec-a667-11ee2dd024a0"
        )
        .then((res) => {
          setLat(res.data.latitude);
          setLng(res.data.longitude);
          setCity(`${res.data.city}, ${res.data.region_name}`);
        });
    } catch (e) {
      console.warn(e);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser && currentUser.email && currentUser.displayName) {
        const email = currentUser.email;
        try {
          const checkUser = await axios.get(`${API}/users/${email}`);

          if (checkUser.data.success) {
            const userId = checkUser.data.payload.user_id;
            setUserId(userId);
            setSignedOut(false);
          }

          const formattedName =
            currentUser.displayName.split(" ")[0][0].toUpperCase() +
            currentUser.displayName.split(" ")[0].substring(1);

          setFormattedName(formattedName);
        } catch (e) {
          console.error(e);
        }
      }
    };

    fetchData();
  }, [currentUser, updateEvent]);

  const deleteEvent = async (event_id) => {
    try {
      await axios.delete(`${API}/events/${user_id}/${event_id}`);
      const eventsCopy = events.filter((event) => event.event_id !== event_id);
      setEvents(eventsCopy);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="site">
      <Router>
        <ScrollToTop />
        {signedOut ? <Banner /> : <NavBar setSignedOut={setSignedOut} />}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          <Route
            path="/dashboard/:event_id/edit"
            element={
              <PrivateRoute>
                <EditFormPage
                  setUpdateEvent={setUpdateEvent}
                  user_id={user_id}
                />
              </PrivateRoute>
            }
          />

          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <Dashboard
                  deleteEvent={deleteEvent}
                  events={events}
                  setUpdateEvent={setUpdateEvent}
                  user_id={user_id}
                  formattedName={formattedName}
                  created={created}
                  setCreated={setCreated}
                />
              </PrivateRoute>
            }
          />

          <Route
            path="/task/:category/:event_id/:task_id"
            element={
              <PrivateRoute>
                <EditBooked
                  lat={lat}
                  lng={lng}
                  formatter={formatter}
                  user_id={user_id}
                />
              </PrivateRoute>
            }
          />

          <Route
            path="/event/:event_id"
            element={
              <PrivateRoute>
                <Event formatter={formatter} user_id={user_id} />
              </PrivateRoute>
            }
          />

          <Route
            path="/vendor/:category/:provider_id"
            element={
              <PrivateRoute>
                <VendorShow user_id={user_id} />
              </PrivateRoute>
            }
          />

          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <Favorites
                  currentUser={currentUser}
                  user_id={user_id}
                  formattedName={formattedName}
                />
              </PrivateRoute>
            }
          />

          <Route
            path="/vendors/:category"
            element={
              <PrivateRoute>
                <VendorIndex lat={lat} lng={lng} city={city} />
              </PrivateRoute>
            }
          />

          <Route
            path="/booked/:event_id/:event_name"
            element={
              <PrivateRoute>
                <Booked user_id={user_id} />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<FourOFour />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
