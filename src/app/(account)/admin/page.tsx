export const dynamic = "force-dynamic"; // Garante que SEMPRE busque os dados do banco

import { DataTable } from "../_components/data-table";
import { columns } from "./_components/columns";
import { getCustomer } from "./_data/get-customer";

const AdminPage = async () => {
  const users = await getCustomer();

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-hidden p-4 pt-10">
      <DataTable
        columns={columns}
        data={users.users}
        length={users.users.length}
        titleFound="Clientes"
        placeholder="Buscar Nome/CPF..."
        filterableColumns={["name", "cpf"]}
      />
    </div>
  );
};

export default AdminPage;
