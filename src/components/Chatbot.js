import React, { useEffect, useRef, useState } from 'react';

function Chatbot() {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { text: userInput, sender: 'user' }];
    setMessages(newMessages);
    setUserInput('');

    setIsLoading(true);
    const GPT_API_KEY = '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';
    const GPT_API_URL = 'https://api.openai.com/v1/completions';

    try {
      const response = await fetch(GPT_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GPT_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "text-davinci-003",  
          prompt: userInput,
          max_tokens: 256
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      setMessages(prev => [...prev, { text: responseData.choices[0].text.trim(), sender: 'gpt' }]);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setMessages(prev => [...prev, { text: "Erro ao obter resposta.", sender: 'system' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md h-96 bg-white rounded-lg shadow-lg">
      <div className="flex-grow overflow-y-auto p-6 space-y-2">
        {messages.map((message, index) => (
          <div key={index} className={`p-3 rounded-lg text-sm ${message.sender === 'user' ? 'bg-blue-200 ml-auto' : 'bg-green-200 mr-auto'}`}>
            {message.text}
          </div>
        ))}
        {isLoading && <div className="text-center">Carregando...</div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex p-4 bg-gray-100 border-t border-gray-200">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-grow p-2 mr-4 rounded border border-gray-300"
          placeholder="Digite sua mensagem..."
        />
        <button onClick={sendMessage} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Enviar</button>
      </div>
    </div>
  );
}

export default Chatbot;
