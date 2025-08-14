type SessionPayload = {
  userId: number;
  email: string;
  name: string;
  role: string;
  picture?: string;
  expiresAt: Date;
};
