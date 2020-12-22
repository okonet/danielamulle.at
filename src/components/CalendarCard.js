import React from "react"
import PropTypes from "prop-types"
import { isBefore } from "date-fns"
import { useLocation } from "@reach/router"
import PostCard from "./PostCard"

CalendarCard.propTypes = {
  day: PropTypes.shape({
    date: PropTypes.object,
    dayOfMonth: PropTypes.string,
    month: PropTypes.string,
    dayEvents: PropTypes.arrayOf(
      PropTypes.shape({
        author: PropTypes.string,
        coverImage: PropTypes.object,
        slug: PropTypes.string.isRequired,
        title: PropTypes.string,
      })
    ),
  }).isRequired,
}

function CalendarCard({ day }) {
  const location = useLocation()
  const { dayOfMonth, month, dayEvents } = day
  const event = dayEvents[0] || {}
  const { coverImageAuthor, coverImage, slug, title, linkedPost } = event
  const linkTo = linkedPost || slug
  const isBeforeToday = isBefore(day.date, new Date())
  const color = day.isToday ? "accent" : "text"
  return event ? (
    <PostCard
      disabled={!isBeforeToday}
      coverImage={coverImage}
      author={coverImageAuthor}
      date={`${dayOfMonth} ${month}`}
      slug={isBeforeToday ? linkTo : `${location.pathname}?signup`}
      title={title}
      sx={{
        bg: color,
      }}
    />
  ) : (
    <PostCard disabled date={`${dayOfMonth} ${month}`} slug={"?signup"} />
  )
}

export default CalendarCard
