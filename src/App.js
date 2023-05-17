import { BrowserRouter } from "react-router-dom";
import Routers from "./routes/Routes";
import ThemeProvider from "./components/theme";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routers />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
