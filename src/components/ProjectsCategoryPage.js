/* @jsx jsx */
import React from "react"
import { Grid, jsx } from "theme-ui"
import {
  eachDayOfInterval,
  format,
  getDate,
  getDayOfYear,
  isSameDay,
  isSameMonth,
  isWeekend,
} from "date-fns"
import { de } from "date-fns/locale"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { projectsTheme } from "../theme"
import PageLayout from "./PageLayout"
import CalendarCard from "./CalendarCard"

function transformDate(startDate, date, locale) {
  return {
    date,
    dayOfWeek: format(date, "EEEE", { locale }),
    dayOfYear: getDayOfYear(date),
    dayOfMonth: getDate(date),
    month: format(date, "MMM", { locale }),
    isToday: isSameDay(new Date(), date),
    isSameMonth: isSameMonth(date, startDate),
    isWeekend: isWeekend(date),
  }
}

function getDays({ startDate, endDate, events = [], locale = de }) {
  return eachDayOfInterval({
    start: startDate,
    end: endDate,
  }).map((day) => {
    const dayEvents = events.filter((event) =>
      isSameDay(new Date(event.date), day)
    )
    return {
      ...transformDate(startDate, day, locale),
      dayEvents,
    }
  })
}

const ProjectsCategoryPage = ({ data }) => {
  const { category, projectPosts } = data
  const {
    coverImage,
    coverImageAuthor,
    coverImageLink,
    startDate,
    endDate,
    description,
  } = category
  const days = getDays({
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    events: projectPosts.nodes,
  })
  return (
    <PageLayout
      theme={projectsTheme}
      title={`${category.id}`}
      coverImage={coverImage}
      coverImageAuthor={coverImageAuthor}
      coverImageLink={coverImageLink}
    >
      <MDXRenderer>{description}</MDXRenderer>
      <Grid gap={2} columns={[2, 3, 4]} sx={{ my: 4, mx: [2, 0, -4], p: 0 }}>
        {days.map((day) => (
          <CalendarCard day={day} key={day.dayOfMonth} />
        ))}
      </Grid>
    </PageLayout>
  )
}

export default ProjectsCategoryPage
