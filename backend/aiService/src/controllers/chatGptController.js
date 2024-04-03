// backend/src/controllers/chatGptController.js
const OpenAI = require('openai');
require('dotenv').config();

// Initialize OpenAI API with your API key
const openai = new OpenAI(process.env.OPENAI_API_KEY);


// Function to generate a list of suitable jobs for given resume tokens
const getJobs = async (resumeTokens) => {
    try {
        // Send the resume tokens to ChatGPT to generate suitable jobs
        const prompt = `Given the resume tokens: \n [ ${resumeTokens.join(', ')} ] \n generate 5 most suitable jobs.(only job titles)`;

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{"role": "system", "content": prompt}],
            max_tokens: 100,
        });
        const jobs = response.choices[0].message.content;
        return jobs;
    } catch (error) {
        console.error('Error generating jobs:', error);
        throw error;
    }
};

module.exports = {
    getJobs
};