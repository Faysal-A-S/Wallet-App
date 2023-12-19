import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loggedInUser } from "../features/User/userSlice";

const AuthCheck = () => {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("user");
    const user = localStorage.getItem("verify");
    if (token && user) {
      const processedToken = JSON.parse(token).token;
      const processedUser = JSON.parse(user).user;
      dispatch(loggedInUser({ token: processedToken, verify: processedUser }));
    }
    setAuthChecked(true);
  }, [setAuthChecked, dispatch]);
  return authChecked;
};

export default AuthCheck;
