import { useNavigate } from "react-router-dom";

import { ACCOUNTS_DATA } from "../../constants/main";
import { Table } from "../../components/Table";

const accountColumns = [
  { label: "Accound Id", key: "accountId" },
  { label: "Email", key: "email" },
  { label: "Auth Token", key: "authToken" },
  { label: "Creation Date", key: "creationDate" },
];

export const AccountsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRowClick = (accountId: string) => {
    navigate(`/profiles/${accountId}`);
  };

  return (
    <div>
      <h2>Accounts</h2>
      <Table
        columns={accountColumns}
        data={ACCOUNTS_DATA}
        onRowClick={handleRowClick}
      />
    </div>
  );
};
