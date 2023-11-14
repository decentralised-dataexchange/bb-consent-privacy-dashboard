import React, { Component } from "react";
import { observer } from "mobx-react";
import MUIDataTable from "mui-datatables";
import { Icon, Spin } from "antd";
import { Trans } from "react-i18next";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import { store } from "Provider/store";
import { withNamespaces } from "react-i18next";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const columns = [
  {
    name: "timestamp",
    label: <Trans i18nKey="viewlogs.timestamp">Timestamp</Trans>,
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "log",
    label: <Trans i18nKey="viewlogs.log">Log</Trans>,
    options: {
      filter: false,
      sort: true
    }
  }
];
const options = {
  filter: true,
  selectableRows: false,
  filterType: "checkbox",
  responsive: "scroll"
};


@observer
class Table extends Component {
  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTable: {
          root: {
            backgroundColor: "#FF000"
          },
          paper: {
            boxShadow: "none"
          }
        },
        MUIDataTableBodyCell: {
          root: {
            // backgroundColor: "#FF0000"
          }
        }
      }
    });

  componentDidMount() {
    store.fetchLogs();
  }

  render() {
    const { isFetching, logs } = store.historyLogs;
    const { t } = this.props;
    if (isFetching) {
      return (
        <div className="dashboard-spin">
          <Spin tip={t("viewlogs.progress")} indicator={antIcon} />
        </div>
      );
    }
    return (
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable
          // title={"Logs"}
          data={logs}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    );
  }
}

export default withNamespaces()(Table);
