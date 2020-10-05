import { Fragment, useState } from "react";
import * as React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import Adopt from "./Adopt";
import axios from "axios";
import {FavoriteCat} from "./Home";
import Ref from "semantic-ui-react/dist/commonjs/addons/Ref";

export interface IFieldProps {
    name: string
}

let endpoint = "http://localhost:8080";

function UnlikeAdopt (props: {cat: FavoriteCat, undoFavorite: any}): JSX.Element {

    const [cats, setCats] = useState<Array<string>>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const firstForwardedRef = React.useRef(null)
    const myForwardedRef = React.useRef(null)
    const secondForwardedRef = React.useRef(null)

    function handleOpen():void {
        setModalOpen(!modalOpen)
    }

    function handleClose():void {
        setModalOpen(!modalOpen)
    }
    function handleDelete(): void {
        props.undoFavorite(props.cat._id);
    }
    function adoptCat(form: IFieldProps["name"], id: string):void {
        const name = form;
        axios
            .put(endpoint + "/api/cat/" + id,{
                name: name
            },{
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(res => {
                setCats(res.data)
            });
    }
    return (
        <div className="ui buttons">

            {cats.includes(props.cat._id) ?
                <Ref innerRef={firstForwardedRef}><Button className="ui button" >Adopted</Button></Ref>

                :
                <Fragment>
                    <Ref innerRef={myForwardedRef}><Button onClick={handleDelete}>Unlike</Button></Ref>
                    <div className="or" />
                    <Ref innerRef={secondForwardedRef}><Button className="ui positive button" onClick={handleOpen}>
                        Adopt</Button></Ref>
                </Fragment>
            }
            <Modal
                open={modalOpen}
                onClose={handleClose}
                closeIcon
            >
                <Modal.Header>Adopt</Modal.Header>
                <Modal.Content>
                    <Adopt handleClose={handleClose} handleAdoptSubmit={adoptCat} id={props.cat._id}/>
                </Modal.Content>
            </Modal>
        </div>
    );
}

export default UnlikeAdopt;
