

import NavBar from './components/Navbar';
import ReferencesPage from './components/ReferencesPage.js';
import AnalyzerPage from './components/AnalyzerPage.js';
import HomePage from './components/HomePage.js';
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  const queryClient = new QueryClient();
  return (
    <div>
      <HashRouter basename="/">
          <div className="App">
            <QueryClientProvider client={queryClient}>
              <NavBar> </NavBar>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/analyze" element={<AnalyzerPage />} />
                <Route path="/references" element={<ReferencesPage />} />
              </Routes>
            </QueryClientProvider>
          </div>
        </HashRouter>
  </div>
);
}

export default App;

