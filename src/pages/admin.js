import Head from "next/head"
import dynamic from "next/dynamic"

// import config from "../cms/config"
// import CMS from "netlify-cms-app"
// import { Control, Preview } from "@ncwidgets/file-relation"
const CMS = dynamic(
  () =>
    import("netlify-cms-app").then((cms) => {
      cms.init()
    }),
  { ssr: false, loading: () => <p>Loading...</p> }
)

// CMS.registerWidget("file-relation", Control, Preview)

function AdminPage() {
  return (
    <>
      <CMS />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (window.netlifyIdentity) {
            window.netlifyIdentity.on("init", user => {
            console.log(user)
                if (!user) {
                    window.netlifyIdentity.on("login", () => {
                        document.location.href = "/admin/";
                    });
                }
            });
        `,
        }}
      />
    </>
  )
}
export default AdminPage
