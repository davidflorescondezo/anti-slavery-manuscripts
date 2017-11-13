import React from 'react';
import PropTypes from 'prop-types';
import Rnd from 'react-rnd';
import { connect } from 'react-redux';
import { toggleDialog } from '../ducks/dialog';

class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.popupBody = null;
    this.close = this.close.bind(this);
  }

  onClose() {
    this.props.dispatch(toggleDialog(null));
    // if (this.props.selectedAnnotation) {
    //   this.props.dispatch(unselectAnnotation());
    // }
  }

  render() {
    const width = this.props.isPrompt ? 450 : 800;
    const height = 425;
    const x = window.innerWidth / 2 - (width / 2);
    const y = window.innerHeight / 2 - (height / 2) + window.scrollY;

    const defaultPosition = { x, y, height, width };
    const enableResize = this.props.enableResize ? { bottomRight: true } : false;
    const resizeClass = this.props.enableResize ? { bottomRight: "drag-handler" } : false;
    const children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, { onClose: this.close });
    });

    return (
      <Rnd
        default={defaultPosition}
        enableResizing={enableResize}
        minHeight={400}
        minWidth={400}
        resizeHandlerClasses={resizeClass}
      >
        <div className="popup dialog" ref={(c)=>{this.popupBody=c}} onClick={(e) => { return e.target === this.popupBody && this.close(e); }}>
          <div className="popup-content dialog-content">
            {!this.props.isPrompt && (
              <button className="close-button" onClick={this.close}>X</button>
            )}
            {children}
          </div>
        </div>
      </Rnd>
    );
  }

  close(e) {
    this.onClose();
    return this.stopEvent(e);
  }

  stopEvent(e) {
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
    e.returnValue = false;
    e.cancelBubble = true;
    return false;
  }
}

Dialog.defaultProps = {
  enableResize: true,
  isPrompt: false
}

Dialog.propTypes = {
  dispatch: PropTypes.func,
  enableResize: PropTypes.bool,
  isPrompt: PropTypes.bool
}

const mapStateToProps = (state) => ({
  enableResize: state.dialog.enableResize,
  isPrompt: state.dialog.isPrompt
});

export default connect(mapStateToProps)(Dialog);
