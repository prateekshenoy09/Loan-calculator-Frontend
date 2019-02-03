
import React, { Component } from 'react';
import {Button, ButtonGroup, Col} from 'react-bootstrap';


class RightSide extends Component {
    render() {
        return (
            <Col className="rightSide" xs={12} md={6}>



                <h4>Monthly payment</h4>
                <span className="monthlyInstDisplay">{this.props.currancy}{this.props.monthly}</span>

                <h4>Interest Rate</h4>
                <span className="aprDisplay">{this.props.INTEREST}%</span>


            </Col>
        )
    }
}

export default RightSide;
