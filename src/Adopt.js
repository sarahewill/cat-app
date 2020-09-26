import { Form } from "semantic-ui-react";
import React, { Component } from "react";
import axios from "axios";

let endpoint = "http://localhost:8080";

class Adopt extends Component {
    state = {
        fields: {
            name: "",
        },
    };
    handleChange = (e) => {
        const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
        this.setState({ fields: newFields });
    };

    handleAdoptSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.fields.name);
    };
    adoptCat = cat => {
        // axios
        //     .put(endpoint + "/api/cat/" + cat.id, {
        //         headers: {
        //             "Content-Type": "application/x-www-form-urlencoded"
        //         }
        //     })
        //     .then(res => {
        //         console.log(res);
        //     });
    };
    render() {
        const { fields } = this.state;

        return (
            <Form onSubmit={(e) => {
                this.handleAdoptSubmit(e);
                this.props.handleClose();
            }}>
                <label htmlFor="name">Name</label>
                <input
                    className="name"
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={fields.name}
                    onChange={this.handleChange}
                ></input>
                <button>Adopt</button>
            </Form>
        );
    }
}

export default Adopt;
