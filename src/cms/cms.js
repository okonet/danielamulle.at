/**
 * The default export of `netlify-cms-app` is an object with all of the Netlify CMS
 * extension registration methods, such as `registerWidget` and
 * `registerPreviewTemplate`.
 */
import CMS from "netlify-cms-app"
import { IngredientListWidget } from "./IngredientList"
import { Control, Preview } from "@ncwidgets/file-relation"

/**
 * Register the imported widget:
 */
CMS.registerWidget("ingredientList", IngredientListWidget)
CMS.registerWidget("file-relation", Control, Preview)
