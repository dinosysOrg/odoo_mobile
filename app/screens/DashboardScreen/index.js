import React, { Component } from "react";
import { View } from "react-native";
import DashboardComponent from "./dashboard.ui";
import { connect } from "react-redux";
import { loadDashboard } from "../../redux/dashboard/dashboard.action";

class DashboardScreen extends Component {
  render() {
    return <DashboardComponent style={{ flex: 1 }} {...this.props} />;
  }

  /**
     * When component did mount,
     * start loading order in range from 30 days ago to current day
     */
  componentDidMount() {
    let { dashboard, loadDashboard, user } = this.props;
    let { odoo } = user;

    loadDashboard(odoo);
  }
}

const mapStateToProps = state => ({
  user: state.user,
  dashboard: state.dashboard
});

const mapDispatchToProps = dispatch => ({
  loadDashboard: odooApi => dispatch(loadDashboard(odooApi))
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
