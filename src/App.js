import { BrowserRouter } from "react-router-dom";
import Routers from "./routes/Routes";
import ThemeProvider from './components/theme'
import { useEffect } from "react";
import { getAccessToken } from "./api/user";
import Swal from "sweetalert2";

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
