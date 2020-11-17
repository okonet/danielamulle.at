import React from "react"
import PropTypes from "prop-types"
import { isBefore } from "date-fns"
import { Box } from "theme-ui"
import { useLocation } from "@reach/router"
import PostCard from "./PostCard"

CalendarCard.propTypes = {
  day: PropTypes.shape({
    dayEvents: PropTypes.arrayOf(
      PropTypes.shape({
        author: PropTypes.string,
        coverImage: PropTypes.object.isRequired,
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      })
    ),
  }),
}

function CalendarCard({ day, ...props }) {
  const location = useLocation()
  const { dayOfMonth, month, dayEvents } = day
  const event = dayEvents[0] || {}
  const { coverImageAuthor, coverImage, slug, title, linkedPost } = event
  const linkTo = linkedPost || slug
  const isBeforeToday = isBefore(day.date, new Date())
  const color = day.isToday ? "accent" : "text"
  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: "medium",
        overflow: "hidden",
        boxShadow: "float",
        bg: color,
        borderColor: color,
        "::after": {
          position: "absolute",
          top: 0,
          left: 0,
          p: 3,
          fontFamily: "body",
          fontSize: 0,
          color: "background",
          content: `"${dayOfMonth} ${month}"`,
        },
      }}
      {...props}
    >
      {event ? (
        <PostCard
          coverImage={coverImage}
          coverImageAuthor={coverImageAuthor}
          slug={isBeforeToday ? linkTo : `${location.pathname}?signup`}
          title={title}
          sx={{
            cursor: "pointer",
            opacity: isBeforeToday ? 1 : 0.25,
          }}
        />
      ) : (
        <PostCard slug={"?signup"} />
      )}
    </Box>
  )
}

export default CalendarCard
