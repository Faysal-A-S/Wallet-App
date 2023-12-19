import { useSelector } from "react-redux";

const useAuth = () => {
  const token = useSelector((state) => state.AuthUser);
  const { verify } = useSelector((state) => state.AuthUser);

  if (token?.token && verify) {
    return true;
  } else {
    return false;
  }
};

export default useAuth;
