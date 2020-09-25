import React, { Component } from "react";
import axios from "axios";
import {Card, Header, Icon, Image} from "semantic-ui-react";
import './App.css';

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
            console.log(res);
            if (res.data) {
                this.setState({
                    items: res.data.map(item => {

                        return (
                            <Card key={item._id} >
                                <Image src={item.url} />
                                <Card.Content>
                                    Unlike Me
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
            .put(endpoint + "/api/undoFavorite/" + id, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(res => {
                console.log(res);
                this.getFavorites();
            });
    };

    render() {
        return (
            <div>
                <div className="row">
                    <Header className="header" as="h2">
                        My favorites
                    </Header>
                </div>
                <div className={"ui link cards"}>
                    <Card.Group>{this.state.items}</Card.Group>
                </div>
            </div>
        );
    }
}

export default Favorites;
