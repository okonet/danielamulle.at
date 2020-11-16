/* @jsx jsx */
import React, { useEffect, useState } from "react"
import { Grid, jsx } from "theme-ui"
import {
  addDays,
  eachDayOfInterval,
  endOfWeek,
  format,
  getDate,
  getDayOfYear,
  getMonth,
  getYear,
  isBefore,
  isSameDay,
  isSameMonth,
  isWeekend,
  startOfWeek,
} from "date-fns"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { projectsTheme } from "../theme"
import PageLayout from "./PageLayout"
import CalendarCard from "./CalendarCard"
import ModalCard from "./ModalCard"
import { globalHistory, useLocation, navigate } from "@reach/router"

const defaultOptions = {
  numOfWeeks: 6,
  numOfDays: 7,
  locale: undefined,
  events: [],
}

function transformDate(startDate, date, locale) {
  return {
    date,
    dayOfWeek: format(date, "EEEE", { locale }),
    dayOfYear: getDayOfYear(date),
    dayOfMonth: getDate(date),
    isToday: isSameDay(new Date(), date),
    isSameMonth: isSameMonth(date, startDate),
    isWeekend: isWeekend(date),
  }
}

function getDays(date, options = defaultOptions) {
  let currentDate = startOfWeek(new Date(getYear(date), getMonth(date)))
  const { events } = options
  const weeks = Array.from({ length: options.numOfWeeks }).map(
    (_, weekIndex) => {
      return Array.from({ length: options.numOfDays }).map((_, dayIndex) => {
        const day = transformDate(date, currentDate, options.locale)
        const dayEvents = events.filter((event) =>
          isSameDay(new Date(event.date), currentDate)
        )
        currentDate = addDays(currentDate, 1)
        return { dayIndex, weekIndex, dayEvents, ...day }
      })
    }
  )
  const days = eachDayOfInterval({
    start: startOfWeek(currentDate),
    end: endOfWeek(currentDate),
  }).map((day) => format(day, "EEE", { locale: options.locale }))

  return {
    startDate: date,
    month: format(date, "LLLL"),
    year: getYear(date),
    weeks,
    days,
  }
}

const ProjectsCategoryPage = ({ data, location }) => {
  const { category, projectPosts } = data
  const {
    coverImage,
    coverImageAuthor,
    coverImageLink,
    startDate,
    description,
  } = category
  const state = getDays(new Date(startDate), {
    ...defaultOptions,
    events: projectPosts.nodes,
  })
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    return globalHistory.listen(({ location }) => {
      // Show a modal when we have a signup in the search part of URL
      if (location.search.includes("signup")) {
        setIsOpen(true)
      }
    })
  }, [])

  useEffect(() => {
    // Clean up the URL if we close the modal
    if (!isOpen) {
      navigate(location.pathname, { replace: true })
    }
  }, [isOpen])

  return (
    <PageLayout
      theme={projectsTheme}
      title={`${category.id}`}
      shouldShowSubscribe={false}
      coverImage={coverImage}
      coverImageAuthor={coverImageAuthor}
      coverImageLink={coverImageLink}
    >
      <ModalCard isOpen={isOpen} closeModal={() => setIsOpen(false)} />
      <MDXRenderer>{description}</MDXRenderer>
      <Grid gap={2} columns={[2, 3, 4]} sx={{ my: 4, mx: [2, 0, -4], p: 0 }}>
        {state.weeks.map((week) =>
          week.map(
            (day) =>
              day.isSameMonth && (
                <CalendarCard
                  day={day}
                  key={day.dayOfMonth}
                  location={location}
                  openModal={() => setIsOpen(true)}
                />
              )
          )
        )}
      </Grid>
    </PageLayout>
  )
}

export default ProjectsCategoryPage
