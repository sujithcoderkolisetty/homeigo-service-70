
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { getChatbotResponse } from '@/services/chatbotService';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Welcome to HomeIgo! How can I help you today?\nహోమ్ ఇగో కి స్వాగతం! నేను మీకు ఎలా సహాయం చేయగలను?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = input;
    setInput('');
    
    // Add user message to chat
    setMessages(prev => [
      ...prev, 
      { role: 'user', content: userMessage }
    ]);
    
    setLoading(true);
    
    try {
      const messageHistory = [
        ...messages.filter(msg => msg.role !== 'system'),
        { role: 'user', content: userMessage }
      ];
      
      const data = await getChatbotResponse(messageHistory);
      
      if (data.choices && data.choices[0]) {
        const botReply = data.choices[0].message.content;
        setMessages(prev => [
          ...prev, 
          { role: 'assistant', content: botReply }
        ]);
      } else {
        throw new Error('Invalid response format from AI');
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      toast({
        title: 'Error',
        description: 'Failed to get response. Using fallback response instead.',
        variant: 'destructive',
      });
      
      // This shouldn't happen now since we're handling errors in the service,
      // but keeping it as an extra safeguard
      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error. Please try again.\nక్షమించండి, నాకు లోపం ఎదురైంది. దయచేసి మళ్లీ ప్రయత్నించండి.' 
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const ChatInterface = () => (
    <div className="flex flex-col h-[500px] md:h-[600px] w-full">
      <div className="bg-homeigo-500 text-white p-4 rounded-t-lg flex justify-between items-center">
        <h3 className="font-semibold">HomeIgo Assistant / హోమ్ ఇగో అసిస్టెంట్</h3>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-homeigo-600" 
          onClick={() => setIsOpen(false)}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-white space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`max-w-[85%] p-3 rounded-lg ${
              message.role === 'user' 
                ? 'bg-homeigo-100 ml-auto text-gray-800' 
                : 'bg-gray-100 mr-auto'
            }`}
          >
            {message.content.split('\n').map((line, i) => (
              <p key={i} className="mb-1 last:mb-0 whitespace-pre-wrap">{line}</p>
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
        
        {loading && (
          <div className="flex justify-center">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-homeigo-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-homeigo-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-2 h-2 bg-homeigo-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your question... / మీ ప్రశ్న టైప్ చేయండి..."
          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-homeigo-500"
          disabled={loading}
        />
        <Button 
          onClick={handleSendMessage} 
          className="bg-homeigo-500 hover:bg-homeigo-600"
          disabled={loading}
        >
          {loading ? '...' : <Send className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  );

  // Enhanced animation for the chat button
  const chatButtonAnimation = `
    @keyframes pulse-ring {
      0% {
        transform: scale(0.95);
        opacity: 0.7;
      }
      50% {
        transform: scale(1.05);
        opacity: 0.3;
      }
      100% {
        transform: scale(0.95);
        opacity: 0.7;
      }
    }
  `;

  return (
    <>
      <style>{chatButtonAnimation}</style>
      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <div className="fixed bottom-6 right-6 z-50">
              <div className="absolute -inset-2 bg-homeigo-400 rounded-full opacity-70"
                   style={{animation: 'pulse-ring 2s ease-out infinite'}}></div>
              <Button 
                className="relative rounded-full w-14 h-14 bg-homeigo-500 hover:bg-homeigo-600 shadow-lg"
                size="icon"
              >
                <MessageCircle className="h-6 w-6" />
              </Button>
            </div>
          </DrawerTrigger>
          <DrawerContent className="h-[80vh] p-0">
            <ChatInterface />
          </DrawerContent>
        </Drawer>
      ) : (
        <>
          <div className={`fixed bottom-6 right-6 z-50 ${isOpen ? 'hidden' : 'block'}`}>
            <div className="absolute -inset-2 bg-homeigo-400 rounded-full opacity-70"
                 style={{animation: 'pulse-ring 2s ease-out infinite'}}></div>
            <Button 
              className="relative rounded-full w-14 h-14 bg-homeigo-500 hover:bg-homeigo-600 shadow-lg"
              onClick={() => setIsOpen(true)}
              size="icon"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </div>
          
          {isOpen && (
            <Card className="fixed bottom-6 right-6 w-[350px] md:w-[400px] shadow-xl z-50 rounded-lg overflow-hidden">
              <ChatInterface />
            </Card>
          )}
        </>
      )}
    </>
  );
};

export default Chatbot;
