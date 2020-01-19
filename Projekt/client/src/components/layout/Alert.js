import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//everytime you want to interact component with redux
//calling action or getting state use connect

const Alert = ({alerts}) =>
  alerts !== null && alerts.length > 0 && alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.proptypes = {
  alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
