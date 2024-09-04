import React, { useState } from "react";
import {
  Typography,
  Divider,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import UserInformation from "../components/UserInformation";
import ReservationHistory from "../components/ReservationHistory";
import UserProfiles from "../components/UserProfiles";
import ReservationHistoryAdmin from "../components/ReservationHistoryAdmin";
import Header from "../components/Header";
import Calendar from "../components/Calendar";
import AdminSemesterReservation from "../components/AdminSemesterReservation";
import useUser from "@/utils/useUser";


const NavigationButton = ({ label, ...rest }) => {
  return (
    <button
      className="rounded-lg px-4 py-2 text-left hover:bg-zinc-100"
      { ...rest }
    >
      { label }
    </button>
  )
}

const SettingsPage = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const user = useUser();

  const handleNavigation = (component) => {
    setSelectedComponent(component);
  };

  return (
    <>
      <Header />
      <Box sx={{ padding: 4 }}>
        <p className="text-3xl font-semibold mb-2">
          Hallinnointi
        </p>
        <p className="text-xl text-muted-foreground">
          {user?.admin
            ? "Tällä sivulla voit mm. muokata omia käyttäjätietojasi, tehdä lukukausivarauksia sekä asettaa käyttäjille eri käyttöoikeuksia."
            : "Tällä sivulla voit muokata omia käyttäjätietojasi sekä tarkastella varaushistoriaasi."}
        </p>

        <Divider sx={{ marginTop: 4, marginBottom: 4 }} />




        <Box sx={{ display: "flex" }}>
          <div className="flex flex-col gap-4 w-[215px] mr-4">
            <div className="flex flex-col">
              <p className="text-xl font-semibold mb-2">Omat asetukset</p>
              <NavigationButton
                label="Käyttäjätiedot"
                onClick={() => handleNavigation("UserInformation")}
              />
              {
                !user?.admin && (
                  <NavigationButton
                    label="Omat varaukset"
                    onClick={() => handleNavigation("ReservationHistory")}
                  />
                )
              }
            </div>

            {
              user?.admin && (
                <div className="flex flex-col">
                  <p className="text-xl font-semibold mb-2">Admin</p>
                  <NavigationButton
                    label="Lukukausivaraukset"
                    onClick={() => handleNavigation("AdminSemesterReservation")}
                  />
                  <NavigationButton
                    label="Käyttäjät"
                    onClick={() => handleNavigation("UserProfiles")}
                  />
                  <NavigationButton
                    label="Varaukset"
                    onClick={() => handleNavigation("ReservationHistoryAdmin")}
                  />
                </div>
              )
            }
          </div>
          
          <Box sx={{ flex: 1 }}>
            {user?.admin ? (
              <>
                {selectedComponent === "UserInformation" && <UserInformation />}
                {selectedComponent === "AdminSemesterReservation" && (
                  <AdminSemesterReservation />
                )}
                {selectedComponent === "UserProfiles" && <UserProfiles />}
                {selectedComponent === "ReservationHistoryAdmin" && (
                  <ReservationHistoryAdmin />
                )}
              </>
            ) : (
              <>
                {selectedComponent === "UserInformation" && <UserInformation />}
                {selectedComponent === "ReservationHistory" && (
                  <ReservationHistory />
                )}
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SettingsPage;
