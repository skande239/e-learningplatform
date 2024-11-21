import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const ForumContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Discussion = styled.div`
  background: white;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Reply = styled.div`
  margin-left: 20px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 4px;
  margin-top: 10px;
`;

function DiscussionForum({ courseId }) {
  const { currentUser } = useAuth();
  const [discussions, setDiscussions] = useState([]);
  const [newPost, setNewPost] = useState('');

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    // سيتم إضافة كود حفظ المنشور في Firebase
  };

  const handleReply = async (discussionId, replyContent) => {
    // سيتم إضافة كود حفظ الرد في Firebase
  };

  return (
    <ForumContainer>
      <h2>منتدى النقاش</h2>
      
      <form onSubmit={handleSubmitPost}>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="اكتب سؤالك أو تعليقك هنا..."
        />
        <button type="submit">نشر</button>
      </form>

      {discussions.map(discussion => (
        <Discussion key={discussion.id}>
          <h4>{discussion.title}</h4>
          <p>{discussion.content}</p>
          <small>
            بواسطة: {discussion.authorName} | 
            {new Date(discussion.createdAt).toLocaleDateString('ar-SA')}
          </small>
          
          {discussion.replies?.map(reply => (
            <Reply key={reply.id}>
              <p>{reply.content}</p>
              <small>
                بواسطة: {reply.authorName} |
                {new Date(reply.createdAt).toLocaleDateString('ar-SA')}
              </small>
            </Reply>
          ))}
        </Discussion>
      ))}
    </ForumContainer>
  );
}

export default DiscussionForum; 