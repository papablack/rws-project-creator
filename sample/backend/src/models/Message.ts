import { RWSannotations, RWSModel } from '@rws-framework/server';

import IMessage from './interfaces/IMessage';
import 'reflect-metadata';

const { TrackType } = RWSannotations.modelAnnotations;

class Message extends RWSModel<Message> implements IMessage {
  @TrackType(String, { required: false })
      convo_id: string;

  @TrackType(String, { required: true })
      content: string;

  @TrackType(String)
      author: string;

  @TrackType(String)
      model_id: string;

  @TrackType(Number)
      score: number;

  @TrackType(Boolean)
      userMessage: boolean = false;
  
  @TrackType(String)
      type: string;

  @TrackType(Date, { required: true })
      created_at: Date;
  
  @TrackType(Date)
      updated_at: Date;

  @TrackType(String)
      user_id: string;

  @TrackType(String)
      context_id: string;

  @TrackType(Object)
      var_storage: any;

  static _collection = 'jchatter_message';

  constructor(data?: IMessage) {   
      super(data);    

      if(!this.created_at){
          this.created_at = new Date();
          this.updated_at = new Date();
      }
  }
}

export default Message;