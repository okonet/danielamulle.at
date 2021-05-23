import React from "react"
import { Text } from "theme-ui"
import Link from "../components/Link"
import PageLayout from "../components/PageLayout"

const NotFoundPage = () => (
  <PageLayout title="Seite nicht gefunden" shouldShowSubscribe={false}>
    <Text as="p" sx={{ variant: "textStyles.lead", color: "secondary" }}>
      😢 Die Seite existiert nicht. <Link href="/">Zur Startseite</Link>
    </Text>
  </PageLayout>
)

export default NotFoundPage
