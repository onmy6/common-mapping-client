import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'react-toolbox/lib/button';
import * as actions from '../../actions/MapActions';
import * as mapStrings from '../../constants/mapStrings';
import MiscUtil from '../../utils/MiscUtil';

export class MapControlsContainer extends Component {
    setViewMode() {
        if (this.props.in3DMode) {
            this.props.actions.setMapViewMode(mapStrings.MAP_VIEW_MODE_2D);
        } else {
            this.props.actions.setMapViewMode(mapStrings.MAP_VIEW_MODE_3D);
        }
    }

    render() {
        let coordinateString = "coordinates of cursor";
        if (this.props.pixelCoordinate.get("isValid")) {
            coordinateString = this.props.pixelCoordinate.get("lat").toFixed(3) + ", " + this.props.pixelCoordinate.get("lon").toFixed(3);
        }
        let coordinateContainerClasses = MiscUtil.generateStringFromSet({
            "mouse-position-container": true,
            "invalid": !this.props.pixelCoordinate.get("isValid"),
            "isolate": this.props.in3DMode
        });
        return (
            <div id="mapControls">
                <Button 
                    floating
                    neutral
                    label={this.props.in3DMode ? "2D" : "3D"} 
                    className="map-dimension-toggle mini-xs" 
                    onClick={() => this.setViewMode()} 
                    data-tip={this.props.in3DMode ? "Switch to 2D map" : "Switch to 3D map"} 
                    data-place="right"
                />
                <Button
                    floating
                    neutral
                    icon="navigation"
                    className={this.props.in3DMode ? "map-orientation-reset mini-xs" : "hidden"} 
                    onClick={() => {this.props.actions.resetOrientation(1)}}
                    data-tip="Reset orientation"
                    data-place="right" 
                />
                <Button
                    floating
                    neutral
                    icon="add"
                    className="map-zoom-in mini-xs" 
                    onClick={this.props.actions.zoomIn} 
                    data-tip="Zoom in"
                    data-place="right"
                />
                <Button
                    floating
                    neutral
                    icon="remove"
                    className="map-zoom-out mini-xs" 
                    onClick={this.props.actions.zoomOut} 
                    data-tip="Zoom out"
                    data-place="right"
                />
                <div className={coordinateContainerClasses}>
                    <span className="mouse-position-label">Position:</span> {coordinateString}
                </div>
            </div>
        );
    }
}

MapControlsContainer.propTypes = {
    in3DMode: PropTypes.bool.isRequired,
    pixelCoordinate: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        in3DMode: state.map.getIn(["view", "in3DMode"]),
        pixelCoordinate: state.map.getIn(["view", "pixelHoverCoordinate"])
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapControlsContainer);
