import React, {Component} from 'react';
import css from './App.css';
import {ItemCard} from "./components/ItemCard/ItemCard";
import {CardDeck, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';
import {Currency} from "./components/Currency/Currency";
import {currencyRate} from "./components/Currency/rate"
import {BillingCard} from "./components/Billing/Billing"

class App extends Component {

    handleChange = event => {
        this.setState({username: event.target.value});
    };

    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            subscription: false,
            SubSelected: [],
            val: 'Annual',
            currency: {'code': 'gb', 'symbol': '£', 'rate': 1},
            variant: {
                title: "Currency"
            }
        };
    }

    componentDidMount() {
        this.getCountries();
    }

    getCountries = _ => {
        const path = 'http://localhost:8080/api/countries';
        fetch(path)
            .then(response => response.json())
            .then(response => this.setState({countries: response}))
            .catch(err => console.log(err))

        console.log(this.state);
    }

    getLastId = (data) => {
        const pickSubscription = data.slice(-1).pop() ? 'Annual' : 'Monthly';
        return pickSubscription;
    }

    currencySubscription = (currency) => {
        const cur = currency.target.id;
        const getData = currencyRate;
        const res = getData.filter(item => {
            return item.code === cur
        })
        this.setState({currency: res[0]})
    }

    selectSub = (event, newFormats) => {
        this.setState({val: event.slice(-1).pop()})
        this.setState({SubSelected: []})
    };

    b = (idToSearch) => {
        return this.state.SubSelected.filter(item => {
            return item.id === idToSearch
        })
    };

    handleSubscription = (index) => {
        const item = index[0];

        if (this.b(item.id).length === 0) {
            this.setState({SubSelected: this.state.SubSelected.concat(item)})
            this.state.SubSelected.pop();
        }
    };

    removeSub = (index) => {
        const item = index[0];
        const myArr = this.state.SubSelected.findIndex(function (o) {
            return o.id === item;
        })
        if (myArr !== -1) this.state.SubSelected.splice(myArr, 1);
        this.setState({SubSelected: this.state.SubSelected});
    }

    render() {
        const {countries, SubSelected, val, variant, currency} = this.state;

        return (
            <div className="App">
                <header className="App-header">
                    <h2>
                        Stockopedia - Available subscription plans
                    </h2>
                </header>

                <h4 data-testid="subscription">Subscription</h4>

                <div className="currency">

                    <Currency
                        variant={variant}
                        onChange={(index) => this.currencySubscription(index)}
                    />

                    <div>
                        <pre><strong>Rate:</strong> {currency.code} | {currency.symbol}{currency.rate}</pre>
                    </div>
                </div>
                <ToggleButtonGroup type="checkbox" value={val} onChange={this.selectSub}>
                    <ToggleButton value="Monthly" aria-label="Monthly">Monthly</ToggleButton>
                    <ToggleButton value="Annual" aria-label="Annual">Annual</ToggleButton>
                </ToggleButtonGroup>

                <div className={css.cardDeck}>
                    <CardDeck>
                        {
                            countries.map((item, index) =>
                                <ItemCard
                                    key={item.id}
                                    index={index}
                                    image={false}
                                    item={item}
                                    onChange={(index) => this.handleSubscription(index)}
                                    subscription={1}
                                    val={val}
                                    currency={currency}
                                />
                            )
                        }
                    </CardDeck>
                </div>
                <div className="plansbox">
                    {this.state.SubSelected.length > 0 ?
                        <div className="selectedPlans">
                            <div className="selectedPlansTitle">
                                Subscription Plans
                            </div>
                            <div className="selected">
                                <CardDeck>
                                    {
                                        SubSelected.map((item, index) =>
                                            <ItemCard
                                                key={item.id}
                                                index={index}
                                                image={false}
                                                item={item}
                                                onChange={(index) => this.removeSub(index)}
                                                subscription={2}
                                                val={val}
                                                confirm={SubSelected ? this.getLastId(SubSelected) : null}
                                                currency={currency}
                                            />
                                        )
                                    }
                                </CardDeck>
                            </div>
                        </div> :
                        <div>
                            Please select any subscription
                        </div>
                    }
                    {this.state.SubSelected.length > 0 ?
                        <div className="selected-total">
                            <CardDeck>
                                {
                                    <BillingCard
                                        index={SubSelected}
                                        image={false}
                                        item={SubSelected}
                                        onChange={(index) => this.removeSub(index)}
                                        subscription={2}
                                        val={val}
                                        confirm={SubSelected ? this.getLastId(SubSelected) : null}
                                        currency={currency}
                                    />
                                }
                            </CardDeck>
                        </div> :
                        <div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default App;
