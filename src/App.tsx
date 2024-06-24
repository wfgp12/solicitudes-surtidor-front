import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { AppRouter } from "./routes";

import { validateTokenSession } from "./service/auth/auth.service";
import { LocalStorageKeys } from "./utils/local-storage-keys";

import "./App.scss";
import { loginAction, logoutAction } from "./redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(LocalStorageKeys.token);

    if (token) {
      validateTokenSession()
        .then((resp) => {
          dispatch(loginAction({ user: resp, token }));
        })
        .catch((error) => {
          console.error(error)

          localStorage.removeItem(LocalStorageKeys.token);
          dispatch(logoutAction());
          navigate('/login')
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  if (loading) return <div>Loading...</div>

  return <AppRouter />;
}

export default App;
