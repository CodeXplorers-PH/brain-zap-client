import { AuthContext } from "@/provider/AuthProvider";
import { useContext } from "react";

const LockedErr = () => {
  const { isLocked, user } = useContext(AuthContext);

  return (
    <div>
      {user && isLocked ? (
        <div className="mb-6 p-3 bg-red-800/40 border border-red-600 text-red-300 rounded-b-md text-sm fixed z-50 -translate-x-1/2 left-1/2 top-0 w-full text-center">
        Oops! Your account has been locked for security reasons. Please contact support to unlock your account.
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default LockedErr;
