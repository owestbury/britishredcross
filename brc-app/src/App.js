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
            page: {
                title: 'British Red Cross - Available subscription plans',
                subscription: 'Subscription',
                subscription_plan: 'Subscription Plans',
                content_order: 'Contents of the order',
                select: 'Please select any subscription',
                summary_title: 'Summary',
                button: {
                    currency: 'Currency',
                    monthly: 'Monthly',
                    annual: 'Annual',
                    remove: 'Remove',
                    process: 'Go ahead and process it?'
                },
            },
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
        const path = process.env.REACT_APP_API_COUNTRIES;
        return fetch(path)
            .then(response => response.json())
            .then(response => this.setState({countries: response}))
            .catch(err => console.log(err))
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
        const sel = event.slice(-1).pop() ? event.slice(-1).pop() : null;
        if (sel) {
            this.setState({val: event.slice(-1).pop()})
            this.setState({SubSelected: []})
        }
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
        const {page, countries, SubSelected, val, variant, currency} = this.state;

        return (
            <div className="App">
                <header className="App-header" aria-lable={page.title}>
                    <h2>
                        {page.title}
                    </h2>
                </header>

                <h4 data-testid="subscription" aria-lable={page.subscription}>{page.subscription}</h4>

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
                    <div className="selectedPlansTitle" aria-label={page.subscription_plan}>
                        {page.subscription_plan}
                    </div>
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
                                    button={page.button}
                                />
                            )
                        }
                    </CardDeck>
                </div>
                <div className="plansbox">
                    {this.state.SubSelected.length > 0 ?
                        <div className="selectedPlans">
                            <div className="selectedPlansTitle" aria-label={page.content_order}>
                                {page.content_order}
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
                                                button={page.button}
                                            />
                                        )
                                    }
                                </CardDeck>
                            </div>
                        </div> :
                        <div aria-label={page.select}>
                            {page.select}
                        </div>
                    }
                    {this.state.SubSelected.length > 0 ?
                        <div className="selected-total">
                            <div className={page.summary_title}>
                                {page.summary_title}
                            </div>
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
                                        button={page.button}
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
