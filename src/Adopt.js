import { Form } from "semantic-ui-react";
import React, { Component } from "react";


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

    render() {
        const { fields } = this.state;

        return (
            <Form onSubmit={(e) => {
                this.props.handleAdoptSubmit(this.state.fields, this.props.cat);
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
                />
                <button type={'submit'}>Adopt</button>
            </Form>
        );
    }
}

export default Adopt;
