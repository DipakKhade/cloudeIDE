import "./App.css";
import { AppSidebar } from "./components/app-sidebar";
import Appbar from "./components/Appbar";

function App() {
  return <>
  <main className="flex">
  <AppSidebar/>
  <Appbar/>
  </main>

  </>;
}

export default App;
