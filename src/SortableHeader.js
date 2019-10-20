import React from 'react';
import PropTypes from 'prop-types';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import { tableHeaderStyles } from './styles'


const tableData = [
    {name: "Title", id: "title", sortable: true, style: {flex: 4}},
    {name: "Location", id: "location", sortable: true, style:{flex: 1}},
    {name: "Type", id: "type", sortable: false, style:{flex: 1}},
    {name: "Created at", id: "created_at", sortable: true, style:{flex: 1}},
    {name: "Company", id: "company", sortable: true, style:{flex: 1}}
]


class SortableHeader extends React.Component {

  getIcon() {
    const {classes} = this.props;
    let icon, label;
    if(this.props.order === "ascending") {
      icon = <ArrowDropUp/>;
      label = "ascending order";
    }
    else if (this.props.order === "descending") {
      icon = <ArrowDropDown/>;
      label = "descending order";
    }
    return <IconButton className={classes.icon} name="title" onClick={this.sort} aria-label={label}>{icon}</IconButton>
  }

  sort = (cellName) => (event) => {
    if(!this.props.sortedBy || cellName !== this.props.sortedBy) {
      this.props.updateSortKey(cellName);
      this.props.updateOrder("descending");
    }
    else {
      if (this.props.order === "descending"){
        this.props.updateOrder("ascending")
      }
      else if (this.props.order === "ascending") {
        this.props.updateSortKey(null)
      }
    }
  }

  render () {
    const { classes } = this.props;
    return (
      <TableHead>
        <TableRow className={classes.row}>
          { tableData.map( row => {
            const sortIcon = (this.props.sortedBy === row.id) ? this.getIcon() : null;
            let onclick;
            let className;
            if(row.sortable) {
              onclick = this.sort(row.id);
              className = classes.clickable
            }
            return (
              <TableCell style={row.style} onClick={onclick} key={row.id} className={className}>
                <span className={classes.title}>{row.name}</span>
                {sortIcon}
              </TableCell>
            )
          })}
        </TableRow>
      </TableHead>
    )
  }
}

SortableHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(tableHeaderStyles)(SortableHeader);