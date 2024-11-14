import jwt from 'jsonwebtoken';

export async function GET(req) {
  const cookies = req.headers.get('cookie') || '';
  const token = cookies.split(';').find(cookie => cookie.trim().startsWith('token='));

  if (!token) {
    return new Response(JSON.stringify({ message: 'Not authorized' }), { status: 401 });
  }

  try {
    // Token verify karo
    const decoded = jwt.verify(token.split('=')[1], process.env.JWT_SECRET_KEY);
    return new Response(JSON.stringify({ message: 'Protected content', user: decoded }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Token expired or invalid' }), { status: 401 });
  }
}
