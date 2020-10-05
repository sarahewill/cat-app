import { Form } from "semantic-ui-react";
import * as React from 'react';
import { useState } from "react";
import { IFieldProps } from "./UnlikeAdopt";
import Ref from "semantic-ui-react/dist/commonjs/addons/Ref";

function Adopt(props:{handleClose: any, handleAdoptSubmit: any, id: string}): JSX.Element {
    const [formField, setFormField] = useState<IFieldProps>({name: ''})

    function handleChange(e: any) {
        setFormField(e.target.value );
    }
    const forwardedRef = React.useRef(null)
    const { name } = formField;
    return (
            <Form onSubmit={(e) => {
                props.handleAdoptSubmit(formField, props.id);
                props.handleClose();
            }}>
                <label htmlFor="name">Name</label>
                <input
                    className="name"
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name || ''}
                    onChange={handleChange}
                />
                <Ref innerRef={forwardedRef}><button type={'submit'}>Adopt</button></Ref>

            </Form>
        );
}

export default Adopt;
