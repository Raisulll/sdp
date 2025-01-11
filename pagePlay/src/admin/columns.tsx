import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Publisher, ReportReview, Transaction, User } from "./dummy-data";

export const columns = {
  users: (
    onView: (user: User) => void,
    onEdit: (user: User) => void,
    onDelete: (user: User) => void
  ): ColumnDef<User>[] => [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant={
            row.original.status === "Active"
              ? "default"
              : row.original.status === "Inactive"
              ? "secondary"
              : "destructive"
          }
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "joinDate",
      header: "Join Date",
    },
    {
      accessorKey: "lastLogin",
      header: "Last Login",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onView(user)}>
                View details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onEdit(user)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(user)}
                className="text-red-600"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ],

  publishers: (
    onView: (publisher: Publisher) => void,
    onEdit: (publisher: Publisher) => void,
    onDelete: (publisher: Publisher) => void
  ): ColumnDef<Publisher>[] => [
    {
      accessorKey: "name",
      header: "Publisher Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant={
            row.original.status === "Active"
              ? "default"
              : row.original.status === "Inactive"
              ? "secondary"
              : "destructive"
          }
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "joinDate",
      header: "Join Date",
    },
    {
      accessorKey: "lastLogin",
      header: "Last Login",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const publisher = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onView(publisher)}>
                View details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(publisher)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(publisher)}
                className="text-red-600"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ],

  transactions: (): ColumnDef<Transaction>[] => [
    {
      accessorKey: "id",
      header: "Transaction ID",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        return <div>${row.original.amount.toFixed(2)}</div>;
      },
    },
    {
      accessorKey: "userName",
      header: "User Name",
    },
    {
      accessorKey: "publisherName",
      header: "Publisher Name",
    },
    {
      accessorKey: "bookTitle",
      header: "Book",
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const transaction = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => console.log("View details", transaction)}
              >
                View details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => console.log("Download receipt", transaction)}
              >
                Download receipt
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ],

  reportReviews: [
    {
      accessorKey: "id",
      header: "Report ID",
    },
    {
      accessorKey: "reportedItemType",
      header: "Type",
    },
    {
      accessorKey: "content",
      header: "Report Content",
      cell: ({ row }) => (
        <div className="max-w-[300px] truncate">{row.original.content}</div>
      ),
    },
    {
      accessorKey: "severity",
      header: "Severity",
      cell: ({ row }) => (
        <Badge
          variant={
            row.original.severity === "high"
              ? "destructive"
              : row.original.severity === "medium"
              ? "secondary"
              : "default"
          }
        >
          {row.original.severity}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant={
            row.original.status === "resolved"
              ? "default"
              : row.original.status === "under_review"
              ? "secondary"
              : "destructive"
          }
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "date",
      header: "Date Reported",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const report = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => console.log("View details", report)}
              >
                View details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => console.log("Mark as resolved", report)}
              >
                Mark as resolved
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log("Escalate", report)}>
                Escalate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log("Dismiss", report)}>
                Dismiss
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => console.log("Suspend user for 3 days", report)}
              >
                Suspend user for 3 days
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => console.log("Suspend user for 7 days", report)}
              >
                Suspend user for 7 days
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => console.log("Ban user", report)}
                className="text-red-600"
              >
                Ban user
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ] as ColumnDef<ReportReview>[],
};
