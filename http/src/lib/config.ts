export const saltRounds: number = 10;

declare global {
  namespace Express {
    interface Request {
      userId: number;
    }
  }
}
