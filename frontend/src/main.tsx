import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./pages/Signin.tsx";
import App from "./App.tsx";
import Code from "./pages/code.tsx";
import { SidebarProvider } from "./components/ui/sidebar.tsx";
import GetProjectDetails from "./components/Project-Details.tsx";
import {
  RecoilRoot
} from 'recoil';
import { AuthProvider } from "./components/AuthProvider.tsx";


const routes = createBrowserRouter([
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/",
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    )
  },

  {
    path: 'newproject',
    element: <GetProjectDetails />
  },

  {
    path: '/:projectId',
    element: (
      <AuthProvider>
        <Code />
      </AuthProvider>
    )
  }
]);


createRoot(document.getElementById("root")!).render(
  <>
    <RecoilRoot>
      <SidebarProvider>
        <RouterProvider router={routes} />
      </SidebarProvider>
    </RecoilRoot>
  </>
);
