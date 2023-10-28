import { getCurrentUser } from "../utils/data";
import supabase from "../utils/supabase";
import { useEffect, useState } from "react";

const useUser = () => {
  // we set both of these to 0 so that if they change to null it triggers a change in useEffect
  const [user, setUser] = useState(0);
  const [error, setError] = useState(0);
  const [fullyLoaded, setFullyLoaded] = useState(false);

  const refreshUser = async () => {
    setError(undefined);
    setUser(undefined);
    getUser();
  };

  const getUser = async () => {
    // we want to clear out error, but do not necessarily
    // want to trigger a useEffect change for error here if we do not
    // have a current error, same with user
    setError(0);
    setUser(0); // we may not need this, especially if we are relying on fullyLoaded
    setFullyLoaded(false);
    // we have an issue that await takes time, which is why we cannot rely on nulling user
    // and fetching the current user again, there's in between time where
    // user is equal to zero (falsy) and the user is not yet fetched, which
    // occurs after the await resolves, therefore we introduce the fullyLoaded variable
    // as a failsafe
    const currentUser = await getCurrentUser();

    // if fullyLoaded is true, we know for sure that the user exported is correct
    // components that use this, have to check for fullyLoaded before acting on user
    // we can also set user to something like {fullyLoaded ? user : -1} and -1 means the user is loading...
    // there's more than one way to solve this issue

    setFullyLoaded(true);
    if (!currentUser) {
      // triggers a useEffect change
      // as we go from 0 (which in this case is "unset") or a user object to null in the case of signing out
      setUser(null);
      return;
    }

    // lets expose an error if one exists
    // we only care if an error has gone from 0 to something
    if (currentUser.error) {
      setError(currentUser.error);
      return;
    }
    setUser(currentUser.data);
  };

  // since we are not reloading our page after auth takes place (in or out)
  // let's refresh the user in this state when either a sign in or out happens
  supabase.auth.onAuthStateChange((event, session) => {
    if (["SIGNED_IN", "SIGNED_OUT"].includes(event)) {
      getUser();
    }
  });

  // this is where it all begins, when any component
  // using this hook mounts, let's call useEffect
  // remember useEffect takes two parameters, a function and an array
  // if the array is empty it fires when the component mounts, if the
  // array is set to values, it will fire when those values change
  // if you do not set a second argument it fires whenever
  // ANYTHING changes, which is likely undesireable!
  useEffect(() => {
    getUser();
  }, []);

  // provide to any component using this hook the current values of
  // user object, error object (or falsy) and if we are not yet fullyLoaded
  return {
    user,
    error,
    fullyLoaded,
  };
};

export default useUser;






