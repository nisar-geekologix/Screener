import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cookie from 'cookie';

// Dummy database (aapke real database ki jagah use hoga)
const users = [
  {
    email: 'nisar.nowawave@gmail.com',
    password: '$2a$10$uU1Jtp6UlKkCqLgkSbGHg.kjwHUZXHfd4Xf5FXNGqNaedE14OMHfC', // "password" hashed
  },
];

export async function POST(req) {
  const { email, password } = await req.json();

  // User ko database mein se find karo
  const user = users.find(u => u.email === email);

  if (!user) {
    return new Response(JSON.stringify({ message: 'User not found' }), { status: 400 });
  }

  // Password verify karo
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 400 });
  }

  // JWT Token generate karo
  const token = jwt.sign(
    { email: user.email },
    process.env.JWT_SECRET_KEY, // JWT secret aapko .env file mein set karna padega
    { expiresIn: '1h' }
  );

  // Token ko cookie mein set karo
  const headers = new Headers();
  headers.append('Set-Cookie', cookie.serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Production mein secure cookie set karo
    maxAge: 3600, // 1 hour
    path: '/',
  }));

  return new Response(JSON.stringify({ message: 'Login successful' }), { status: 200, headers });
}
