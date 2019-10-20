import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import SortableHeader from './SortableHeader';
import { tableStyles } from './styles';


class JobTable extends React.Component {

  state = { order: 'descending',  sortedBy: null };

  isDisabled() {
    return this.props.page === 1 ? true : false;
  }

  navigate = (direction) => () => {
    this.props.requestPage(direction);
  }

  sortData(data, sortKey, order) {
    if (sortKey === 'created_at') {
      if (order === 'ascending') {
        data.sort((a,b) => Date.parse(a[sortKey]) > Date.parse(b[sortKey]) ? 1 : -1);
      }
      else if (order === 'descending') {
        data.sort((a,b) => Date.parse(a[sortKey]) < Date.parse(b[sortKey]) ? 1 : -1);
      }
    }
    else {
      if (order === 'ascending') {
        data.sort((a,b) => a[sortKey].toLowerCase() < b[sortKey].toLowerCase() ? 1 : -1);
      }
      else if (order === 'descending') {
        data.sort((a,b) => a[sortKey].toLowerCase() > b[sortKey].toLowerCase() ? 1 : -1);
      }
    }
  }


  render() {
    const {classes, jobList, pagination, page, hasNext} = this.props;
    let sortedList = [...jobList];
    if(!jobList) {
      return null;
    }
    else {
      if(this.state.sortedBy) {
        this.sortData(sortedList, this.state.sortedBy, this.state.order);
      }

      return(
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Table className={classes.table} aria-label='Jobs' stickyHeader>

              <SortableHeader updateSortKey={(sortedBy) => this.setState({sortedBy: sortedBy})} 
                              updateOrder={(order) => this.setState({order: order})}
                              sortedBy={this.state.sortedBy}
                              order={this.state.order} />

                <TableBody>
                  {sortedList.map( (job) => { return (
                    <TableRow className={classes.row} key={job.created_at}>
                      <TableCell className={classes.title}><a href={job.url} target='_blank' rel='noopener noreferrer'>{job.title}</a></TableCell>
                      <TableCell className={classes.location}>{job.location}</TableCell>
                      <TableCell className={classes.type}>{job.type}</TableCell>
                      <TableCell className={classes.created_at}>{job.created_at}</TableCell>
                      <TableCell className={classes.company}>{job.company}</TableCell>
                    </TableRow>)
                  })}
                </TableBody>

            </Table>
          </Paper>

          <div className = {classes.footer} >
          {pagination &&
            <div>
              <Button className={classes.navigationButton} disabled={this.isDisabled()} onClick={this.navigate('back')}>
                Back
              </Button>
              <p className={classes.pageNumber}>{page}</p>
              <Button className={classes.navigationButton} disabled={!hasNext} onClick={this.navigate('next')}>
                Next
              </Button>
            </div> 
          }
          </div>
        </div>
      )
  }
  }
}

JobTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(tableStyles)(JobTable);