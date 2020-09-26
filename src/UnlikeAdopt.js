import React, {Component} from "react";
import { Button } from 'semantic-ui-react'

export default class UnlikeAdopt extends Component {
    render() {
        return (
            <div className="ui buttons">
                <Button onClick={() => {
                    this.props.undoFavorite(this.props.cat._id);
                }} >Unlike</Button>
                <div className="or" />
                <Button className="ui positive button" onClick={() => {
                    // this.showForm();
                }} >Adopt</Button>
            </div>
        )
    }
}
