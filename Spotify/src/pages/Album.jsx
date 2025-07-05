import { useParams } from 'react-router-dom';

function Album() {
  const { id } = useParams();
  return (
    <div className="page">
      <h2>Album ID: {id}</h2>
      <p>Show album songs here...</p>
    </div>
  );
}

export default Album;
