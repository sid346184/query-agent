import React, { useState } from 'react';
import axios from 'axios';

const QAForm = () => {
  const [context, setContext] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/answer', {
        context: context,
        question: question,
      });
      setAnswer(response.data.answer);
      setError('');
    } catch (err) {
      setError('Error fetching answer');
      setAnswer('');
    }
  };

  return (
    <div>
      <h2>Ask a Question</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Context"
          value={context}
          onChange={(e) => setContext(e.target.value)}
        />
        <input
          type="text"
          placeholder="Your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button type="submit">Get Answer</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {answer && (
        <div>
          <h3>Answer</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default QAForm;
