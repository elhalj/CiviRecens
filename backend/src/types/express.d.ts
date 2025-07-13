import { TokenPayload } from "../utils/token.js";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
      citizen?: TokenPayload;
      institution?: TokenPayload;
    }
  }
}
