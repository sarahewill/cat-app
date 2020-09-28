import React, {Component, Fragment } from "react";
import { Button, Modal } from 'semantic-ui-react'
import Adopt from "./Adopt";
import axios from "axios";

let endpoint = "http://localhost:8080";

export default class UnlikeAdopt extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
            cats: []
        };
    }

    handleOpen = () => this.setState({ modalOpen: true });

    handleClose = () => {
        this.setState({ modalOpen: false });
    }
    adoptCat = (form, id) => {
        const name = form.name;
        axios
            .put(endpoint + "/api/cat/" + id,{
                name: name
            },{
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(res => {
                this.setState({ cats: [this.state.cats, res.data]})
            });
    };
    render() {
        return (
            <div className="ui buttons">

                {this.state.cats.includes(this.props.cat._id) ?
                    <Button className="ui button" >Adopted</Button>
                    :
                    <Fragment>
                        <Button onClick={() => {
                            this.props.undoFavorite(this.props.cat._id);
                        }} >Unlike</Button>
                        <div className="or" />
                        <Button className="ui positive button" onClick={() => {
                            this.handleOpen();
                        }}>Adopt</Button>
                    </Fragment>
                }
                <Modal
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    closeIcon
                >
                    <Modal.Header>Adopt</Modal.Header>
                    <Modal.Content>
                        <Adopt handleClose={this.handleClose} handleAdoptSubmit={this.adoptCat} cat={this.props.cat._id}/>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}
