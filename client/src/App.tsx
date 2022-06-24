import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AuthContextProvider } from "./context/AuthContext";
import AppRouter from "./routes/AppRouter";
import { LocalizationProvider } from "@mui/x-date-pickers";

import "./App.css";
const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <AppRouter />
          </AuthContextProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </LocalizationProvider>
    </div>
  );
}

export default App;
