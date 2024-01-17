import React from "react";

import { CAMPAIGNS_DATA } from "../../constants/main.js";
import { Table } from "../../components/Table";

const campaignsColumns = [
  { label: "Campaign Id", key: "campaignId" },
  { label: "Clicks", key: "clicks" },
  { label: "Cost", key: "cost" },
  { label: "Date", key: "date" },
];

export const CampaignsPage: React.FC = () => {
  return (
    <div>
      <h2>Campaigns</h2>
      <Table columns={campaignsColumns} data={CAMPAIGNS_DATA} />
    </div>
  );
};
