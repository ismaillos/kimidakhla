import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

function Spinner({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center justify-center", className)} {...props}>
      <Loader2 className="h-4 w-4 animate-spin" />
    </div>
  )
}

export { Spinner }
