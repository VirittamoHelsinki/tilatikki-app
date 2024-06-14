import { useState } from "react"
import "./Calendar.css"

import moment from "moment"
import "moment/dist/locale/fi"

moment.locale("fi")

const days = [ "Ma", "Ti", "Ke", "To", "Pe", "La", "Su" ]
const columns = 7
const rows = 6

const Popup = ({ calendarData, date, close }) => {
  const blocks = calendarData.map((data) => {

    // Check if block should be rendered
    const isDateBetween = date.isBetween(data.startDate, data.endDate, null, "[]")
    if (!isDateBetween) {
      return
    }

    // Determine the height of the block based on time of the day
    const rowStart = Number(data.startTime.split(":")[0])
    const rowEnd = Number(data.endTime.split(":")[0])  

    return (
      <div
        key={`popup`}
        className={`block first last`}
        style={{ gridRow: `${rowStart + 1} / ${ rowEnd + 1 }`, zIndex: 10000 }}
      >
        <p>{data.label}</p>
        <p className="block__teacher-name">{data.teacher}</p>
      </div>
    )

  }).filter((a) => !!a)
  
  const handleClose = (event) => {
    event.stopPropagation()    
    close()
  } 
  
  return (
    <div className="popup">
      <div className="popup__header">
        { /* close button */ }
        <svg className="cross" onClick={handleClose} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <div className="popup__container">
        <div className="day-calendar">
          <div className="day-calendar__time">
            {
              Array.from({ length: 24 }).map((_, index) => {
                return <p key={`time-${index}`}>{ index }</p>
              })
            }
          </div>

          <div className="day-calendar__blocks-background-container">
            {
              // Generate the background for blocks
              Array.from({ length: 24 }).map((_, index) => {
                return (
                  <div
                    key={`block-background-${index}`}
                    className="day-calendar__blocks-background"
                  ></div>
                )
              })
            }
          </div>

          <div className="day-calendar__blocks">
            { blocks }
          </div>
        </div>
      </div>

    </div>
  )
}


const mockData = [
  {
    startDate: moment([2024, 5, 4]),
    endDate: moment([2024, 5, 10]),
    startTime: "9:00",
    endTime: "15:00",
    label: "Matematiikka 1",
    teacher: "Onni Opettaja",
  },
  {
    startDate: moment([2024, 5, 6]),
    endDate: moment([2024, 5, 13]),
    startTime: "15:15",
    endTime: "16:00",
    label: "Äidinkieli 1",
    teacher: "Onni Opettaja",
  },
  {
    startDate: moment([2024, 5, 11]),
    endDate: moment([2024, 5, 15]),
    startTime: "9:00",
    endTime: "12:00",
    label: "Biologia 5",
    teacher: "Onni Opettaja",
  },
  {
    startDate: moment([2024, 5, 18]),
    endDate: moment([2024, 5, 21]),
    startTime: "9:00",
    endTime: "10:00",
    label: "Matematiikka 2",
    teacher: "Onni Opettaja",
  },
  {
    startDate: moment([2024, 5, 19]),
    endDate: moment([2024, 5, 21]),
    startTime: "9:00",
    endTime: "11:00",
    label: "Biologia 2",
    teacher: "Onni Opettaja",
  },
  {
    startDate: moment([2024, 5, 19]),
    endDate: moment([2024, 5, 21]),
    startTime: "11:00",
    endTime: "12:00",
    label: "Uskonto 3",
    teacher: "Onni Opettaja",
  },
  {
    startDate: moment([2024, 5, 19]),
    endDate: moment([2024, 5, 21]),
    startTime: "12:00",
    endTime: "13:00",
    label: "Psykologia 4",
    teacher: "Onni Opettaja",
  },
]

