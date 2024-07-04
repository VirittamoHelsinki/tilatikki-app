import { createRef, useEffect, useRef, useState } from "react"
import "./Calendar.css"

import moment from "moment"
import "moment/dist/locale/fi"

moment.locale("fi")

const days = [ "Ma", "Ti", "Ke", "To", "Pe", "La", "Su" ]
const columns = 7
const rows = 6

const Popup = ({ calendarData, date, close }) => {
  const dataToRender = calendarData
    .filter((data) => date.isBetween(data.startDate.startOf("day"), data.endDate.endOf("day"), null, "[]"))

  console.log(dataToRender);

  const blocks = dataToRender.map((data, index) => {
    // Determine the height of the block based on time of the day
    const rowStart = Number(data.startTime.split(":")[0])
    const rowEnd = Number(data.endTime.split(":")[0])  

    return (
      <div
        key={`popup-block-${data.label}-${index}`}
        className={`block first last`}
        // if (data.room.size === data.groupSize) gridCol: 1 / 3
        // 
        style={{ gridRow: `${rowStart * 2 + 1} / ${ rowEnd * 2 + 1 }`, zIndex: 10 }}
      >
        <p>{data.label}</p>
        <p className="block__teacher-name">{data.teacher}</p>
      </div>
    )

  })
  
  const handleClose = (event) => {
    event.stopPropagation()    
    close()
  } 
  
  return (
    <div key={`popup-${date.toString()}`} className="popup">
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
            { blocks}
          </div>
        </div>
      </div>

    </div>
  )
}

const Calendar = ({ calendarData = [] }) => {
  // Date to display in the monthly view
  const [ date, setDate ] = useState(moment())
  // Date to display in the daily view
  const [ selectedDate, setSelectedDate ] = useState(null)

  const addMonth = () => {
    setDate((oldDate) => oldDate.clone().add({ month: 1 }))
    setSelectedDate(null)
  }

  const removeMonth = () => {
    setDate((oldDate) => oldDate.clone().subtract({ month: 1 }))
    setSelectedDate(null)
  }

  const handleModal = (date) => {
    setSelectedDate(date)
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


  const blocks = calendarData.map((data) => {
    console.log(data);
    return ({
      element: (      
        <div
          className={`block first last`}
        >
          <p>{ `${data.startTime} ${data.label}` }</p>
        </div>

      ),
      date: data.startDate,
    })
  })  

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
            selectedDate && (
              <Popup
                key={`popup-${selectedDate.toString()}`}
                calendarData={calendarData} 
                date={selectedDate}
                close={() => handleModal(null)}
              />
            )
          }

          {
            // Generate each row one by one
            Array.from({ length: rows }).map((_, week) => {
              // Get the first top left cell of the calendar and check its week number
              const actualWeekNumber = calendarCells[0].date.week() + week
              const currentYear = calendarCells[0].date.year()
              
              return (
                <div className="calendar__week">
                  {
                    Array.from({ length: columns }).map((_, day) => {
                      const cellIndex = columns * week + day
                      const item = calendarCells[cellIndex]

                      const blocksToRender = blocks
                        .filter((data) => item.date.isSame(data.date, "day"))
                        .map((data) => data.element)
                      
                      return (
                        <div
                          key={`cell-${cellIndex}`}
                          className={`calendar__cell ${item.currentMonth ? "" : "grayed"}`}
                          style={{ gridRow: "1 / 3", gridColumn: day + 1 }}
                          onClick={() => handleModal(item.date)}
                        >
                          <p className={`calendar__cell-number ${ item.date.isSame(today, "day") ? "today" : "" }`}>
                            { item.date.date().toString().padStart(2, "0") }
                          </p>

                          <div className="calendar__block-container">
                            { blocksToRender }
                          </div>
                        </div>
                      )
                    })
                  }


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