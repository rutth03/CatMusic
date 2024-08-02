import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Router from "./routes/Router";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
      <RouterProvider router={Router} />
    </AuthProvider>
);