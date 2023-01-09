import { Configuration, OpenAIApi } from 'openai';

// ADD SECONDARY PROMPT TO CREATE STORY BASED ON
// OUTPUT FROM FIRST PROMPT TABLE OF CONTENTS

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Base Prompt for the textbox
const basePromptPrefix =
`
Write me a detailed outline for a cover letter with the job title below.

Title:
`

const generateAction = async (req, res) => {
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.8,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  // I build Prompt #2.
  const secondPrompt = 
  `
  Take the outline and job title of the cover letter below and generate a cover letter written in a persuesive style. Make it feel like a story. Don't just list the points. Go deep into each one. Provide meaning.

  Job Title: ${req.body.userInput}

  Outline: ${basePromptOutput.text}

  Cover Letter:
  `
  
  // I call the OpenAI API a second time with Prompt #2
  const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${secondPrompt}`,
    // I set a higher temperature for this one. Up to you!
    temperature: 0.85,
		// I also increase max_tokens.
    max_tokens: 1250,
  });
  
  // Get the output
  const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  // Send over the Prompt #2's output to our UI instead of Prompt #1's.
  res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;