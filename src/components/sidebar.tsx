import { BarChart3, Home, icons, Users, Bot } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useNavigate, useLocation } from 'react-router-dom'

const sidebarNavItems = [
  {
    title: "Overview",
    icon: Home,
    href: "/",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
  {
    // chatbot
    title: "Chatbot",
    icon: Bot,
    href: "/chatbot",
  }
]

export function Sidebar() {
  let navigate = useNavigate()
  let location = useLocation()
  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <span className="font-bold">Social Insights</span>
        </div>
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-1 py-2">
            {sidebarNavItems.map((item) => (
              <Button
                key={item.href}
                onClick={() => navigate(item.href)}
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  item.href === location.pathname && "bg-muted"
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

