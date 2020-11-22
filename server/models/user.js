import moment from 'moment';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Main', 'Sub', 'User'],
    default: 'User',
  },
  register_date: {
    type: Date,
    default: moment().format('YYYY-MM-DD hh:mm:ss'),
  },
  // 포스트를 지우면 관련된 댓글까지 지우기 위한 구조
  comments: [
    {
      post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
      },
      comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment',
      },
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'post',
    },
  ],
});

const User = mongoose.model('user', UserSchema);

export default User;
