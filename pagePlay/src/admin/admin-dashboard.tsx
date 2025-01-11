import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { OverviewCards } from "./overview-cards";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import {
  dummyData,
  User,
  Publisher,
  Transaction,
  ReportReview,
} from "./dummy-data";
import { UserDetailsModal } from "./modals/user-details-modal";
import { EditUserModal } from "./modals/edit-user-modal";
import { DeleteConfirmationModal } from "./modals/delete-confirmation-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { TransactionDetailsModal } from "./modals/transaction-details-modal";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

export function AdminDashboard() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState(dummyData.users);
  const [publishers, setPublishers] = useState(dummyData.publishers);
  const [transactions] = useState(dummyData.transactions);
  const [reportReviews, setReportReviews] = useState(dummyData.reportReviews);

  // Modal states
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPublisher, setSelectedPublisher] = useState<Publisher | null>(
    null
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  // Action handlers
  const handleViewDetails = (item: User | Publisher) => {
    if ("role" in item) {
      setSelectedUser(item as User);
    } else {
      setSelectedPublisher(item as Publisher);
    }
    setIsViewModalOpen(true);
  };

  const handleEdit = (item: User | Publisher) => {
    if ("role" in item) {
      setSelectedUser(item as User);
    } else {
      setSelectedPublisher(item as Publisher);
    }
    setIsEditModalOpen(true);
  };

  const handleDelete = (item: User | Publisher) => {
    if ("role" in item) {
      setSelectedUser(item as User);
    } else {
      setSelectedPublisher(item as Publisher);
    }
    setIsDeleteModalOpen(true);
  };

  const handleUpdateItem = (updatedItem: User | Publisher) => {
    if ("role" in updatedItem) {
      setUsers(
        users.map((user) =>
          user.id === updatedItem.id ? (updatedItem as User) : user
        )
      );
    } else {
      setPublishers(
        publishers.map((publisher) =>
          publisher.id === updatedItem.id
            ? (updatedItem as Publisher)
            : publisher
        )
      );
    }
    toast({
      title: "Item Updated",
      description: "Information has been successfully updated.",
    });
  };

  const handleConfirmDelete = () => {
    if (selectedUser) {
      setUsers(users.filter((user) => user.id !== selectedUser.id));
      setIsDeleteModalOpen(false);
      toast({
        title: "User Deleted",
        description: "User has been successfully deleted.",
        variant: "destructive",
      });
    } else if (selectedPublisher) {
      setPublishers(
        publishers.filter((publisher) => publisher.id !== selectedPublisher.id)
      );
      setIsDeleteModalOpen(false);
      toast({
        title: "Publisher Deleted",
        description: "Publisher has been successfully deleted.",
        variant: "destructive",
      });
    }
  };

  const handleTransactionAction = (
    action: string,
    transaction: Transaction
  ) => {
    if (action === "view") {
      setSelectedTransaction(transaction);
      setIsTransactionModalOpen(true);
    } else if (action === "download") {
      // Implement receipt download logic here
      console.log("Downloading receipt for transaction:", transaction.id);
      toast({
        title: "Receipt Downloaded",
        description: `Receipt for transaction ${transaction.id} has been downloaded.`,
      });
    }
  };

  // Filter data based on search term
  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const filteredPublishers = publishers.filter((publisher) =>
    Object.values(publisher).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const filteredTransactions = transactions.filter((transaction) =>
    Object.values(transaction).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const filteredReportReviews = reportReviews.filter((review) =>
    Object.values(review).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleReportAction = (action: string, report: ReportReview) => {
    console.log(`${action} report:`, report);
    let updatedReports = [...reportReviews];
    let toastMessage = "";

    switch (action) {
      case "resolve":
        updatedReports = reportReviews.map((r) =>
          r.id === report.id ? { ...r, status: "resolved" } : r
        );
        toastMessage = `Report ${report.id} has been resolved.`;
        break;
      case "escalate":
        updatedReports = reportReviews.map((r) =>
          r.id === report.id ? { ...r, status: "escalated" } : r
        );
        toastMessage = `Report ${report.id} has been escalated.`;
        break;
      case "dismiss":
        updatedReports = reportReviews.map((r) =>
          r.id === report.id ? { ...r, status: "dismissed" } : r
        );
        toastMessage = `Report ${report.id} has been dismissed.`;
        break;
      case "suspend3":
        toastMessage = `User reported in ${report.id} has been suspended for 3 days.`;
        break;
      case "suspend7":
        toastMessage = `User reported in ${report.id} has been suspended for 7 days.`;
        break;
      case "ban":
        toastMessage = `User reported in ${report.id} has been permanently banned.`;
        break;
      default:
        toastMessage = `Action ${action} performed on report ${report.id}.`;
    }

    setReportReviews(updatedReports);
    toast({
      title: "Report Action",
      description: toastMessage,
    });
  };

  const handleLogout = () => {
    // Implement logout logic here
    navigate("/");
    console.log("User logged out");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-8 w-[200px] lg:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
      <OverviewCards
        totalUsers={users.length}
        totalPublishers={publishers.length}
        totalTransactions={transactions.length}
        totalReports={reportReviews.length}
      />
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="publishers">Publishers</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="space-y-4">
          <div className="rounded-md border bg-[#E5EADD] p-4">
            <DataTable
              columns={columns.users(
                handleViewDetails,
                handleEdit,
                handleDelete
              )}
              data={filteredUsers}
            />
          </div>
        </TabsContent>
        <TabsContent value="publishers" className="space-y-4">
          <div className="rounded-md border bg-[#E5EADD] p-4">
            <DataTable
              columns={columns.publishers(
                handleViewDetails,
                handleEdit,
                handleDelete
              )}
              data={filteredPublishers}
            />
          </div>
        </TabsContent>
        <TabsContent value="transactions" className="space-y-4">
          <div className="rounded-md border bg-[#E5EADD] p-4">
            <DataTable
              columns={columns.transactions().map((column) =>
                column.id === "actions"
                  ? {
                      ...column,
                      cell: ({ row }: { row: { original: Transaction } }) => (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() =>
                                handleTransactionAction("view", row.original as Transaction)
                              }
                            >
                              View details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleTransactionAction(
                                  "download",
                                  row.original as Transaction
                                )
                              }
                            >
                              Download receipt
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ),
                    }
                  : column
              )}
              data={filteredTransactions}
            />
          </div>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <div className="rounded-md border bg-[#E5EADD] p-4">
            <DataTable
              columns={columns.reportReviews.map((column: ColumnDef<{ id: string; content: string; reportedItemType: string; reportedItemId: string; reporterName: string; reporterEmail: string; status: string; date: string; severity: string; }, unknown>) =>
                column.id === "actions"
                  ? {
                      ...column,
                      cell: ({ row }: { row: { original: ReportReview } }) => (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() =>
                                handleReportAction("view", row.original as ReportReview)
                              }
                            >
                              View details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() =>
                                handleReportAction("resolve", row.original as ReportReview)
                              }
                            >
                              Mark as resolved
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleReportAction("escalate", row.original as ReportReview)
                              }
                            >
                              Escalate
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleReportAction("dismiss", row.original as ReportReview)
                              }
                            >
                              Dismiss
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() =>
                                handleReportAction("suspend3", row.original as ReportReview)
                              }
                            >
                              Suspend user for 3 days
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleReportAction("suspend7", row.original as ReportReview)
                              }
                            >
                              Suspend user for 7 days
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleReportAction("ban", row.original as ReportReview)
                              }
                              className="text-red-600"
                            >
                              Ban user
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ),
                    }
                  : column
              )}
              data={filteredReportReviews}
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <UserDetailsModal
        user={selectedUser}
        isOpen={isViewModalOpen && selectedUser !== null}
        onClose={() => setIsViewModalOpen(false)}
      />
      <EditUserModal
        user={selectedUser}
        isOpen={isEditModalOpen && selectedUser !== null}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUpdateItem}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title={selectedUser ? "Delete User" : "Delete Publisher"}
        description={`Are you sure you want to delete this ${
          selectedUser ? "user" : "publisher"
        }? This action cannot be undone.`}
      />
      <TransactionDetailsModal
        transaction={selectedTransaction}
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
      />
    </div>
  );
}

export default AdminDashboard;