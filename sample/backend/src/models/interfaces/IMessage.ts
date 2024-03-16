interface IMessage {
  id?: string
  context_id?: string;
  content: string;
  author: string;
  type?: string;
  created_at: Date;
  updated_at?: Date;
  user_id?: string;  
  userMessage: boolean
  intruder_prompt?: string | null
  var_storage?: any;
  model_id?: string;
  score?: number;
}

export default IMessage;