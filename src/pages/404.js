import React from "react"
import { Box, Container, Flex, jsx, Styled, Text } from "theme-ui"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Link from "../components/Link"
import { recipesPath } from "../../paths"
import PageLayout from "../components/PageLayout"

const NotFoundPage = () => (
  <PageLayout title="Seite nicht gefunden">
    <Text as="p" sx={{ variant: "textStyles.lead", color: "secondary" }}>
      😢 Die Seite existiert nicht. <Link to="/">Zur Startseite</Link>
    </Text>
  </PageLayout>
)

export default NotFoundPage
