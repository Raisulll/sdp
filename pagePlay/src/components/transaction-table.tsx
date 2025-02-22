import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Transaction } from "@/types/blog";

interface TransactionTableProps {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  console.log("transactions", transactions);

  // Generates a unique transaction id using the transaction id and its timestamp.
  const generateUniqueTransactionId = (id: string, dateString: string) => {
    const timestamp = new Date(dateString).getTime();
    return `${id}-${timestamp}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);
    return `${day} ${month}, ${year}`;
  };

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Transaction ID</TableHead>
            <TableHead>Book Name</TableHead>
            <TableHead>Publisher</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => {
            const uniqueId = generateUniqueTransactionId(
              transaction.id,
              transaction.timestamp
            );
            return (
              <TableRow key={uniqueId}>
                <TableCell >{uniqueId}</TableCell>
                <TableCell>{transaction.title}</TableCell>
                <TableCell>{transaction.name}</TableCell>
                <TableCell>{formatDate(transaction.timestamp)}</TableCell>
                <TableCell className="text-right">
                  ৳{transaction.price}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
