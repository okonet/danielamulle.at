import React from "react"
import PropTypes from "prop-types"
import { isBefore } from "date-fns"
import { Box } from "theme-ui"
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
  const { dayOfMonth, month, dayEvents } = day
  const event = dayEvents[0] || {}
  const { coverImageAuthor, coverImage, slug, title } = event
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
          p: 1,
          minWidth: "4rem",
          height: "2rem",
          fontFamily: "body",
          fontSize: 0,
          bg: color,
          color: "background",
          clipPath: "polygon(0% 0%, 100% 0%, 0% 100%)",
          content: `"${dayOfMonth} ${month}"`,
        },
      }}
      {...props}
    >
      {event ? (
        <PostCard
          coverImage={coverImage}
          coverImageAuthor={coverImageAuthor}
          slug={isBeforeToday ? slug : undefined}
          title={title}
          onClick={(event) => {
            if (!isBeforeToday) {
              prompt("Sign up and we'll email you")
              event.preventDefault()
              event.stopPropagation()
            }
          }}
          sx={{
            cursor: "pointer",
            opacity: isBeforeToday ? 1 : 0.25,
          }}
        />
      ) : (
        <PostCard slug={"/signup"} />
      )}
    </Box>
  )
}

export default CalendarCard
