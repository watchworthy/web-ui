import { useUser } from '@watchworthy/ui';
import { Button, Input, List, Result } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';

const Community = () => {
  const user = useUser();
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
  const { sendMessage, lastMessage } = useWebSocket('ws://localhost:8081/chat');
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleSendMessage = () => {
    const currentTime = moment().format('HH:mm');
    const formattedMessage = user.user?.email
      ? '[' +
        currentTime +
        '] ' +
        user.user.email.split('@')[0] +
        ': ' +
        message
      : '';
    sendMessage(formattedMessage);
    setMessage('');
  };

  useEffect(() => {
    if (lastMessage !== null) {
      const parsedMessage = lastMessage.data;
      setReceivedMessages((prevMessages: string[]) => [...prevMessages, parsedMessage]);
    }
  }, [lastMessage]);
  
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [receivedMessages]);

  return (
    <div style={{ padding: '16px' }}>
      {!user.user ? (
        <Result
          status="error"
          title="You need to login to chat with the community"
          subTitle="If you do not have an account, please register to continue."
          extra={[
            <Button
              onClick={() => router.push('/register')}
              type="primary"
              key="register"
            >
              Register
            </Button>,
            <Button onClick={() => router.push('/login')} key="login">
              Login
            </Button>,
          ]}
        />
      ) : (
        <div>
          <div
            ref={messagesContainerRef}
            style={{
              height: '500px',
              overflow: 'auto',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '8px',
              marginBottom: '16px',
            }}
          >
            <List
              dataSource={receivedMessages}
              renderItem={(item) => (
                <List.Item
                  style={{
                    background: '#fff',
                    color: item ? '#1890ff' : '#000',
                    borderRadius: '4px',
                  }}
                >
                  {item}
                </List.Item>
              )}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              style={{ marginRight: '8px' }}
            />
            <Button
              onClick={handleSendMessage}
              type="primary"
              disabled={!message}
            >
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
