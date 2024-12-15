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
import Signup from "./pages/Signup.tsx";
import { AllProjects } from "./components/AllProjects.tsx";


const routes = createBrowserRouter([
  {
    path: '/signup',
    element: <Signup />
  },
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
    path:"/allprojects",
    element:<AllProjects/>
  },

  {
    path: 'newproject',
    element: <GetProjectDetails />
  },

  {
    path: '/project',
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
