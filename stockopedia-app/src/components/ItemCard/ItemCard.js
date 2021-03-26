import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import './ItemCard.css';

const displayImage = (code) => {
    return './img/' + code + '.jpg';
}

export class ItemCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    setSelValue(val) {
        return {
            subSelect: val
        }
    }

    render() {
        const {
            item,
            onChange,
            subscription,
            val,
            currency
        } = this.props;

        if (item !== 0 && item !== 1 && val) {

            const monthly_cost = (item.monthly_cost * currency.rate).toFixed(2);
            const annual_cost = (item.annual_cost * currency.rate).toFixed(2);
            ;
            return (
                <Card>
                    <div className='flag'>
                        <Card.Img variant="top" src={displayImage(item.plan_code)}/>
                    </div>
                    <Card.Body>

                        <Card.Title>{item.name}</Card.Title>
                        {subscription === 1 && val === 'Monthly' ?
                            <ToggleButtonGroup type="checkbox" onChange={onChange} id='id' value={item}>
                                <ToggleButton name='monthly'
                                              value={0}>Monthly: {currency.symbol}{monthly_cost} </ToggleButton>
                            </ToggleButtonGroup>
                            : null
                        }
                        {subscription === 1 && val === 'Annual' ?
                            <ToggleButtonGroup type="checkbox" onChange={onChange} id='id' value={item}>
                                <ToggleButton name='annual'
                                              value={1}>Annual: {currency.symbol}{annual_cost}</ToggleButton>
                            </ToggleButtonGroup>
                            : null
                        }
                        {subscription === 2 ?
                            <ToggleButtonGroup type="checkbox" onChange={onChange} id='id' value={item.id}>
                                <ToggleButton name='remove'>Remove</ToggleButton>
                            </ToggleButtonGroup>
                            : null
                        }
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
        plan_code: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
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
    })
};
