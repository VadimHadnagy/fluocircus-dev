import { Provider } from 'react';
import { SessionProvider } from 'next-session'; 
import { getSession } from 'next-session/client';

export default function CustomApp({ Component, pageProps }) {
  return (
    <SessionProvider session={getSession({
      // Session configuration options here (same as before)
      adapter: process.env.NODE_ENV === 'production'
        ? require('next-session/redis') // Use Redis adapter in production
        : require('next-session/memory'), // Use memory adapter in development
      cookie: {
        maxAge: 60 * 60 * 2, // Set cookie to expire after 2 hours
        httpOnly: true, // Prevent client-side JavaScript access
        secure: process.env.NODE_ENV === 'production', // Set secure flag for HTTPS only in production
        path: '/', // Set cookie path to be accessible from all routes
      },
      autoCommit: false, // Disable auto-commit for manual session handling
    })}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
