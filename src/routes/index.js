import BookRoutes from "./books-routes.js";
import NoteRoutes from "./notes-routes.js";

const Routes = [...BookRoutes, ...NoteRoutes];

export default Routes;