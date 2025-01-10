# Sociopath: Unlocking Social Media Insights with Data-Driven Analytics

**Sociopath** is a basic analytics module for analyzing engagement data from mock social media accounts. The project aims to evaluate social media post performance by analyzing engagement metrics like likes, shares, and comments. It uses Langflow for workflow automation, DataStax Astra DB for database operations, and GPT integration for generating insights.

## Collaborators

- Vivian Ludrick
- Badal Singh
- Ronit Naik

## License

This project is licensed under the MIT License.

## Tools & Technologies

- **React** (with Shadcn)
- **TypeScript**
- **Vite**
- **Recharts** (for data visualization)
- **DataStax Astra DB** (for database operations)
- **Langflow** (for workflow creation and GPT integration)
- **Gemini Integration** (for generating insights)

## Features

1. **Fetch Engagement Data**: Simulated dataset for social media engagement (likes, shares, comments, post types).
2. **Post Performance Analysis**: Calculate average engagement metrics for different post types (carousel, reels, static images).
3. **Insight Generation**: Use GPT to generate simple insights based on the analysis (e.g., which post type performs better).

## Installation & Setup

### Prerequisites

Ensure that you have the following tools installed:

- **Node.js** (v16.x or higher)
- **npm** (or yarn)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/sociopath.git
cd sociopath
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up DataStax Astra DB

1. Create an account on [DataStax Astra](https://astra.datastax.com/).
2. Create a new database and get the connection credentials.
3. Store the connection credentials in your `.env` file (or use any other method to securely load them).

### 4. Set Up Langflow and GPT

1. Set up Langflow as per the [documentation](https://docs.langflow.com/).
2. Integrate GPT for generating insights by following the guide in Langflow's setup.

### 5. Run the Development Server

```bash
npm run dev
```

## Video Demonstration

[Link to YouTube video showing Langflow workflow, DataStax usage, and GPT insights]

## Contribution

Feel free to open issues or submit pull requests if you'd like to contribute to the project.

---

MIT License © [Your Name or Your Team Name]
