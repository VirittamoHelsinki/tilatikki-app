import { createRef, useEffect, useRef, useState } from "react"
import "./Calendar.css"

import moment from "moment"
import "moment/dist/locale/fi"

moment.locale("fi")

const days = [ "Ma", "Ti", "Ke", "To", "Pe", "La", "Su" ]
const columns = 7
const rows = 6

const Popup = ({ calendarData, date, close, handleBlockClick }) => {
  const blockContainerRef = useRef(null)
  const addNewReservationRef = useRef(null)

  /*
    This effect is responsible for handling the mouse events for the new reservation button.
    It will display the new reservation button when the mouse is over the block container.
    It will also move the new reservation button to the correct row based on the mouse position
    and check if the new reservation button is overlapping with any other blocks.
  */
  useEffect(() => {
    const blockContainer = blockContainerRef.current
    const addNewReservation = addNewReservationRef.current
    if (!blockContainer) return
    if (!addNewReservationRef) return

    addNewReservation.style.display = "none"
    
    // When mouse enters the block container, display the new reservation button
    // and position it accordingly
    const onMouseEnter = (event) => {
      addNewReservation.style.display = "block"
      const rect = blockContainer.getBoundingClientRect()
      const y = (event.clientY + 5) - rect.top

      const rectHeight = blockContainer.clientHeight
      const row = Math.max(Math.floor((y / rectHeight) * 24 * 4), 1)
      
      addNewReservation.style.gridRow = `${row} / ${row + 2}`
    }

    // When mouse leaves the block container, hide the new reservation button
    const onMouseLeave = (event) => {
      addNewReservation.style.display = "none"
    }

    // When mouse moves inside the block container, move the new reservation button.
    // Also check if the new reservation button is overlapping with any other blocks
    // to adjust its column
    const onMouseMove = (event) => {
      // get mouse coordinates relative to event.target
      const rect = blockContainer.getBoundingClientRect()
      const y = (event.clientY + 5) - rect.top

      // get mouse position relative to the block container
      const rectWidth = blockContainer.clientWidth
      // Used to check if mouse is on the left half or right half of the block container
      const mousePositionXRatioToBlockContainerWidth = (event.clientX - rect.left) / rectWidth

      const rectHeight = blockContainer.clientHeight
      const row = Math.max(Math.floor((y / rectHeight) * 24 * 4), 1)

      // Get all blocks that overlap with new reservation button
      const blockedBy = Array.from(blockContainer.children)
        .filter((element) => element.classList.contains("block--daily"))
        .map((element) => {
          
          // Use gridRow to check for overlaps
          const [ blockStartRow, blockEndRow ] = element.style.gridRow
            .split(" / ")
            .map((value) => Number(value))

          const [ buttonStartRow, buttonEndRow ] = [ row, row + 2 ]

          // Check if element is blocking the new reservation button
          if (buttonStartRow >= blockStartRow && buttonStartRow < blockEndRow) {
            return element
          }

          if (buttonEndRow > blockStartRow && buttonEndRow <= blockEndRow) {
            return element
          }
 
          return null
        }).filter((element) => !!element)
      
      // If there are two blocks blocking the new reservation button, hide it
      if (blockedBy.length === 2) {
        addNewReservation.style.display = "none"
        return
      }

      // If there is one block blocking the new reservation button
      if (blockedBy.length === 1) {
        // If the mouse is on the left half of the block container, hide the new reservation button
        if (mousePositionXRatioToBlockContainerWidth < 0.5) {
          addNewReservation.style.display = "none"
          return
        }

        addNewReservation.style.gridColumn = "2 / 3"
      }

      // If there are no blocks blocking the new reservation button,
      // the button is full width
      if (blockedBy.length === 0) {
        addNewReservation.style.gridColumn = "1 / 3"
      }

      addNewReservation.style.display = "block"
      addNewReservation.style.gridRow = `${row} / ${row + 2}`
    }

    blockContainer.addEventListener("mouseover", onMouseEnter)
    blockContainer.addEventListener("mousemove", onMouseMove)
    blockContainer.addEventListener("mouseleave", onMouseLeave)

    return () => {
      blockContainer.removeEventListener("mouseover", onMouseEnter)
      blockContainer.removeEventListener("mousemove", onMouseMove)
      blockContainer.removeEventListener("mouseleave", onMouseLeave)
    }


  }, [ blockContainerRef ])

  const dataToRender = calendarData
    .filter((data) => date.isSame(data.date, "day"))

  const blocks = dataToRender.map((data, index) => {
    // Determine the height and position of the block based on time of the day
    const [ startHour, startMinute ] = data.startTime.split(":");
    const [ endHour, endMinute ] = data.endTime.split(":");

    // Each row is 15 minutes, so an hour is 4 rows
    const rowStart = Number(startHour) * 4 + Number(startMinute) / 15
    const rowEnd = Number(endHour) * 4 + Number(endMinute) / 15

    return (
      <div
        key={`popup-block-${data.label}-${index}`}
        className={`block block--daily`}
        onClick={() => handleBlockClick(data.date)}
        style={{ gridRow: `${rowStart + 1} / ${ rowEnd + 1 }`, zIndex: 10 }}
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

          <div className="day-calendar__blocks" ref={blockContainerRef}>
            { blocks }

            <div
              className="block block--new"
              ref={addNewReservationRef}
            >
              <p>Luo uusi varaus</p>
            </div>
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

  const handleBlockClick = (date) => {
    console.log("Block clicked", date)

  }

  const calendarCells = []

  const today = moment()
  const lastMonth = date.clone().subtract({ month: 1 })
  const daysInLastMonth = lastMonth.daysInMonth()

  const nextMonth = date.clone().add({ month: 1 })
 
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
    return ({
      element: (      
        <div
          className="block"
          onClick={(event) => {
            event.stopPropagation()
            handleBlockClick(data.date)
          }}
        >
          <p>{ `${data.startTime} ${data.label}` }</p>
        </div>

      ),
      date: data.date,
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
                handleBlockClick={handleBlockClick}
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

                      const otherReservationsText = blocksToRender.length === 4
                        ? "+1 muu varaus"
                        : `+${blocksToRender.length - 3} muuta varausta`
                      
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
                            { blocksToRender.slice(0, 3) /* Only render the first three blocks*/ }
                            { blocksToRender.length > 3 && (
                              <div className="block block--more"><p>{ otherReservationsText }</p></div>
                            )}
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