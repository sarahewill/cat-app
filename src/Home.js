import React, { useEffect, useState } from 'react';

import axios from "axios";
import { Card, Image, Button, Header } from "semantic-ui-react";
import LikeIt from "./LikeIt";
import './App.css';

const url = 'https://api.thecatapi.com/v1/images/search?limit=6&page=10&order=Desc';
let endpoint = "http://localhost:8080";

function Home() {

    const [cats, setCats] = useState([]);
    const [favoriteCat, setFavoriteCat] = useState([]);

    function addToFavorites(cat) {
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
            <div className={'right-container'}>
                <Header>
                    <Button color={'teal'}  onClick={getCats}>Get new cats</Button>
                </Header>
                <div className={"ui link cards"}>
                    {cats.map((cat) =>
                        <Card key={cat.id} >
                            <Image src={cat.url} key={cat.id} alt="" />
                            <Card.Content>
                                <LikeIt cat={cat} favoriteCat={favoriteCat} addToFavorites={addToFavorites}/>
                            </Card.Content>
                        </Card>
                    )}
                </div>
            </div>
    );
}

export default Home;
