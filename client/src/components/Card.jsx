import React, { Component } from 'react';

class Card extends Component {
    state = {
        payee : "",
        billDescription : "",
        cost : 0
    }
    //<img class="card-img-top" src="..." alt="Card image cap"></img>
    render() {
        return (
        <div class="three">
            <div class="card" style={{width: 18 + 'rem'}}>
                <div class="card-body">
                    <h5 class="card-title"> Payee { this.state.payee } </h5> 
                    <p class="card-text"> Description { this.state.billDescription } </p>
                    <p class="card-number">Cost { this.state.cost} </p>
                </div>
            </div>
        </div>
        )
    }
}

export default Card