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


const NavigationButton = ({ label }) => {
  return (
    <button
      className="rounded-lg px-4 py-2 text-left hover:bg-zinc-100"
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


        <div className="flex flex-col gap-4 w-[215px]">
          <div className="flex flex-col">
            <p className="text-xl font-semibold mb-2">Omat asetukset</p>
            <NavigationButton label="Käyttäjätiedot" />
            <NavigationButton label="Omat varaukset" />
          </div>

          <div className="flex flex-col">
            <p className="text-xl font-semibold mb-2">Admin</p>
            <NavigationButton label="Lukukausivaraukset" />
            <NavigationButton label="Käyttäjät" />
            <NavigationButton label="Varaukset" />
          </div>
        </div>



        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: "200px", marginRight: 4 }}>
            <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
              Omat asetukset
            </Typography>
            <List component="nav">
              {user?.admin ? (
                <>
                  <ListItem
                    onClick={() => handleNavigation("UserInformation")}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <ListItemText primary="Käyttäjätiedot" />
                  </ListItem>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ marginBottom: 2, marginTop: 2 }}
                  >
                    Admin
                  </Typography>
                  <ListItem
                    onClick={() => handleNavigation("AdminSemesterReservation")} // TÄHÄN NAVIGAATIO KALENTERIIN
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <ListItemText primary="Lukukausivaraukset" />
                  </ListItem>
                  <ListItem
                    onClick={() => handleNavigation("UserProfiles")}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <ListItemText primary="Käyttäjät" />
                  </ListItem>
                  <ListItem
                    onClick={() => handleNavigation("ReservationHistoryAdmin")}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <ListItemText primary="Varaukset" />
                  </ListItem>
                </>
              ) : (
                <>
                  <ListItem
                    onClick={() => handleNavigation("UserInformation")}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <ListItemText primary="Käyttäjätiedot" />
                  </ListItem>
                  <ListItem
                    onClick={() => handleNavigation("ReservationHistory")}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <ListItemText primary="Omat varaukset" />
                  </ListItem>
                </>
              )}
            </List>
          </Box>
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
