import { useUser } from '@watchworthy/ui';
import { Button, Input, List, Result } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';

export const Community = () => {
  const user = useUser();
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
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
      setReceivedMessages((prevMessages) => [...prevMessages, parsedMessage]);
    }
  }, [lastMessage]);

  useEffect(() => {
    // Scroll to the bottom of the messages container whenever new messages are added
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [receivedMessages]);

  return (
    <>
      {/* <h1>Community</h1> */}
      {!user.user ? (
        <>
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
        </>
      ) : (
        <>
          {' '}
          <div>
            <div
              ref={messagesContainerRef}
              style={{
                height: 700,
                overflow: 'auto',
                border: '1px solid #ccc',
                padding: '3px',
              }}
            >
              <List
                dataSource={receivedMessages}
                renderItem={(item) => (
                  <List.Item
                    style={{
                      background: '#fff',
                      color: item ? '#1890ff' : '#000',
                    }}
                  >
                    <>{item}</>
                  </List.Item>
                )}
              />
            </div>
            <div style={{ display: 'flex', marginTop: 16 }}>
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <Button
                onClick={handleSendMessage}
                type="primary"
                style={{ marginLeft: 8 }}
              >
                Send
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Community;
