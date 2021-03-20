import React from "react"
import PropTypes from "prop-types"
import { isBefore } from "date-fns"
import PostCard from "./PostCard"
import { useRouter } from "next/router"

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

function CalendarCard({ day, post }) {
  const { asPath } = useRouter()
  const { dayOfMonth, month, dayEvents } = day
  const { coverImageAuthor, coverImage, slug, title, linkedPost } = post
  const linkTo = linkedPost || slug || `${asPath}?signup`
  const isBeforeToday = isBefore(day.date, new Date())
  const color = day.isToday ? "accent" : "text"
  return post ? (
    <PostCard
      disabled={!isBeforeToday}
      coverImage={coverImage}
      author={coverImageAuthor}
      date={`${dayOfMonth} ${month}`}
      slug={isBeforeToday ? linkTo : `${asPath}?signup`}
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
