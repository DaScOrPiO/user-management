import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./components/authentication";
import All_users from "./components/users/all_users";
import No_page from "./components/no_page";
import Layout from "./components/general/layout";

function App() {
  const cookie = localStorage.getItem("active");
  return (
    <Router>
      <Routes>
        {!cookie ? (
          <Route path="/auth" element={<Index />} />
        ) : (
          <Route path="/" element={<Layout />}>
            <Route index element={<All_users />} />
          </Route>
        )}
        <Route path="*" element={<No_page />} />
      </Routes>
    </Router>
  );
}

export default App;
