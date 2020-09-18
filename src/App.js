import React, {useEffect, useState} from 'react';
import './App.css';

const apiKey = 'c7edd4ac-90c9-41ed-9d2b-41bbace5e6e5';
const url = 'https://api.thecatapi.com/v1/images/search?limit=5&page=10&order=Desc';

function App() {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        getCats();
    },[])
    const getCats = () => {
        fetch(url)
            .then((res) => res.json())
            .then(cats => {
                setCats(cats);
            })
            .catch((error) => {
                console.log('error', error);
            })
    }

  return (
    <div className="App">
        <button onClick={getCats}>Get new cats</button>
        <div>
            {cats.map((cat) =>
                <img src={cat.url} key={cat.id} alt="" />
            )}
        </div>
    </div>
  );
}

export default App;
