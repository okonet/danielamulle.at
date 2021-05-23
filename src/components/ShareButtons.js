/** @jsx jsx */
import { Box, Button, Grid, jsx, Styled } from "theme-ui"
import PrintIcon from "./PrintIcon"
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share"

const ShareButtons = ({ pageUrl, title }) => {
  return (
    <Box
      as="nav"
      sx={{
        my: 3,
        "@media print": {
          display: "none",
        },
      }}
    >
      <Styled.h3>Teilen</Styled.h3>
      <Grid
        gap={1}
        sx={{
          gridAutoFlow: "column",
          alignItems: "start",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="print"
          title="Seite drucken"
          sx={{ mt: "1px" }}
          onClick={() => {
            if (typeof window !== "undefined") {
              window.print()
            }
          }}
        >
          <PrintIcon />
        </Button>
        <EmailShareButton url={pageUrl} subject={title}>
          <EmailIcon round size={32} />
        </EmailShareButton>
        <FacebookShareButton url={pageUrl} quote={title}>
          <FacebookIcon round size={32} />
        </FacebookShareButton>
        <TwitterShareButton url={pageUrl} title={title}>
          <TwitterIcon round size={32} />
        </TwitterShareButton>
        <WhatsappShareButton url={pageUrl} title={title}>
          <WhatsappIcon round size={32} />
        </WhatsappShareButton>
      </Grid>
    </Box>
  )
}

export default ShareButtons
