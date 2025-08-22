type SessionPayload = {
  userId: number;
  email: string;
  name: string;
  role: string;
  picture?: string;
  expiresAt: Date;
};

type RoleType = "user" | "admin" | "operator";

type ActionType = "approved" | "rejected";
