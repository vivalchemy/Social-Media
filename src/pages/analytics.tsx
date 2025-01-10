import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export interface AnalyticsData {
  analysis: {
    total_interactions_per_platform: {
      [key: string]: {
        total_likes: number;
        total_shares: number;
        total_comments: number;
        total_interactions: number;
      };
    };
    distribution_of_interactions_by_post_type: {
      [key: string]: {
        total_likes: number;
        total_shares: number;
        total_comments: number;
        total_interactions: number;
      };
    };
    average_interactions_per_user: {
      [key: string]: {
        average_likes: number;
        average_shares: number;
        average_comments: number;
        average_total_interactions: number;
      };
    };
  };
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Analytics= ({data}: {data: AnalyticsData | undefined}) => {
  // Sample data - replace with your actual data
  

  // Transform data for platform comparison chart
  const platformData = data ? Object.entries(data.analysis.total_interactions_per_platform).map(
    ([platform, stats]) => ({
      platform,
      likes: stats.total_likes,
      shares: stats.total_shares,
      comments: stats.total_comments
    })
  ) : [];

  // Transform data for post type distribution chart
  const postTypeData = data ? Object.entries(data.analysis.distribution_of_interactions_by_post_type).map(
    ([type, stats]) => ({
      type,
      interactions: stats.total_interactions
    })
  ) : [];

  // Transform data for user comparison chart
  const userData = data ? Object.entries(data.analysis.average_interactions_per_user).map(
    ([user, stats]) => ({
      user,
      likes: stats.average_likes,
      shares: stats.average_shares,
      comments: stats.average_comments
    })
  ) : [];

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Social Media Analytics Dashboard</h1>
      
      {/* Platform Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Performance Comparison</CardTitle>
          <CardDescription>Comparison of interactions across different platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="platform" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="likes" fill="#8884d8" />
                <Bar dataKey="shares" fill="#82ca9d" />
                <Bar dataKey="comments" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Post Type Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Post Type Distribution</CardTitle>
          <CardDescription>Total interactions by post type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={postTypeData}
                  dataKey="interactions"
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {postTypeData.map((index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* User Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>User Performance</CardTitle>
          <CardDescription>Average interactions per user</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="user" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="likes" stroke="#8884d8" />
                <Line type="monotone" dataKey="shares" stroke="#82ca9d" />
                <Line type="monotone" dataKey="comments" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;