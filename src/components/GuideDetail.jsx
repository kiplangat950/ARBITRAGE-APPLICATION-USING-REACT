import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBetting } from '../context/BettingContext';

export default function GuideDetail() {
  const { topicSlug } = useParams();
  const { guides, sendPost, response } = useBetting();
  const guide = guides.find((g) => g.slug === topicSlug);

  if (!guide) return <p>Not found</p>;

  return (
    <div>
      <Link to="/">← Back</Link>
      <h1>{guide.title}</h1>
      <p>{guide.text}</p>
      <button onClick={() => sendPost('/bookmark', { topicSlug })}>
        Save Guide (POST)
      </button>
      {response && <pre>{JSON.stringify(response)}</pre>}
    </div>
  );
}
