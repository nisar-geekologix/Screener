import cookie from 'cookie';

export async function GET(req) {
  const headers = new Headers();
  headers.append('Set-Cookie', cookie.serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: -1, // Expired
    path: '/',
  }));

  return new Response(JSON.stringify({ message: 'Logout successful' }), { status: 200, headers });
}
