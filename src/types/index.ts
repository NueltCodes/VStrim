import { Comment, EngagementType, User } from "@prisma/client";

export interface UserCommentParams {
  id: string;
  name: string | null;
  image: string | null;
  handle: string | null;
}

export interface CommentParams {
  id: string;
  message: string;
  createdAt: Date;
}
