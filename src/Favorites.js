import React, { Component } from "react";
import axios from "axios";
import { Card, Header, Icon } from "semantic-ui-react";

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
                            <Card key={item._id} fluid>
                                <Card.Content>
                                    <Card.Header textAlign="left">
                                        <div style={{ wordWrap: "break-word" }}>{item.cat}</div>
                                    </Card.Header>

                                    <Card.Meta textAlign="right">
                                        <Icon
                                            name="undo"
                                            color="yellow"
                                            onClick={() => this.undoFavorite(item._id)}
                                        />
                                        <span style={{ paddingRight: 10 }}>Undo</span>

                                    </Card.Meta>
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
                <div className="row">
                    <Card.Group>{this.state.items}</Card.Group>
                </div>
            </div>
        );
    }
}

export default Favorites;
