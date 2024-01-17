import React from "react";
import { useNavigate } from "react-router-dom";

import { PROFILES_DATA } from "../../constants/main";
import { Table } from "../../components/Table";

const profilesColumns = [
  { label: "Profile Id", key: "profileId" },
  { label: "Country", key: "country" },
  { label: "Marketplace", key: "marketplace" },
];

export const ProfilesPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRowClick = (profileId: string) => {
    navigate(`/campaigns/${profileId}`);
  };

  return (
    <div>
      <h2>Profiles</h2>
      <Table
        columns={profilesColumns}
        data={PROFILES_DATA}
        onRowClick={handleRowClick}
      />
    </div>
  );
};
