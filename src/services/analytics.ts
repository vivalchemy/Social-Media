import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
})

export interface EngagementData {
  postType: string
  likes: number
  shares: number
  comments: number
  date: string
}

export interface PostPerformance {
  postType: string
  averageEngagement: number
  totalPosts: number
}

export const analyticsService = {
  async getEngagementData(): Promise<EngagementData[]> {
    const { data } = await api.get('/engagement')
    return data
  },

  async getPostPerformance(): Promise<PostPerformance[]> {
    const { data } = await api.get('/performance')
    return data
  }
}

