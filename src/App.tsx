import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AccountsPage } from "./pages/AccountsPage";
import { ProfilesPage } from "./pages/ProfilePage";
import { CampaignsPage } from "./pages/CampaignsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AccountsPage />} />
        <Route path="/accounts/:accountId" element={<AccountsPage />} />
        <Route path="/profiles" element={<ProfilesPage />} />
        <Route path="/profiles/:profileId" element={<ProfilesPage />} />
        <Route path="/campaigns" element={<CampaignsPage />} />
        <Route path="/campaigns/:campaignId" element={<CampaignsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
