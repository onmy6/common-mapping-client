import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import d3 from 'd3';
import moment from 'moment';
import MiscUtil from '_core/utils/MiscUtil';
import TimeAxis from '_core/components/DateSlider/TimeAxis';
import ResolutionStep from '_core/components/DateSlider/ResolutionStep';

const miscUtil = new MiscUtil();

export class DateSliderContainer extends Component {
    render() {
        let hoverDateClasses = miscUtil.generateStringFromSet({
            "hover-date-display": true,
            "hidden": !this.props.hoverDate.get("isValid")
        });
        let hoverDateStyles = {
            left: this.props.hoverDate.get("x") + "px"
        };
        let hoverDate = moment(this.props.hoverDate.get("date")).format("YYYY MMM DD");
        return (
            <div id="dateSliderContainer">
                <div className={hoverDateClasses} style={hoverDateStyles}>
                    {hoverDate}
                </div>
                <svg className="date-slider-container">
                    <g id="dateSlider">
                        <TimeAxis />
                    </g>
                </svg>
                <ResolutionStep />
            </div>
        );
    }
}

DateSliderContainer.propTypes = {
    hoverDate: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        hoverDate: state.dateSlider.get("hoverDate")
    };
}

export default connect(
    mapStateToProps,
    null
)(DateSliderContainer);
