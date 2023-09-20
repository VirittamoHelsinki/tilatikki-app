export const intersectingTimespans = (
    startdate: Date, enddate: Date, timespans: { 
        startdate:Date, enddate:Date
    }[]) => {
    timespans.forEach(timespan => {
        if (startdate < timespan.startdate && timespan.startdate < enddate) return true
        if (startdate <  timespan.enddate  && timespan.enddate < enddate) return true
        if (timespan.startdate <= startdate && enddate <= timespan.enddate) return true
    })

    return false
}

