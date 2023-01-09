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
          <div className='spin'>
            <pre className="ascii">                                          ........                                                  </pre>
            <pre className="ascii">                                      ':ok0KXNNXXK0Oxl;.                                            </pre>
            <pre className="ascii">                                   .lONWMMWNXKKKXNWWMMWKd;                                          </pre>
            <pre className="ascii">                                ;0WMWOc.            .c0WMMMMMMMMMMMWXOo,.                           </pre>
            <pre className="ascii">                               :KMMXl.          'coxKWMMWKkdllclldkKWMMNOc.                         </pre>
            <pre className="ascii">                           .,:dKMMXc        .;oONWMMWXOo,.         .;oKWMW0;                        </pre>
            <pre className="ascii">                        .ckKNMMMMWd.     .cxKWMMWKOx:'                .lXMMXl.                      </pre>
            <pre className="ascii">                      'dXWMWX0NMMNc    .dXWMWNOo;.       .'cc;.         ;0MMNc                      </pre>
            <pre className="ascii">                    .oXMMNk:..kMMN:    ;KMXxc'        .;d0NMMWKxc'       ;XMM0'                     </pre>
            <pre className="ascii">                   .xWMWO;   .kMMN:    ;KMx.     ..'ckKNXkooOXWMMNOo;.   .xMMNc                     </pre>
            <pre className="ascii">                  .xWMWx.    .kMMN:    ;KMd.  .;oOXNMNk:.    'cxKWMMWKx:..dWMWl                     </pre>
            <pre className="ascii">                  :XMMO'     .kMMN:    ;KMk;cxKNX00XWNkl'.      .;oONMMWX0XMMN:                     </pre>
            <pre className="ascii">                  dWMWo      .kMMN:    ;XMWNNKd:....:d0NN0d;.       'cxKWMMMM0'                     </pre>
            <pre className="ascii">                 .xMMNl      .kMMN:    ;XMKo,.        .,lKMWKkc'       .;xXMMNd.                    </pre>
            <pre className="ascii">                  oWMWd.     .kMMN:    ;KWd.             oWWK0NNOo;.      ,kNMWO'                   </pre>
            <pre className="ascii">                  ,0MMX:      lNMWO:.  ;KMd.             oWNc.,lkXWKx,     .dNMWk.                  </pre>
            <pre className="ascii">                   :XMMKc      'ckXNXkldXMd.             oWN:    cXMMk.     .kMMNl                  </pre>
            <pre className="ascii">                    :KMMNk;.      .:d0NWMWk'            .xWX:    ;XMMO.      cNMMx.                 </pre>
            <pre className="ascii">                     ,0MMMNOo,.      .,lkXNKkc'.     'cxKWMN:    ;XMMO.      :XMMk.                 </pre>
            <pre className="ascii">                     '0MMMWMMWKx:.       .:d0NNOoccoOXNKk0WN:    ;XMMO.      oWMWd                  </pre>
            <pre className="ascii">                     :NMM0loONMMWXkl,.      .oXMMWWXOo;..oWX:    ;XMMO.     ;KMMK;                  </pre>
            <pre className="ascii">                     cNMMx.  'cxKWMMW0d:..,oOXNKxc;'     oWX:    ;XMMO.    :KMMNc                   </pre>
            <pre className="ascii">                     ,KMM0,     .;oONMMWXXNNOo;.       .,kWN:    ;XMMO.  ,xNMMKc                    </pre>
            <pre className="ascii">                     .dWMWx.       .'cx00xc'        .;o0NMMX;    ;XMMKooONMMNx'                     </pre>
            <pre className="ascii">                      .kWMWk'          ..       'coxKWMMN0d;     cNMMMMMMWKd,                       </pre>
            <pre className="ascii">                       .xNMMKo'             .;oONMMMWXkl,.      .kWMWX0xl;.                         </pre>
            <pre className="ascii">                         :OWMMXkl;'......;lxKWMMWKOd:.         .xWMWk'.                             </pre>
            <pre className="ascii">                          .:xKWMMWNXKKKXNWMMMNOl,.           .:OWMWk.                               </pre>
            <pre className="ascii">                             .;lxOKXNNNXXNMMMKl'          .'lONMMXo.                                </pre>
            <pre className="ascii">                                  ...'...;xXWMWXOxdolcllok0NMMWKd'                                  </pre>
            <pre className="ascii">                                           .cxKNWMMMMMMMMMWN0d:.                                    </pre>
            <pre className="ascii">                                              .';clooddolc;..                                       </pre>  
          </div>

          <div className="openai"></div>
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
