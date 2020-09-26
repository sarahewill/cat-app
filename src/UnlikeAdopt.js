import React, {Component} from "react";
import { Button, Modal } from 'semantic-ui-react'
import Adopt from "./Adopt";
export default class UnlikeAdopt extends Component {
    state = {
        modalOpen: false,
    };

    handleOpen = () => this.setState({ modalOpen: true });

    handleClose = () => this.setState({ modalOpen: false });

    render() {
        return (
            <div className="ui buttons">
                <Button onClick={() => {
                    this.props.undoFavorite(this.props.cat._id);
                }} >Unlike</Button>
                <div className="or" />
                <Button className="ui positive button" onClick={() => {
                    this.handleOpen();
                }} >Adopt</Button>
                <Modal
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    cat={this.props.cat}
                    closeIcon
                >
                    <Modal.Header>Adopt</Modal.Header>
                    <Modal.Content>
                        <Adopt handleClose={this.handleClose} />
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}
