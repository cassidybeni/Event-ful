import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../Providers/UserProvider";

const PrivateRoute = ({
  component: Component,
  deleteEvent,
  events,
  user_id,
  setUpdateEvent,
  formattedName,
  lat,
  lng,
  formatter,
  location,
  created,
  setCreated,
  city,
  setCity,
  ...rest
}) => {
  const currentUser = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        (!!currentUser.currentUser ) ? (
          <Component
            {...props}
            deleteEvent={deleteEvent}
            events={events}
            setUpdateEvent={setUpdateEvent}
            user_id={user_id}
            formattedName={formattedName}
            lat={lat}
            lng={lng}
            formatter={formatter}
            location={location}
            created={created}
            setCreated={setCreated}
            city={city}
            setCity={setCity}
          />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};

export default PrivateRoute;
