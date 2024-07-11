import { Box, Grid, Typography, Divider, TextField, MenuItem, Select, FormControl, InputLabel, Button, FormControlLabel, Switch } from "@mui/material"
import Calendar from "./Calendar"
import { useEffect, useState } from "react"
import { getReservations } from "../api/reservations"
import { useAllSchoolsQuery } from "../api/schools"
import moment from "moment"
import AdminCreateReservationDialog from "./AdminCreateReservationDialog"
import { useForm } from "react-hook-form"

const AdminSemesterReservation = () => {
  const { data: schoolData } = useAllSchoolsQuery()

  console.log(schoolData);
  

  const { watch, register } = useForm({
    defaultValues: {
      school: null,
      building: null,
    }
  })

  const [ selectedSchool, setSelectedSchool ] = useState(null)
  const [ selectedBuilding, setSelectedBuilding ] = useState(null)
  const [ reservations, setReservations ] = useState([])

  console.log("WATCH", watch("school"), watch("building"));

  useEffect(() => {
    console.log("USE EFFECT");
    const fetchReservations = async () => {
      const fetchedReservations = (await getReservations())
        .map(reservation => {
          return {
            ...reservation,
            
            label: reservation.purpose,
            date: moment(reservation.reservationDate),
            startTime: reservation.startTime,
            endTime: reservation.endTime,
          }
        })

      setReservations(fetchedReservations)
      console.log('Fetched reservations:', fetchedReservations);
    }
    
    if (watch("school") && watch("building")) {
      console.log("USE EFFECT", watch("school"), watch("building"));
      fetchReservations()
    } else {
      setReservations([])
    }
    
  }, [ watch("school"), watch("building") ])

  if (!schoolData) {
    return <p>loading... :P</p>
  }

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "4fr 8fr", gap: "32px", }}>
      <Grid item lg={4}>

        <Box>
          <Grid container spacing={2}>
            <Grid item lg={12}>
              <Typography component="h1" variant="h5">Lukukausivaraukset</Typography>
            </Grid>

            <Grid item lg={12}>
              <Typography component="p" variant="subtitle1">Tee varauksia koko lukukaudelle.</Typography>
            </Grid>

            <Grid item lg={12}>
              <Divider />
            </Grid>

            <Grid item lg={12}>
              <Typography component="p" variant="subtitle1">Näytä varaukset kalenterissa</Typography>
            </Grid>

            <Grid item lg={6}>
              <FormControl fullWidth>
                <InputLabel id="school-filter-label">Koulussa*</InputLabel>
                <Select
                  labelId="school-filter-label"
                  id="school-filter"
                  name="school"
                  required
                  fullWidth
                  label="Koulussa"
                  { ...register("school") }
                >
                  {
                    schoolData.map((school, index) => (
                      <MenuItem key={index} value={school}>{ school.name }</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>

            </Grid>

            <Grid item lg={6}>
              <FormControl fullWidth>
                <InputLabel id="building-filter-label">Rakennuksessa*</InputLabel>
                <Select
                  labelId="building-filter-label"
                  id="building-filter"
                  name="building"
                  required
                  fullWidth
                  label="Rakennuksessa"
                  disabled={!watch("school")}
                  { ...register("building") }
                >
                  {
                    watch("school")?.buildings.map((building, index) => (
                      <MenuItem key={index} value={building}>{ building.name }</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>

            <Grid item lg={12}>
              <Divider />
            </Grid>


            <AdminCreateReservationDialog />
          </Grid>

        </Box>
      
      </Grid>
      



      <Box>
        <Calendar calendarData={reservations} />
      </Box>
    </Box>  
    


  )

}

export default AdminSemesterReservation