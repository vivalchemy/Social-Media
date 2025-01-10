import { DashboardLayout } from "./layouts/dashboard-layout";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Dashboard, ResponseData } from "./pages/dashboard";
import { Analytics } from "./pages/analytics";
import { Audience } from "./pages/audience";
import { Settings } from "./pages/settings";
import { ThemeProvider } from "./Themes/theme-provider";
import { Chatbot } from "./pages/chatbot";
import { useEffect, useState } from "react";
import { processMessage } from "./lib/chat_with_db";


const dashboardPrompt = `
Give the data for all users seperated by platform. Rank the users based on the analysis. Only give the data in json without formatting it in any way. don't even specify that it is json in the codeblock

Output Format:
{
  "users": [
    {
      "username": "string",  // The user's unique identifier
      "performance_rank": "integer",  // Rank based on total engagement
      "best_platform": "string",  // Platform with the highest total engagement
      "total_engagement": {
        "likes": "integer",  // Total likes for the user across all platforms
        "shares": "integer",  // Total shares for the user across all platforms
        "comments": "integer"  // Total comments for the user across all platforms
      }
    }
    // Repeat for each user
  ],
}

For example the output can be like:
{
  "users": [
    {
      "username": "user1",
      "performance_rank": 1,
      "best_platform": "Instagram",
      "total_engagement": {
        "likes": 1200,
        "shares": 300,
        "comments": 450
      }
    },
    {
      "username": "user2",
      "performance_rank": 2,
      "best_platform": "Twitter",
      "total_engagement": {
        "likes": 900,
        "shares": 200,
        "comments": 300
      }
    },
    {
      "username": "user3",
      "performance_rank": 3,
      "best_platform": "Facebook",
      "total_engagement": {
        "likes": 700,
        "shares": 150,
        "comments": 250
      }
    }
  ],
}
`

const App = () => {
  const [error, setError] = useState<string | null>(null)
  const [dashboardResponse, setdashboardResponse] = useState<ResponseData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardResponse = await processMessage(dashboardPrompt);
        setdashboardResponse(JSON.parse(dashboardResponse));
        // setData(JSON.parse(response))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      }
    }

    fetchData();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      ),
      children: [
        {
          path: "/",
          element: <Dashboard response={dashboardResponse}/>,
        },
        {
          path: "/analytics",
          element: <Analytics />,
        },
        {
          path: "/audience",
          element: <Audience />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
        {
          path: "/chatbot",
          element: <Chatbot />,
        },
      ],
    },
  ]);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App