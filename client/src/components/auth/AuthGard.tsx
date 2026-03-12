import { Navigate, Outlet } from "react-router-dom";
import { useMe } from "../../hooks/useMe";

const AuthGuard = () => {
  const { data: user, isLoading, isError } = useMe();

  console.log("AuthGuard :",user);


  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isError || !user) {
    console.log(isError , user);
    
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
