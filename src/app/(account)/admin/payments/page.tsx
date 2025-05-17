export const dynamic = "force-dynamic"; // Garante que SEMPRE busque os dados do banco

import { DataTable } from "../../_components/data-table";
import { columns } from "./_components/columns";
import { getPayment } from "./_data/getPayment";

const PaymentsPage = async () => {
  const payment = await getPayment();

  return ( 
    <div className="flex flex-1 flex-col gap-4 overflow-hidden p-4 pt-10">
      <DataTable
        columns={columns}
        data={payment.payments}
        length={payment.payments.length}
        titleFound="Pagamentos"
        placeholder="Buscar Pedido/CPF..."
        filterableColumns={["order", "customer_cpf"]}
      />
    </div>
  );
}
 
export default PaymentsPage;