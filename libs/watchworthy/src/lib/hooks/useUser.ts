import jwt from 'jsonwebtoken';
import { useEffect, useState } from 'react';

interface User {
  email: string | undefined;
  username: string | undefined;
  exp: number | undefined;
  iat: number | undefined;
  id: number | undefined;
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt.decode(token);
      if (decodedToken && typeof decodedToken !== 'string') {
        const { sub: email,username, exp, iat, id: id } = decodedToken;
        setUser({ email,username, exp, iat, id });
      } else {
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  return { user, loading };
};
