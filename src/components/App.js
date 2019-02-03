import React, { Component } from 'react';
import '../css/App.css';
import { Grid, Row, Col, Form} from 'react-bootstrap';
import SliderAmount from './SliderAmount';
import SlidernumMonths from './SlidernumMonths';
import RightSide from './RightSide';

class LoanCalculator extends Component {

    /**
     * ================================
     * ==========CONSTRUCTOR ==========
     * ===============================
     * @param props
     */

  constructor(props) {
        super(props);

        // SET STARTER CALCULATUION

        let Interest = this.props.interest / 100 /12;
        let amount = this.props.valueA;
        let numMonths = this.props.valueN;
        let totalAmountToRepay = amount+((amount*Interest)*numMonths) ;
        let monthly = totalAmountToRepay / numMonths;





        // save props values in to the state
        this.state = {

            valueAmount: this.props.valueA,
            stepAmount: this.props.stepA,
            maxAmount: this.props.maxA,
            minAmount: this.props.minA,

            valuenumMonths: this.props.valueN,
            stepnumMonths: this.props.stepN,
            maxnumMonths: this.props.maxN,
            minnumMonths: this.props.minN,

            INTEREST: this.props.interest,
            amountToRepay:  Math.round(totalAmountToRepay).toFixed(),
            monthlyInst: Math.round(monthly).toFixed(),

        };
    }
    /**
     * ===============================================
     * ======== UPDATE FUNCTION ==================
     * =============================================
     * @param e
     */


    update( e ){
        // Assign to let changedID ID of slider which has been changed
        let changedID = e.target.id;
        let value = e.target.value;
        if (changedID === 'sliderAmount') {
            this.setState({valueAmount: e.target.value});
            console.log('EVENT TIME: ' + this.getNewDate());
            console.log('NEW ACTION DETECTED: ID - '+e.target.id + ': has been changed. New value: '+this.props.currancy + e.target.value);
        }
        if (changedID === 'slidernumMonths'){
            this.setState({valuenumMonths: e.target.value});
            console.log('EVENT TIME: ' + this.getNewDate());
            console.log('NEW ACTION DETECTED: ID - '+e.target.id + ': has been changed. New value: '+ e.target.value+' months');
        }


         // if button credit history clicked set INTEREST to choosen value
        switch (changedID) {

            case "1":
                this.setState({INTEREST: this.props.interest});
                console.log('EVENT TIME: ' + this.getNewDate());
                console.log('NEW ACTION DETECTED: ID - '+e.target.id + ': has been clicked. New INTEREST value is: '+ this.props.interest+'%');
                break;

               default:
                break;
        }

        this.calculate(changedID, value);
    }

    getNewDate() {

        let newDate = new Date();
        let h,m,s;
        h = newDate.getHours();
        m = "0"+newDate.getMinutes();
        s = "0"+newDate.getSeconds();
        m = m.slice(-2);
        s = s.slice(-2);

        let event_date = h +":"+m+":"+s;
        return event_date;
    };

    /**
     * ===============================================
     * ======== CALCULATE FUNCTION ==================
     * =============================================
     * @param id
     * @param value
     */

    calculate(id, value){

        let amount, numMonths;
        let Interest = this.state.INTEREST / 100 /12;  //  monthly interest for calculation
        let aprNew;
        // if calculate is after numMonths is changed take value of numMonths from slider, but value of amount from state
        if (id === 'slidernumMonths') {
            numMonths = parseFloat(value);
            amount = parseFloat(this.state.valueAmount);
        }
        // if calculate is after Amount is changed take value of Amount from slider, but value of numMonths from state
        else if (id === 'sliderAmount'){
            amount = parseFloat(value);
            numMonths = parseFloat(this.state.valuenumMonths);
        }
        // if calculate is after button credit history clicked  take values from state
        else {
            amount = parseFloat(this.state.valueAmount);
            numMonths = parseFloat(this.state.valuenumMonths);
            switch (id) {

                case "1":
                    aprNew =  this.props.interest;
                    Interest = aprNew / 100 / 12;  //  monthly interest for calculation
                    break;

                   default:
                    break;
            }

        }
        // calculate total and monthly
        let totalAmountToRepay = amount+((amount*Interest)*numMonths) ;
        let monthly = totalAmountToRepay / numMonths;

        // fixing numbers
        totalAmountToRepay =  Math.round(totalAmountToRepay).toFixed();
        monthly = Math.round(monthly).toFixed();

        //save results into state
        this.setState({amountToRepay: totalAmountToRepay});
        this.setState({monthlyInst: monthly});


    }


    /**
     * =================================================
     * =========== RENDER ============================
     * =============================================
     * @returns {XML}
     */
    render()
    {
        return(
            <Grid className="show-grid mainContainer">
                <Row>
                    <Col className="leftSide" xs={12} md={6}>
                        <Form horizontal>
                            <SliderAmount
                                value={this.state.valueAmount}
                                min={this.state.minAmount}
                                max={this.state.maxAmount}
                                onChange={this.update.bind(this)}
                                step={this.state.stepAmount}
                                currancy={this.props.currancy}
                            />
                            <SlidernumMonths
                                value={this.state.valuenumMonths}
                                min={this.state.minnumMonths}
                                max={this.state.maxnumMonths}
                                onChange={this.update.bind(this)}
                                step={this.state.stepnumMonths}
                            />
                        </Form>

                    </Col>

                    <RightSide
                        currancy={this.props.currancy}
                        amount={this.state.amountToRepay}
                        monthly={this.state.monthlyInst}
                        INTEREST={this.state.INTEREST}
                        btnOnClick={this.update.bind(this)}
                    />
               </Row>
            </Grid>
        );
    }
}
//  Assign Types for props
LoanCalculator.propTypes = {

    valueN: React.PropTypes.number,
    stepN: React.PropTypes.number,
    maxN: React.PropTypes.number,
    minN: React.PropTypes.number,

    valueA: React.PropTypes.number,
    stepA: React.PropTypes.number,
    maxA: React.PropTypes.number,
    minA: React.PropTypes.number,
    interest: React.PropTypes.number,

    currancy: React.PropTypes.string,
};

// Assign deafault values to props

LoanCalculator.defaultProps = {
    valueN: 24,
    stepN: 1,
    maxN: 24,
    minN: 6,

    valueA : 2000,
    stepA : 100,
    maxA : 5000,
    minA : 500,

    interest: 5,


    currancy: '$',
};

export default LoanCalculator;