// { calendarData = mockData } to use mockData
const Calendar = ({ calendarData = mockData }) => {
  const [ date, setDate ] = useState(moment())
  const [ modal, setModal ] = useState(-1)

  const addMonth = () => {
    setDate((oldDate) => oldDate.clone().add({ month: 1 }))
    setModal(null)
  }

  const removeMonth = () => {
    setDate((oldDate) => oldDate.clone().subtract({ month: 1 }))
    setModal(null)
  }

  const handleModal = (index) => {
    setModal(index)
  }

  const calendarCells = []
  const amountOfBlocksInCells = []

  const today = moment()
  const lastMonth = date.clone().subtract({ month: 1 })
  const daysInLastMonth = lastMonth.daysInMonth()

  const nextMonth = date.clone().add({ month: 1 })
  const daysInNextMonth = nextMonth.daysInMonth()
 
  const firstDayOfCurrentMonth = moment([ date.year(), date.month(), 1 ]).day() - 1
  
  // Previous month
  for (let dayNumber = (daysInLastMonth - firstDayOfCurrentMonth); dayNumber < daysInLastMonth; dayNumber++) {
    calendarCells.push({
      date: moment([ lastMonth.year(), lastMonth.month(), dayNumber + 1 ]),
      currentMonth: false,
    })
  }

  // Current month
  for (let dayNumber = 0; dayNumber < date.daysInMonth(); dayNumber++) {
    calendarCells.push({
      date: moment([ date.year(), date.month(), dayNumber + 1 ]),
      currentMonth: true,
    })
  }  
  
  // Next month
  const daysInPreviousAndCurrent = calendarCells.length
  for (let dayNumber = calendarCells.length; dayNumber < rows * columns; dayNumber++) {
    calendarCells.push({
      date: moment([ nextMonth.year(), nextMonth.month(), dayNumber - daysInPreviousAndCurrent + 1 ]),
      currentMonth: false,
    })
  }

  // Count number of blocks in each cell
  for (let i = 0; i < calendarCells.length; i++) {
    const date = calendarCells[i].date

    for (let j = 0; j < calendarData.length; j++) {
      const data = calendarData[j]
      const isDateBetween = date.isBetween(data.startDate, data.endDate, null, "[]")

      if (!isDateBetween) {
        continue
      }

      if (!amountOfBlocksInCells[i]) {
        amountOfBlocksInCells[i] = 0
      }

      amountOfBlocksInCells[i] = amountOfBlocksInCells[i] + 1
    }
  } 

  // Generate calendar schedule blocks
  const blocks = calendarData.map((data) => {
    // Figure out in what column and row the schedule element starts from
    // and how big it should be.
    const startingColumn = data.startDate.day() - 1
    const startingRow = Math.floor(calendarCells.findIndex((item) => item.date.isSame(data.startDate, "day")) / 7)
    const columnsOccupied = data.endDate.diff(data.startDate, "days") + 1
    const rowsOccupied = Math.ceil((columnsOccupied + data.startDate.day()) / columns)

    const blocks = []

    let currentWeek = data.startDate.week()
    let currentColumn = startingColumn
    let currentRow = startingRow
    let cellsToVisit = columnsOccupied
    let creatingBlock = true
    let originColumn = currentColumn

    while (cellsToVisit > 0) {
      creatingBlock = true
      currentColumn++
      cellsToVisit--

      // Current block is starting to be too big for the view
      if (currentRow === rows) {
        break
      }

      // If true, row changes
      if (currentColumn === columns) {

        blocks.push({
          element: (      
            <div
              className={`block ${blocks.length === 0 ? "first" : ""} ${cellsToVisit === 0 ? "last" : ""}`}
              style={{ gridColumn: `${originColumn + 1} / ${ currentColumn + 1 }` }}
            >
              <p>{ `${data.startTime} ${data.label}` }</p>
            </div>
          ),
          week: currentWeek,
        })
        
        creatingBlock = false 
        currentColumn = 0
        currentRow++ // Increment row
        originColumn = 0 // Next block will start from column 0
        currentWeek++ // Increment week when going to the next row
      }
      
    }

    if (creatingBlock) {
      blocks.push({
        element: (      
          <div
            className={`block ${blocks.length === 0 ? "first" : ""} last`}
            style={{ gridColumn: `${originColumn + 1} / ${ currentColumn + 1 }` }}
          >
            <p>{ `${data.startTime} ${data.label}` }</p>
          </div>
        ),
        week: currentWeek,
      })
    }
        
    return blocks
  }).flat()
  

  return (

    <>      
      <div className="calendar-wrapper">
        <div className="calendar__controls">
          <p className="calendar__current-date">{ date.format("MMMM YYYY") }</p>

          <div className="nav">
            <button onClick={() => setDate(moment())}>{"Tänään"}</button>
            <button onClick={removeMonth}>{"Edellinen"}</button>
            <button onClick={addMonth}>{"Seuraava"}</button>
          </div>
        </div>

        <div className="calendar__header">
          {
            days.map((day) => (
              <div key={day} className="calendar__header-title">
                <p>{ day }</p>
              </div>
            ))
          }
        </div>
        <div className="calendar__body">

          {
            // Generate each row one by one
            Array.from({ length: rows }).map((_, week) => {
              // Get the first top left cell of the calendar and check its week number
              const actualWeekNumber = calendarCells[0].date.week() + week
              
              return (
                <div className="calendar__week">
                  {
                    Array.from({ length: columns }).map((_, day) => {
                      const cellIndex = columns * week + day
                      const item = calendarCells[cellIndex]
                      
                      return (
                        <div
                          key={`cell-${cellIndex}`}
                          className={`calendar__cell ${item.currentMonth ? "" : "grayed"}`}
                          style={{ gridRow: "1 / 3", gridColumn: day + 1 }}
                          onClick={() => handleModal(cellIndex)}
                        >
                          <p className={`calendar__cell-number ${ item.date.isSame(today, "day") ? "today" : "" }`}>
                            { item.date.date().toString().padStart(2, "0") }
                          </p>

                         {
                          cellIndex === modal && <Popup calendarData={calendarData} date={item.date} close={() => handleModal(-1)} />
                         }
                        </div>
                      )
                    })
                  }

                  <div className="calendar__block-container">
                    {
                      blocks
                        .filter((data) => data.week === actualWeekNumber)
                        .map((data) => data.element)
                    }

                    {
                      Array.from({ length: 7 }).map((_, day) => {
                        const cellIndex = 7 * week + day
                        const amountOfBlocks = amountOfBlocksInCells[cellIndex]

                        if (!amountOfBlocks || (amountOfBlocks - 3) < 1) {
                          return
                        }

                        const blockString = (amountOfBlocks - 3) === 1
                          ? `+1 muu varaus`
                          : `+${amountOfBlocks - 3} muuta varausta`
                        
                        return (
                          <div
                            className={"block first last"}
                            style={{ gridColumn: day + 1, gridRow: 4, backgroundColor: "#2f4371" }}
                          >
                            <p>{ "muut varaukset" }</p>
                          </div>
                        )
                      })
                    }
                  </div>

                </div>
              )
            })
          }


        </div>

      </div>
    </>
  )
}

export default Calendar