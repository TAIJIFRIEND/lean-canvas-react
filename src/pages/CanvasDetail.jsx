import { useLocation, useParams, useSearchParams } from 'react-router-dom';

function CanvasDetail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  console.log('searchParams:', searchParams.get('keyword'));
  return (
    <div>
      CanvasDetail<p>{id}</p>
      <p>keyword: {searchParams.get('keyword')}</p>
      <p>hash: {location.hash}</p>
    </div>
  );
}

export default CanvasDetail;
