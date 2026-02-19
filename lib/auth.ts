import jwt from 'jsonwebtoken';

const TOKEN_EXPIRY = '8h';

export function signAdminToken(email: string) {
  return jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET!, { expiresIn: TOKEN_EXPIRY });
}

export function verifyAdminToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!);
}
