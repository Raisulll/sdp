'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Download, Filter, ArrowUpDown } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react"
import Navbar from "@/components/adminnavbar";
interface Transaction {
  id: string
  user: {
    name: string
    avatar: string
  }
  transactionId: string
  amount: number
  date: string
  time: string
  paymentMethod: {
    type: 'visa' | 'mastercard' | 'paypal' | 'other'
    icon: string
  }
  status: 'completed' | 'pending' | 'failed'
}

const transactions: Transaction[] = [
  {
    id: '1',
    user: {
      name: 'Arif Abdullah',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    transactionId: 'TX377D157',
    amount: 10.32,
    date: '17 Sep 2023',
    time: '10:34 AM',
    paymentMethod: {
      type: 'visa',
      icon: '/placeholder.svg?height=30&width=30'
    },
    status: 'completed'
  },
  {
    id: '2',
    user: {
      name: 'Joydib Roy',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    transactionId: 'TX377D122',
    amount: 3.24,
    date: '17 Sep 2023',
    time: '10:34 AM',
    paymentMethod: {
      type: 'mastercard',
      icon: '/placeholder.svg?height=30&width=30'
    },
    status: 'completed'
  },
  {
    id: '3',
    user: {
      name: 'Kabbo Sarker',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    transactionId: 'TX377Dc54',
    amount: 4.35,
    date: '17 Sep 2023',
    time: '10:34 AM',
    paymentMethod: {
      type: 'paypal',
      icon: '/placeholder.svg?height=30&width=30'
    },
    status: 'completed'
  }
]

export default function TransactionsPage() {
  const [dateRange, setDateRange] = useState<string>('all')
  const [paymentMethod, setPaymentMethod] = useState<string>('all')

  const totalTransactions = transactions.reduce((sum, t) => sum + t.amount, 0)

  return (
    <>
      <Navbar /> 
    <div className="min-h-screen bg-[#E5EADD] pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-2xl font-bold text-[#265073]">
                  Transactions History
                </CardTitle>
                <CardDescription>
                  View and manage your transaction history
                </CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" className="hidden md:flex">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Input 
                    type="search" 
                    placeholder="Search by name or transaction ID..." 
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-4">
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Methods</SelectItem>
                      <SelectItem value="visa">Visa</SelectItem>
                      <SelectItem value="mastercard">Mastercard</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-[#265073]">
                      ${totalTransactions.toFixed(2)}
                    </div>
                    <p className="text-sm text-gray-500">Total Transactions</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-[#265073]">
                      {transactions.length}
                    </div>
                    <p className="text-sm text-gray-500">Number of Transactions</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-green-600">
                      {transactions.filter(t => t.status === 'completed').length}
                    </div>
                    <p className="text-sm text-gray-500">Successful</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-red-600">
                      {transactions.filter(t => t.status === 'failed').length}
                    </div>
                    <p className="text-sm text-gray-500">Failed</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500">
              <div className="col-span-5 md:col-span-4">User</div>
              <div className="col-span-4 md:col-span-3">Transaction ID</div>
              <div className="hidden md:block md:col-span-2">Payment</div>
              <div className="col-span-3 flex items-center justify-end">
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  Amount
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {transactions.map((transaction) => (
            <div 
              key={transaction.id}
              className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
            >
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-5 md:col-span-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={transaction.user.avatar} alt={transaction.user.name} />
                      <AvatarFallback>{transaction.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-[#265073]">{transaction.user.name}</div>
                      <div className="text-sm text-gray-500">
                        {transaction.date} at {transaction.time}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-4 md:col-span-3">
                  <div className="text-sm font-medium">{transaction.transactionId}</div>
                </div>
                <div className="hidden md:block md:col-span-2">
                  <div className="flex items-center gap-2">
                    <img 
                      src={transaction.paymentMethod.icon} 
                      alt={transaction.paymentMethod.type}
                      className="w-8 h-8 object-contain"
                    />
                    <span className="text-sm capitalize">{transaction.paymentMethod.type}</span>
                  </div>
                </div>
                <div className="col-span-3 text-right">
                  <div className="font-medium text-[#265073]">
                    ${transaction.amount.toFixed(2)}
                  </div>
                  <div className="text-sm text-green-600">Completed</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

