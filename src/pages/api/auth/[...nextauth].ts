import NextAuth, { Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import SpotifyProvider from 'next-auth/providers/spotify';
import SpotifyWebApi from 'spotify-web-api-node';

declare module 'next-auth/jwt' {
  interface JWT {
    accessTokenExpires: number;
    accessToken: string | undefined;
    refreshToken: string | undefined;
    username: string;
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken: string | undefined;
      refreshToken: string | undefined;
      username: string | undefined;
      image: string | undefined;
      name: string | undefined;
      email: string | undefined;
    };
  }
}

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string,
  clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET as string,
});

const refreshAccessToken = async (token: JWT) => {
  const { accessToken: tokenAccessToken, refreshToken: tokenRefreshToken } = token;

  if (tokenAccessToken === undefined || tokenRefreshToken === undefined) {
    return {
      ...token,
      error: new Error('RefreshedTokenError'),
    };
  }

  spotifyApi.setAccessToken(tokenAccessToken);
  spotifyApi.setRefreshToken(tokenRefreshToken);

  const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
  return {
    ...token,
    accessToken: refreshedToken.access_token,
    accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, // means one hour from now in ms
    refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
  };
};

const returnRequiredPermissions = (): string => ['user-library-read'].join(',');

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET as string,
      authorization: `https://accounts.spotify.com/authorize?scope=${returnRequiredPermissions()}`,
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, account, user }): Promise<JWT> {
      if (account != null && user != null) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at != null ? account.expires_at * 1000 : 0,
        };
      }

      if (Date.now() >= token.accessTokenExpires) {
        return await refreshAccessToken(token);
      }

      return token;
    },

    async session({ session, token }): Promise<Session> {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    },
  },
});
