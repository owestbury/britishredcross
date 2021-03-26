import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dropdown} from 'react-bootstrap';

export class Currency extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            variant,
            onChange,
        } = this.props;

        return (
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {variant.title}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item id="gb" onClick={onChange}>(£) GBP</Dropdown.Item>
                    <Dropdown.Item id="eu" onClick={onChange}>(€) EUR</Dropdown.Item>
                    <Dropdown.Item id="us" onClick={onChange}>($) USD</Dropdown.Item>
                    <Dropdown.Item id="jp" onClick={onChange}>(¥) JAP</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}

Currency.propTypes = {
    variant: PropTypes.shape({
        title: PropTypes.string,
    }),
    onChange: PropTypes.func.isRequired,
};
