import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, Button} from 'react-bootstrap';

export class BillingCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            item,
            val,
            currency,
            button
        } = this.props;

        const itemCount = item.length;
        let totalCost = 0;

        if (val === "Monthly") {
            totalCost = (item.reduce((a, v) => a = a + v.monthly_cost, 0));
        } else {
            totalCost = (item.reduce((a, v) => a = a + v.annual_cost, 0));
        }

        const cost = (totalCost * currency.rate).toFixed(2);

        if (item !== 0 && item !== 1 && val) {
            return (
                <Card>
                    <Card.Body>
                        <Card.Title>Subscription Plans Billing</Card.Title>
                        <Card.Text>Looking for a British Red Cross {val} subscription plans...</Card.Text>
                        <Card.Text><strong>Package:</strong> {val}</Card.Text>
                        <Card.Text><strong>Subscription Items:</strong> {itemCount}</Card.Text>
                        <Card.Text><strong>Total of cost:</strong> {currency.symbol}{cost}</Card.Text>
                        <Button variant="success">{button.process}</Button>
                    </Card.Body>
                </Card>
            );
        } else {
            return null;
        }
    }
}

BillingCard.propTypes = {
    item: PropTypes.shape({
        plan_code: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        annual_cost: PropTypes.number.isRequired,
        monthly_cost: PropTypes.number.isRequired,
        length: PropTypes.number
    }),
    val: PropTypes.string,
    currency: PropTypes.shape({
        code: PropTypes.string.isRequired,
        symbol: PropTypes.string.isRequired,
        rate: PropTypes.number.isRequired,
    }),
    button: PropTypes.array
};
