import React, { Component } from 'react';
class Transaction extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <div class="card">
                    <div class="card-body">
                        <span style={{ fontWeight: "bold" }}>{this.props.description}: </span>
                        ${this.props.amount}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default Transaction;