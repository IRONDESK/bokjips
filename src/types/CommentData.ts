export interface ICommentDataTypes {
  commentId?: string;
  companyId?: string;
  content: string;
  createBy?: string;
  isMyComment?: boolean | null;
  timestamp?: Date;
}
