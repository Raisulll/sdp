import { Card, CardContent } from "@/components/ui/card"

interface User {
  id: number
  name: string
  email: string
  image: string
}

interface UserCardProps {
  user: User
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 h-24 w-24 overflow-hidden rounded-full">
            <img
              alt={`${user.name}'s profile`}
              className="h-full w-full object-cover"
              height={96}
              src={user.image}
              width={96}
            />
          </div>
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </CardContent>
    </Card>
  )
}

