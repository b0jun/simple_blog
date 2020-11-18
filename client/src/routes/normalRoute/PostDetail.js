import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {} from 'react-helmet';
import { USER_LOADING_REQUEST } from '../../redux/types';
import {} from 'reactstrap';
import CKEditor from '@ckeditor/ckeditor5-react';

const PostDetail = (req) => {
  const dispatch = useDispatch();
  const { PostDetail, creatorId, title, loading } = useSelector(
    (state) => state.post
  );
  const { userId, userName } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch({
      type: POST_DETAIL_LOADING_REQUEST,
      payload: req.match.params.id,
    });
    dispatch({
      type: USER_LOADING_REQUEST,
      payload: localStorage.getItem('token'),
    });
  });

  const onDeleteClick = () => {
    dispatch({
      type: POST_DELETE_REQUEST,
      payload: {
        id: req.match.params.id,
        token: localStorage.getItem('token'),
      },
    });
  };

  return <div>PostDetail</div>;
};

export default PostDetail;
