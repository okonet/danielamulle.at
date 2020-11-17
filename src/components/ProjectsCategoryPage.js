/* @jsx jsx */
import React, { useEffect, useState } from "react"
import { Box, Close, Grid, jsx, Styled } from "theme-ui"
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
import { globalHistory, navigate } from "@reach/router"
import { projectsTheme } from "../theme"
import PageLayout from "./PageLayout"
import CalendarCard from "./CalendarCard"
import SubscribeForm from "./SubscribeForm"
import Modal from "react-modal"
import Thanks from "../../content/sections/thanks.mdx"

Modal.setAppElement(`#___gatsby`)
Modal.defaultStyles.overlay.zIndex = 2

const modalStyles = {
  content: {
    padding: 0,
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    boxShadow: "0px 4px 16px rgba(25, 25, 25, 0.075)",
  },
}

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

const ProjectsCategoryPage = ({ data, location }) => {
  const { category, projectPosts } = data
  const {
    coverImage,
    coverImageAuthor,
    coverImageLink,
    startDate,
    endDate,
    description,
    listId,
  } = category
  const days = getDays({
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    events: projectPosts.nodes,
  })
  const [isOpen, setIsOpen] = useState(false)
  const closeModal = () => {
    navigate(location.pathname, { replace: true })
    setIsOpen(false)
  }
  const signupComplete = location.search.includes("thanks")

  useEffect(() => {
    return globalHistory.listen(({ location }) => {
      // Show a modal when we have a signup in the search part of URL
      if (location.search.includes("signup")) {
        setIsOpen(true)
      }
    })
  }, [])

  return (
    <PageLayout
      theme={projectsTheme}
      title={`${category.id}`}
      shouldShowSubscribe={false}
      coverImage={coverImage}
      coverImageAuthor={coverImageAuthor}
      coverImageLink={coverImageLink}
    >
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        shouldCloseOnOverlayClick={true}
      >
        <Box
          sx={{
            position: "relative",
            p: 4,
            bg: "sectionBg",
            border: "thick",
            borderColor: "secondary",
            borderRadius: "medium",
          }}
        >
          <Close
            onClick={closeModal}
            sx={{ position: "absolute", top: 8, right: 8, color: "secondary" }}
          />
          <Styled.h2 sx={{ mt: -2 }}>Newsletter</Styled.h2>
          <Styled.p>
            Diese Seite ist noch nicht verfügbar. Bitte trage Dich ein und ich
            schicke Dir eine Email wenn es ist soweit.
          </Styled.p>
          <SubscribeForm listId={listId} />
        </Box>
      </Modal>

      {signupComplete && (
        <Box sx={{ my: 4 }}>
          <Thanks />
        </Box>
      )}

      <MDXRenderer>{description}</MDXRenderer>

      {!signupComplete && <SubscribeForm listId={listId} />}

      <Grid gap={2} columns={[2, 3, 4]} sx={{ my: 4, mx: [2, 0, -4], p: 0 }}>
        {days.map((day) => (
          <CalendarCard day={day} key={day.date} />
        ))}
      </Grid>
    </PageLayout>
  )
}

export default ProjectsCategoryPage
