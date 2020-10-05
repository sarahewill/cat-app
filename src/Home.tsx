import { useEffect, useState } from 'react';
import * as React from 'react'
import axios from "axios";
import { Card, Image, Button, Header } from "semantic-ui-react";
import LikeIt from "./LikeIt";
import './App.css';
import Ref from "semantic-ui-react/dist/commonjs/addons/Ref";

export interface Cat {
    id: string
    url: string
}
export interface FavoriteCat {
    _id: string
    url: string
}
const url = 'https://api.thecatapi.com/v1/images/search?limit=6&page=10&order=Desc';
const endpoint = "http://localhost:8080";

function Home(): JSX.Element {

    const [cats, setCats] = useState([]);
    const [favoriteCat, setFavoriteCat] = useState(['']);
    const buttonRef = React.useRef(null)

    function addToFavorites(cat: Cat) {
        if (cat) {
            axios
                .post(
                    endpoint + "/api/cat",
                    {
                        url: cat.url,
                    },
                    {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    }
                )
                .then(res => {
                    setFavoriteCat([...favoriteCat, cat.id])
                });
        }
    }

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
        <div className={'fourteen wide column'}>
            <div className={'right-container'}>
                <Header>
                    <Ref innerRef={buttonRef}>
                        <Button color={'teal'} onClick={getCats}>Get new cats</Button>
                    </Ref>
                </Header>
                <div className={"ui link cards"}>
                    {cats.map((cat: Cat) =>
                        <Card key={cat.id} >
                            <Image src={cat.url} key={cat.id} alt="" />
                            <Card.Content>
                                <LikeIt cat={cat} favoriteCat={favoriteCat} addToFavorites={addToFavorites}/>
                            </Card.Content>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
