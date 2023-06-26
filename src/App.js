import { createTheme } from "@mui/material";
import { makeStyles, ThemeProvider } from "@mui/styles";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/Routes";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import CenterModal from "./components/Modal/CenterModal";
import { Button } from "./components/Button/Button";
import useSearchAnime from "./utils/hooks/useSearchAnime";
import { useSearchAnimeContext } from "./context/SearchAnime";
import useToggle from "./utils/hooks/useToggle";
import useApiRequest from "./utils/hooks/useApiRequest";
import { reissueToken } from "./utils/apiUrls/auth.request";
import PageLoader from "./components/PageLoader";
import { ToastNotify } from "./components/reusables/helpers/ToastNotify";
import { responseMessageHandler } from "./utils/libs";

function App() {
  const theme = createTheme();
  useEffect(() => {
    AOS.init({
      disableMutationObserver: false,
      mirror: false,
    });
  }, []);

  const makeRequest = useApiRequest();
  const [loading, toggleLoading] = useToggle();

  const { searchParams } = useSearchAnimeContext();
  const { error } = useSearchAnime(searchParams);

  const refreshToken = async () => {
    toggleLoading();
    const token = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      const payload = {
        accessToken: token,
        refreshToken: refreshToken,
      };
      const response = await makeRequest.post(reissueToken, payload);
      if (response?.status === 200) {
        localStorage.setItem("accessToken", response?.data?.data);
        ToastNotify({
          type: "success",
          message: "Success",
          position: "top-right",
        });
      }
      toggleLoading();
      console.log(response);
    } catch (error) {
      toggleLoading();
      ToastNotify({
        type: "error",
        message: responseMessageHandler({ error }),
        position: "top-right",
      });
    }
  };

  return (
    <>
      {loading && <PageLoader message="Refreshing" />}
      <ThemeProvider theme={theme}>
        <Router>
          <AppRoutes />
        </Router>
      </ThemeProvider>

      {error?.response?.status === 401 && window.location.pathname !== "/" && (
        <CenterModal title="Session" width="50%">
          <div className="font-normal text-sm font-inter mb-3 text-center">
            Your session has expired
          </div>
          <div className="flex justify-center gap-5">
            <div onClick={() => refreshToken()}>
              <Button labelText="Refresh Session" />
            </div>
            <div
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
            >
              <Button buttonVariant="secondary" labelText="Logout" />
            </div>
          </div>
        </CenterModal>
      )}
    </>
  );
}

export default App;
