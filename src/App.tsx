import { DashboardLayout } from "./layouts/dashboard-layout";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Dashboard, ResponseData } from "./pages/dashboard";
import Analytics, { AnalyticsData }  from "./pages/analytics";
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

// const dummyData = {
//   analysis: {
//     total_interactions_per_platform: {
//       instagram: {
//         total_likes: 939,
//         total_shares: 432,
//         total_comments: 367,
//         total_interactions: 1738
//       },
//       facebook: {
//         total_likes: 931,
//         total_shares: 730,
//         total_comments: 474,
//         total_interactions: 2135
//       },
//       twitter: {
//         total_likes: 982,
//         total_shares: 691,
//         total_comments: 261,
//         total_interactions: 1934
//       },
//       youtube: {
//         total_likes: 139,
//         total_shares: 13,
//         total_comments: 160,
//         total_interactions: 312
//       }
//     },
//     distribution_of_interactions_by_post_type: {
//       image: {
//         total_likes: 887,
//         total_shares: 483,
//         total_comments: 493,
//         total_interactions: 1863
//       },
//       carousel: {
//         total_likes: 1460,
//         total_shares: 727,
//         total_comments: 286,
//         total_interactions: 2473
//       },
//       text: {
//         total_likes: 644,
//         total_shares: 656,
//         total_comments: 553,
//         total_interactions: 1853
//       }
//     },
//     average_interactions_per_user: {
//       user1: {
//         average_likes: 279,
//         average_shares: 232,
//         average_comments: 203,
//         average_total_interactions: 714
//       },
//       user2: {
//         average_likes: 597,
//         average_shares: 278,
//         average_comments: 226,
//         average_total_interactions: 1101
//       },
//       user3: {
//         average_likes: 711,
//         average_shares: 363,
//         average_comments: 151,
//         average_total_interactions: 1225
//       }
//     }
//   }
// };

const analyticsPrompt = `
> "Please analyze the provided dataset and generate the following summaries in a structured JSON format that I can use to create charts:
> 1. **Total interactions** (likes, shares, and comments combined) per typeofplatform (platform-wise comparison).
> 2. **Distribution of interactions** by typeofpost (categorize interactions based on post type).
> 3. **Average interactions per user** (calculate the average likes, shares, and comments for each username).
> 4. **Breakdown of interactions** (likes, shares, and comments) by typeofpost for each platform.
> 5. **Comparison of platform activity** in terms of total likes, shares, and comments.
> 
> Format the output as structured JSON data that I can use to generate different types of charts."

---

### Example AI Response in JSON Format

{
  "analysis": {
    "total_interactions_per_platform": {
      "instagram": {
        "total_likes": 939,
        "total_shares": 432,
        "total_comments": 367,
        "total_interactions": 1738
      },
      "facebook": {
        "total_likes": 931,
        "total_shares": 730,
        "total_comments": 474,
        "total_interactions": 2135
      },
      "twitter": {
        "total_likes": 982,
        "total_shares": 691,
        "total_comments": 261,
        "total_interactions": 1934
      },
      "youtube": {
        "total_likes": 139,
        "total_shares": 13,
        "total_comments": 160,
        "total_interactions": 312
      }
    },
    "distribution_of_interactions_by_post_type": {
      "image": {
        "total_likes": 887,
        "total_shares": 483,
        "total_comments": 493,
        "total_interactions": 1863
      },
      "carousel": {
        "total_likes": 1460,
        "total_shares": 727,
        "total_comments": 286,
        "total_interactions": 2473
      },
      "text": {
        "total_likes": 644,
        "total_shares": 656,
        "total_comments": 553,
        "total_interactions": 1853
      }
    },
    "average_interactions_per_user": {
      "user1": {
        "average_likes": 279,
        "average_shares": 232,
        "average_comments": 203,
        "average_total_interactions": 714
      },
      "user2": {
        "average_likes": 597,
        "average_shares": 278,
        "average_comments": 226,
        "average_total_interactions": 1101
      },
      "user3": {
        "average_likes": 711,
        "average_shares": 363,
        "average_comments": 151,
        "average_total_interactions": 1225
      }
    },
    "breakdown_of_interactions_by_post_and_platform": {
      "image": {
        "instagram": {
          "likes": 257,
          "shares": 109,
          "comments": 215
        },
        "facebook": {
          "likes": 630,
          "shares": 374,
          "comments": 278
        }
      },
      "carousel": {
        "instagram": {
          "likes": 682,
          "shares": 323,
          "comments": 152
        },
        "twitter": {
          "likes": 778,
          "shares": 404,
          "comments": 134
        }
      },
      "text": {
        "twitter": {
          "likes": 204,
          "shares": 287,
          "comments": 127
        },
        "facebook": {
          "likes": 301,
          "shares": 356,
          "comments": 196
        },
        "youtube": {
          "likes": 139,
          "shares": 13,
          "comments": 160
        }
      }
    },
    "platform_comparison_activity": {
      "total_likes": {
        "instagram": 939,
        "facebook": 931,
        "twitter": 982,
        "youtube": 139
      },
      "total_shares": {
        "instagram": 432,
        "facebook": 730,
        "twitter": 691,
        "youtube": 13
      },
      "total_comments": {
        "instagram": 367,
        "facebook": 474,
        "twitter": 261,
        "youtube": 160
      }
    }
  }
}
`

const App = () => {
  const [, setError] = useState<string | null>(null)
  const [dashboardResponse, setdashboardResponse] = useState<ResponseData>();
  const [analyticsResponse, setAnalyticsResponse ] = useState<AnalyticsData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardResponsemsg = await processMessage(dashboardPrompt);
        setdashboardResponse(JSON.parse(dashboardResponsemsg));
       
        const analyticsResponsemsg = await processMessage(analyticsPrompt);
        analyticsResponsemsg.replace(/```\(\w*\)?\n?/g, '').trim();
        console.log(analyticsResponsemsg)
        setAnalyticsResponse(JSON.parse(analyticsResponsemsg));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      }
    }
    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const analyticsResponsemsg = await processMessage(analyticsPrompt);
  //       console.log(analyticsResponsemsg)
  //       setAnalyticsResponse(JSON.parse(analyticsResponsemsg));
  //       // setData(JSON.parse(response))
  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : 'An error occurred')
  //     }
  //   }
  //   fetchData();
  // }, []);


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
          element: <Analytics data={analyticsResponse} />,
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