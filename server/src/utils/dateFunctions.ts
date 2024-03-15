import { type IAvailability } from "@shared/types/api/availability";
import { type IReservation } from "@shared/types/api/reservation";

export const intersectingTimespans = (
  startdate: Date,
  enddate: Date,
  timespans: IAvailability[] | IReservation[]
) => {
  timespans.forEach((timespan) => {
    if (startdate < timespan.startdate && timespan.startdate < enddate)
      return true;
    if (startdate < timespan.enddate && timespan.enddate < enddate) return true;
    if (timespan.startdate <= startdate && enddate <= timespan.enddate)
      return true;
  });

  return false;
};

export const duringTimespan = (
  startdate: Date,
  enddate: Date,
  timespan: IAvailability | IReservation
) => {
  if (startdate < timespan.startdate) return false;
  if (timespan.enddate < enddate) return false;

  return true;
};
