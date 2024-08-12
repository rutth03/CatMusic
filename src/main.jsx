import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Router from "./routes/Router";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  /* Punto de entrada a la aplicación. La aplición es envuelta por un proveedor de autenticación. */
      <AuthProvider>
        <RouterProvider router={Router} />
      </AuthProvider>
);