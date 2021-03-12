import dynamic from "next/dynamic"

const CMS = dynamic(
  () =>
    import("netlify-cms-app").then((cms) => {
      import("@ncwidgets/file-relation").then((widget) => {
        console.log(widget)
        const { Control, Preview } = widget
        cms.registerWidget("file-relation", Control, Preview)
        cms.init()
      })
    }),
  { ssr: false, loading: () => <p>Loading CMS...</p> }
)

function AdminPage() {
  return <CMS />
}
export default AdminPage
