import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar";
import { ThemeContext } from "./store/Theme";
import { useContext } from "react";

function App() {
  // const { backgroundTheme } = useContext(ThemeContext);

  return (
    <Box minH={"100vh"} paddingTop={"25px"}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App;
