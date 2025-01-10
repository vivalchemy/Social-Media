import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { BackgroundGradient } from '@/components/ui/background-gradient'
import { TracingBeam } from '@/components/ui/tracing-beam'
import { Badge } from "@/components/ui/badge"

interface UserEngagement {
  username: string
  performance_rank: number
  best_platform: string
  total_engagement: {
    likes: number
    shares: number
    comments: number
  }
}

export interface ResponseData {
  users: UserEngagement[]
}

export function Dashboard({response}: {response: ResponseData | undefined}) {
  console.log(response)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    if (response) {
      setLoading(false)
    }
  }, [response])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-lg">Loading analytics...</div>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="p-6 bg-red-50">
        <div className="text-red-500 font-medium">Error: {error}</div>
      </Card>
    )
  }

  if (!response) {
    return (
      <Card className="p-6">
        <div className="text-gray-500">No data available</div>
      </Card>
    )
  }

  return (
    <TracingBeam>
      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Social Media Performance Rankings</h2>
          
          <div className="grid gap-6">
            {response.users.map((user) => {
              const totalEngagement = 
                user.total_engagement.likes + 
                user.total_engagement.shares + 
                user.total_engagement.comments
              
              return (
                <motion.div
                  key={user.username}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <BackgroundGradient>
                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-bold">{user.username}</h3>
                          <Badge variant="secondary">Rank #{user.performance_rank}</Badge>
                          <Badge>{user.best_platform}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Total Engagement: {totalEngagement.toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 rounded-lg bg-secondary">
                          <div className="text-sm font-medium mb-1">Likes</div>
                          <div className="text-2xl font-bold">
                            {user.total_engagement.likes.toLocaleString()}
                          </div>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-secondary">
                          <div className="text-sm font-medium mb-1">Shares</div>
                          <div className="text-2xl font-bold">
                            {user.total_engagement.shares.toLocaleString()}
                          </div>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-secondary">
                          <div className="text-sm font-medium mb-1">Comments</div>
                          <div className="text-2xl font-bold">
                            {user.total_engagement.comments.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </BackgroundGradient>
                </motion.div>
              )
            })}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Performance Summary</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Top Performer: {response.users[0].username} on {response.users[0].best_platform}</p>
            <p>Total Users Analyzed: {response.users.length}</p>
            <p>Platforms: {Array.from(new Set(response.users.map(u => u.best_platform))).join(', ')}</p>
          </div>
        </Card>
      </div>
    </TracingBeam>
  );
}