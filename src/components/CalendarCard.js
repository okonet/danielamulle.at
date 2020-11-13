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

function CalendarCard({ day, openModal, ...props }) {
  const { dayOfMonth, dayEvents, isSameMonth } = day
  const event = dayEvents[0] || {}
  const { coverImageAuthor, coverImage, slug, title } = event
  const isBeforeToday = isBefore(day.date, new Date())
  const borderColor = isSameMonth ? (day.isToday ? "accent" : "text") : "muted"
  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: "medium",
        overflow: "hidden",
        boxShadow: "float",
        bg: borderColor,
        borderColor,
        "::after": {
          position: "absolute",
          top: 0,
          left: 0,
          p: 1,
          minWidth: "2.125rem",
          height: "2.125rem",
          fontFamily: "body",
          fontSize: 0,
          bg: borderColor,
          color: "background",
          clipPath: "polygon(0% 0%, 100% 0%, 0% 100%)",
          content: `"${dayOfMonth}"`,
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
            if (!isBeforeToday) openModal()
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
