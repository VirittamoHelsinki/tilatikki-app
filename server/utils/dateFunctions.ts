import { IAvailability, isAvailabilityList } from "../models/Availability"
import { IReservation, isReservationList } from "../models/Reservation"

export const intersectingTimespans = (
    startdate: Date, enddate: Date, timespans: IAvailability[] | IReservation[]) => {
    timespans.forEach(timespan => {
        if (startdate < timespan.startdate && timespan.startdate < enddate) return true
        if (startdate <  timespan.enddate  && timespan.enddate < enddate) return true
        if (timespan.startdate <= startdate && enddate <= timespan.enddate) return true
    })

    return false
}
