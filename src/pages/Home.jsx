import { useEffect, useState } from 'react';
import { getCanvases, createCanvases } from '../api/canvas';
//import { Link } from 'react-router-dom';

//import CanvasItem from '../components/CanvasItem';
import CanvasList from '../components/CanvasList';
import SearchBar from '../components/SearchBar';
import ViewToggle from '../components/ViewToggle';
import Loading from '../components/Loading';
import Error from '../components/Error';
//import axios from 'axios';

function Home() {
  const [searchText, setSearchText] = useState();
  const [isGridView, setIsGridView] = useState(true);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData(params) {
    // const data = await fetch('http://localhost:8000/canvases')
    //   .then(res => res.json())
    //   .catch(error => console.error(error));

    try {
      setIsLoading(true);
      setError('');
      const response = await getCanvases(params);
      setData(response.data);
      setIsLoading(false);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData({ title_like: searchText });
  }, [searchText]);

  const handleDeleteItem = id => {
    setData(data.filter(item => item.id !== id));
  };

  console.log('data:', data);

  // const filteredData = data.filter(item => {
  //   return item.title.toLowerCase().includes(searchText.toLowerCase());
  // });

  //console.log('filteredData:', filteredData);
  const handleCreateCanvas = async () => {
    await createCanvases();
    fetchData({ title_like: searchText });
  };
  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        <ViewToggle setIsGridView={setIsGridView} isGridView={isGridView} />
      </div>
      <button onClick={handleCreateCanvas}>등록하기</button>
      {isLoading && <Loading />}
      {error && (
        <Error
          message={error.message}
          onRetry={() => {
            fetchData({ title_like: searchText });
          }}
        />
      )}

      {!isLoading && !error && (
        <CanvasList
          filteredData={data}
          searchText={searchText}
          isGridView={isGridView}
          onDeleteItem={handleDeleteItem}
        />
      )}
    </div>
  );
}

export default Home;
