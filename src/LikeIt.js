import React, {Component} from "react";
import { Button, Icon, Transition, Label } from 'semantic-ui-react'

export default class LikeIt extends Component {
    state = { animation: 'jiggle', duration: 500, visible: true }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })
    toggleVisibility = () =>
        this.setState((prevState) => ({ visible: !prevState.visible }))

    render() {
        const {animation, duration, visible} = this.state

        return (
            <div>
                <Button as='div' labelPosition='right' onClick={() => {
                    this.toggleVisibility();
                    this.props.addToFavorites(this.props.cat);
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
                            <Icon color={`${this.props.favoriteCat.includes(this.props.cat.id) ? "red" : "grey"}`} name='heart' />
                        </Transition>
                    </Label>
                </Button>
            </div>

        )
    }
}
