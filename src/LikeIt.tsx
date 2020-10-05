import * as React from 'react'
import { useState } from 'react';
import { Button, Icon, Transition, Label } from 'semantic-ui-react'
import {Cat} from "./Home";

function LikeIt(props: {cat: Cat, favoriteCat: Array<string>, addToFavorites: any }): JSX.Element  {

    const [visible, setVisible] = useState(true);
    const [animation] = useState('jiggle');
    const [duration] = useState(500);

    function toggleVisibility(){
        setVisible(!visible)
    }

    return (
            <div>
                <Button as='div' labelPosition='right' onClick={() => {
                    toggleVisibility();
                    props.addToFavorites(props.cat);
                }}>
                    <Button>
                        Like Me
                    </Button>
                    <Label as='a' basic pointing='left'>
                        <Transition
                            animation={animation}
                            duration={duration}
                            visible={visible}
                        >
                            <Icon color={props.favoriteCat.includes(props.cat.id) ? "red" : "grey"} name='heart' />
                        </Transition>
                    </Label>
                </Button>
            </div>
        );
}

export default LikeIt;
