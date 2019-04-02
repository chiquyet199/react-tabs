import React, {PureComponent, Fragment} from "react";
import {connect} from "react-redux";
import {func, shape, string} from "prop-types";
import {
  DepositFree,
  Housemates,
  TenancyTerms,
} from "../../components/ActiveTenancy";
import LeaseSpec from "../../utils/api/specs/LeaseSpec";
import HeaderPropertySummary from "../../components/HeaderPropertySummary";
import Spinner from "../../components/Spinner";
import {findLeaseByProperty} from "../../actions/leases";
import {showTopbarCenterText} from "../../actions/topbar";

export class ActiveTenancy extends PureComponent {
  componentDidMount() {
    const {
      findLeaseByProperty: fetchLease,
      match: {
        params: {id},
      },
    } = this.props;

    fetchLease(id);
  }

  render() {
    const {lease, showTopbarCenterText: setTopbarText} = this.props;

    if (lease) {
      setTopbarText(lease.property.address.line1);
    }

    return (
      <Fragment>
        <Spinner visible={lease === undefined} />
        {lease && (
          <Fragment>
            <HeaderPropertySummary lease={lease} />
            <TenancyTerms lease={lease} />
            {lease.documents.length && <DepositFree lease={lease} />}
            {lease.renters.length > 1 && <Housemates lease={lease} />}
          </Fragment>
        )}
      </Fragment>
    );
  }
}

ActiveTenancy.propTypes = {
  findLeaseByProperty: func.isRequired,
  lease: LeaseSpec,
  match: shape({
    params: shape({
      id: string.isRequired,
    }).isRequired,
  }).isRequired,
  showTopbarCenterText: func.isRequired,
};

const mapsStateToProps = state => ({
  lease: state.property && state.property.lease,
});

const mapDispatchToProps = {
  findLeaseByProperty,
  showTopbarCenterText,
};

export default connect(
  mapsStateToProps,
  mapDispatchToProps,
)(ActiveTenancy);
