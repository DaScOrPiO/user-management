import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./components/authentication";
import All_users from "./components/users/all_users";
import No_page from "./components/no_page";
import Layout from "./components/general/layout";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Index />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<All_users />} />
            <Route path="*" element={<No_page />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
