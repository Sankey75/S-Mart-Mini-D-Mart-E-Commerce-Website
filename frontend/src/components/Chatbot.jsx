import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import chatbotIcon from '../assets/Chatbot.png';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isPromptEnabled, setIsPromptEnabled] = useState(true);
  const [messages, setMessages] = useState([
    { text: "Hi there! 👋 Welcome to S-Mart. How can we help you today?", isBot: true }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isPromptEnabled && !isOpen) {
      interval = setInterval(() => {
        setShowPrompt(prev => !prev);
      }, 5000); // Toggles every 5 seconds
    } else {
      setShowPrompt(false);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPromptEnabled, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsPromptEnabled(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = { text: inputMessage, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "Thanks for your message! Our support team is currently offline, but we've received your query and will get back to you soon.", 
        isBot: true 
      }]);
    }, 1000);
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <span className="chatbot-icon">🌿</span>
              <h3>S-Mart Support</h3>
            </div>
            <button className="chatbot-close-btn" onClick={toggleChat}>&times;</button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message-bubble ${msg.isBot ? 'bot' : 'user'}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <form className="chatbot-input-area" onSubmit={handleSendMessage}>
            <input 
              type="text" 
              placeholder="Type your question..." 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button type="submit" className="chatbot-send-btn">
              <span>➤</span>
            </button>
          </form>
        </div>
      )}
      
      {!isOpen && showPrompt && (
        <div className="chatbot-prompt">
          Have Any Question ?Ask Me !!!
          <button className="prompt-close" onClick={(e) => { e.stopPropagation(); setIsPromptEnabled(false); }}>&times;</button>
        </div>
      )}
      
      <button 
        className={`chatbot-toggle-btn ${isOpen ? 'open' : ''}`} 
        onClick={toggleChat}
        aria-label="Toggle Chatbot"
      >
        {isOpen ? '✕' : <img src={chatbotIcon} alt="Chatbot" className="chatbot-icon-img" />}
      </button>
    </div>
  );
};

export default Chatbot;
