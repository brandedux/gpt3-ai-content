import Head from 'next/head';

// Add React Hook - useState
import { useState } from 'react';

const Home = () => {
  // Use useState hook
  const [userInput, setUserInput] = useState('');

  // Create API Endpoint
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  
  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...");

    // Dim the button
    document.getElementById("prompt-buttons").style="opacity:.3";
    // Add spinner to show work
    document.getElementById("loading").classList.add("spinner");

    // API Call
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });
  

    // Remove spinner
    document.getElementById("loading").classList.remove("spinner");
    // Set button to 100%
    document.getElementById("prompt-buttons").style="opacity:1";


    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);


  }

  // Create constant to log value from target
  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);

  };

  return (
    <div className="root">
      <Head>
        <title>AI GPT-3 CONTENT</title>
      </Head>
      <div className="container">
        <div className="header">
          <h1 className="header-title">AI GPT-3 CONTENT</h1>
          <h2 className="header-subtitle">Enter a subject to create your own content with AI!</h2>
        </div>
        
        <div className="prompt-container">

          <div id="loading"></div>
          <textarea
            placeholder="Start typing here..."
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
          />
          <div id="prompt-buttons">
            <a className="generate-button" onClick={callGenerateEndpoint}>
              <div className="generate">
                <p>Generate</p>
              </div>
            </a>
          </div>

          {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output:</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
