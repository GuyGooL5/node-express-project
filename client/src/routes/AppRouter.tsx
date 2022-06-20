import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginRoute from "./LoginRoute";

interface AppRouterProps {}

const AppRouter = (props: AppRouterProps) => (
  <div>
    <Router>
      <Routes>
        <Route path="/" element={<LoginRoute />} />
      </Routes>
    </Router>
  </div>
);

export default AppRouter;
