import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./pages/Signin.tsx";
import App from "./App.tsx";
import Code from "./pages/code.tsx";
import Projects from "./pages/Projects.tsx";
import { SidebarProvider } from "./components/ui/sidebar.tsx";
import GetProjectDetails from "./components/Project-Details.tsx";

const routes = createBrowserRouter([
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/",
    element: <App />,
  },
  // {
  //   path: "/code",
  //   element: <Code />,
  // },
  // {
  //   path: "/:userId",
  //   element: <Projects />,
  // },


  // ---------------------
  {
    path:'newproject',
    element:<GetProjectDetails/>
  },

  {
    path:'/:projectId',
    element:<Code/>
  }
]);

createRoot(document.getElementById("root")!).render(
  <>
  <SidebarProvider>
    <RouterProvider router={routes} />
    </SidebarProvider>
  </>
);
