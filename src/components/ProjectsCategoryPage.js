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
import { globalHistory } from "@reach/router"
import { projectsTheme } from "../theme"
import PageLayout from "./PageLayout"
import CalendarCard from "./CalendarCard"
import SubscribeForm from "./SubscribeForm"
import Modal from "react-modal"
import Thanks from "../../public/content/sections/thanks.mdx"
import { useRouter } from "next/router"
import hydrate from "next-mdx-remote/hydrate"
import components from "../gatsby-plugin-theme-ui/components"

Modal.setAppElement(`#__next`)
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
    month: format(date, "MMMM", { locale }),
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

const ProjectsCategoryPage = ({ post, posts }) => {
  const { replace, query } = useRouter()
  const {
    title,
    body,
    coverImage,
    coverImageAuthor,
    coverImageLink,
    startDate,
    endDate,
    listId,
  } = post
  const days = getDays({
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    events: posts,
  })
  const [isOpen, setIsOpen] = useState(false)
  const closeModal = async () => {
    await replace({ query: { slug: post.rawSlug } }, undefined, {
      shallow: true,
    })
  }
  const signupComplete = query.thanks

  useEffect(() => {
    // Toggle modal when we have a signup in the search part of URL
    setIsOpen("signup" in query)
  }, [query])

  return (
    <PageLayout
      theme={projectsTheme}
      title={title}
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
          <Styled.h2 sx={{ mt: -2 }}>Anmeldung</Styled.h2>
          <Styled.p>
            Dieser Beitrag ist noch nicht verfügbar. Bitte melde Dich an, und
            ich schicke Dir eine Email, wenn es soweit ist.
          </Styled.p>
          <SubscribeForm listId={listId} />
        </Box>
      </Modal>

      {signupComplete && (
        <Box sx={{ my: 4 }}>
          <Thanks />
        </Box>
      )}

      {hydrate(body, { components })}

      {!signupComplete && <SubscribeForm listId={listId} />}

      <Grid
        as="ol"
        gap={[2, 1, 2]}
        columns={[2, 3]}
        sx={{ p: 0, mt: 3, mb: 4, mx: [0, 0, -5], px: [0, 0, 2] }}
      >
        {days.map((day) => (
          <Box key={day.date} as="li" sx={{ m: 0, p: 0, listStyle: "none" }}>
            <CalendarCard day={day} post={day.dayEvents[0] || {}} />
          </Box>
        ))}
      </Grid>
    </PageLayout>
  )
}

export default ProjectsCategoryPage
