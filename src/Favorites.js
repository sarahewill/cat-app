import React, { Component } from "react";
import axios from "axios";
import {Card, Header, Image} from "semantic-ui-react";
import './App.css';
import UnlikeAdopt from "./UnlikeAdopt";

let endpoint = "http://localhost:8080";

class Favorites extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cat: "",
            items: []
        };
    }

    componentDidMount() {
        this.getFavorites();
    }

    getFavorites = () => {
        axios.get(endpoint + "/api/cat").then(res => {
            if (res.data) {
                this.setState({
                    items: res.data.map(item => {

                        return (
                            <Card key={item._id} >
                                <Image src={item.url} />
                                <Card.Content>
                                    <UnlikeAdopt cat={item} undoFavorite={this.undoFavorite} />
                                </Card.Content>
                            </Card>
                        );
                    })
                });
            } else {
                this.setState({
                    items: []
                });
            }
        });
    };

    undoFavorite = id => {
        axios
            .delete(endpoint + "/api/undoFavorite/" + id, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(res => {
                this.getFavorites();
            });
    };

    render() {
        return (
            <div className={'right-container'}>
                <Header className="header" as="h2">
                    My favorites
                </Header>
                <div className={"ui link cards"}>
                    <Card.Group>{this.state.items}</Card.Group>
                </div>
            </div>
        );
    }
}

export default Favorites;
