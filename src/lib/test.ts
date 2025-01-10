import { processMessage } from './chat_with_db';

async function example() {
    try {
            const response = await processMessage("Give the data for the instagram user 1 in proper format");
        console.log("Final response:", response);
    } catch (error) {
        console.error("Error:", error);
    }
}

example();