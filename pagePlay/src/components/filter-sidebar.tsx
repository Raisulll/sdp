import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function FilterSidebar() {
  const filters = [
    "Age",
    "Occupation",
    "Newest",
    "Frequently Login",
    "Most Purchase",
    "Country",
  ]

  return (
    <Card className="h-fit w-64 bg-[#FAF7F2]">
      <CardContent className="p-6">
        <h3 className="mb-4 text-lg font-semibold">Filter By</h3>
        <div className="space-y-2">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant="ghost"
              className="w-full justify-start font-normal"
            >
              {filter}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

