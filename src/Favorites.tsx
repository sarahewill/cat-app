import { useEffect, useState} from 'react';
import * as React from 'react'
import axios from "axios";
import {Card, Header, Image} from "semantic-ui-react";
import './App.css';
import UnlikeAdopt from "./UnlikeAdopt";
import {FavoriteCat} from "./Home";

const endpoint = "http://localhost:8080";

function Favorites(): JSX.Element {

    const [favoriteCats, setFavoriteCats] = useState<Array<FavoriteCat>>([]);

    function getFavorites()  {
        axios.get(endpoint + "/api/cat").then(res => {
            const favCats = res.data;
            if (favCats) {
                setFavoriteCats([...favCats])
            } else {
                setFavoriteCats([]);
            }
        });
    }

    function undoFavorite(id: string) {
        axios
            .delete(endpoint + "/api/undoFavorite/" + id, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(res => {
                getFavorites();
            });
    }

    useEffect((): void => {
        getFavorites();
    }, [])

    return(
        <div className={'fourteen wide column'}>
            <div className={'right-container'}>
                <Header className="header" as="h2">
                    My favorites
                </Header>
                <div className={"ui link cards"}>
                    <Card.Group>
                        {favoriteCats.map((cat: FavoriteCat) =>
                            <Card key={cat._id} >
                                <Image src={cat.url} />
                                <Card.Content>
                                    <UnlikeAdopt cat={cat} undoFavorite={undoFavorite} />
                                </Card.Content>
                            </Card>
                        )}
                    </Card.Group>
                </div>
            </div>
        </div>

    );
}

export default Favorites;
