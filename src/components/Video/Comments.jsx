import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { getVideoComments } from '../../services/youtube';

const CommentsContainer = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #333;
`;

const CommentHeader = styled.h3`
  color: white;
  margin-bottom: 1rem;
`;

const CommentItem = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const CommentContent = styled.div`
  flex: 1;
`;

const AuthorName = styled.p`
  color: white;
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const CommentText = styled.p`
  color: #aaa;
  line-height: 1.4;
`;

const LoadMore = styled.button`
  background: transparent;
  color: #3ea6ff;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  
  &:hover {
    color: #fff;
  }
`;

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextPageToken, setNextPageToken] = useState('');

  const loadComments = async (pageToken = '') => {
    try {
      setLoading(true);
      const data = await getVideoComments(videoId, pageToken);
      if (pageToken) {
        setComments(prev => [...prev, ...data.items]);
      } else {
        setComments(data.items);
      }
      setNextPageToken(data.nextPageToken);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [videoId]);

  if (error) return <div>Error loading comments: {error}</div>;

  return (
    <CommentsContainer>
      <CommentHeader>Comments</CommentHeader>
      {comments.map((comment) => {
        const { snippet } = comment.snippet.topLevelComment;
        return (
          <CommentItem key={comment.id}>
            <Avatar
              src={snippet.authorProfileImageUrl}
              alt={snippet.authorDisplayName}
            />
            <CommentContent>
              <AuthorName>{snippet.authorDisplayName}</AuthorName>
              <CommentText>{snippet.textDisplay}</CommentText>
            </CommentContent>
          </CommentItem>
        );
      })}
      {nextPageToken && !loading && (
        <LoadMore onClick={() => loadComments(nextPageToken)}>
          Load more comments
        </LoadMore>
      )}
      {loading && <div>Loading comments...</div>}
    </CommentsContainer>
  );
};

export default Comments; 