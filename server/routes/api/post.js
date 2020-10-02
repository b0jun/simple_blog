import express from 'express';
import auth from '../../middleware/auth';
import Post from '../../models/post';

const router = express.Router();

// api/post
router.get('/', async (req, res) => {
  const postFindResult = await Post.find();
  console.log(postFindResult, 'All Post Get');
  res.json(postFindResult);
});

/* 인증된 사용자만 포스트 작성할 수 있게 설정 */
router.post('/', auth, async (req, res, next) => {
  try {
    console.log(req, 'req');
    const { title, contents, fileUrl, creator } = req.body;
    const newPost = await Post.create({
      title,
      contents,
      fileUrl,
      creator,
    });
    res.json(newPost);
  } catch (e) {
    console.log(e);
  }
});

export default router;
