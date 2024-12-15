import "./App.css";
import { AppSidebar } from "./components/app-sidebar";
import Appbar from "./components/Appbar";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return <>
    <ThemeProvider>
      <main className="flex">
          <Appbar/>
          <AppSidebar/>
      </main>
  </ThemeProvider>

  </>;
}

export default App;
