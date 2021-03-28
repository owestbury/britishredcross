import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import './ItemCard.css';

const displayImage = (code) => {
    return './img/' + code;
}

export class ItemCard extends Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
        this.timeOutId = null;
        this.onClickHandler = this.onClickHandler.bind(this);
        this.onBlurHandler = this.onBlurHandler.bind(this);
        this.onFocusHandler = this.onFocusHandler.bind(this);
    }

    setSelValue(val) {
        return {
            subSelect: val
        }
    }

    onClickHandler() {
        this.setState(currentState => ({
            isOpen: !currentState.isOpen
        }));
    }

    onBlurHandler() {
        this.timeOutId = setTimeout(() => {
            this.setState({isOpen: false});
        });
    }

    onFocusHandler() {
        clearTimeout(this.timeOutId);
    }

    render() {
        const {
            item,
            onChange,
            subscription,
            val,
            currency,
            button
        } = this.props;

        if (item !== 0 && item !== 1 && val) {

            const monthly_cost = (item.monthly_cost * currency.rate).toFixed(2);
            const annual_cost = (item.annual_cost * currency.rate).toFixed(2);
            ;
            return (
                <Card>
                    <Card.Body>

                        <Card.Title>{item.name}</Card.Title>
                        <div className='button'
                             onBlur={this.onBlurHandler}
                             onFocus={this.onFocusHandler}>
                            {subscription === 1 && val === 'Monthly' ?
                                <ToggleButtonGroup type="checkbox" onChange={onChange} id='id' value={item}>
                                    <ToggleButton name='monthly'
                                                  onClick={this.onClickHandler}
                                                  aria-haspopup="true"
                                                  aria-expanded={this.state.isOpen}
                                                  value={0}>
                                        {button.monthly} {currency.symbol}{monthly_cost} </ToggleButton>
                                </ToggleButtonGroup>
                                : null
                            }
                            {subscription === 1 && val === 'Annual' ?
                                <ToggleButtonGroup type="checkbox" onChange={onChange} id='id' value={item}>
                                    <ToggleButton name='annual'
                                                  onClick={this.onClickHandler}
                                                  aria-haspopup="true"
                                                  aria-expanded={this.state.isOpen}
                                                  value={1}>
                                        {button.annual} {currency.symbol}{annual_cost}</ToggleButton>
                                </ToggleButtonGroup>
                                : null
                            }
                            {subscription === 2 ?
                                <ToggleButtonGroup type="checkbox" onChange={onChange} id='id' value={item.id}>
                                    <ToggleButton name='remove'
                                                  onClick={this.onClickHandler}
                                                  aria-haspopup="true"
                                                  aria-expanded={this.state.isOpen}
                                                  variant="danger">
                                        {button.remove}</ToggleButton>
                                </ToggleButtonGroup>
                                : null
                            }
                        </div>
                        <div className='photo' role="img">
                            <Card.Img variant="top" src={displayImage(item.image)}/>
                        </div>
                        <Card.Text>{item.description}</Card.Text>

                    </Card.Body>
                </Card>
            );
        } else {
            return null;
        }
    }
}

ItemCard.propTypes = {
    item: PropTypes.shape({
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        annual_cost: PropTypes.number.isRequired,
        monthly_cost: PropTypes.number.isRequired
    }),
    onChange: PropTypes.func.isRequired,
    subscription: PropTypes.number.isRequired,
    val: PropTypes.string,
    currency: PropTypes.shape({
        code: PropTypes.string.isRequired,
        symbol: PropTypes.string.isRequired,
        rate: PropTypes.number.isRequired,
    }),
    button: PropTypes.shape({
        remove: PropTypes.string,
        monthly: PropTypes.string,
        annual: PropTypes.string,
    })
};
