import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import JobForm from './JobForm.js';
import PropTypes from 'prop-types';
import JobTable from './JobTable.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import {homeStyles} from './styles';

/**
 * Main page of the application, displaying a header, form for job searching, and data table with the results.
 */
class Home extends React.Component {

  state = {loading: false, jobList: [], formData: {}, hasNext: false, pagination: false, page: 1};

  baseUrl = 'http://localhost:3001/positions.json';
  title = 'GitJobs';
  subtitle = 'Get one before a bot does';

  /**
   * Basic get request
   * @param {string} url
   */
  async getRequest(url) {
    let json;
    try {
      const r = await fetch(url);
      json = await r.json();
    }
    catch (err) {
      alert("The request failed. Perhaps the server is not running, or the GitHub Jobs API might be down.")
      json = [];
    }
    return json;
  }

  /**
   * Builds the url for the search
   * @param {Object} params - search parameters
   * @param {number} page - requested page
   * @returns {string} encoded url
   */
  buildUrl(params, page){
    return encodeURI(`${this.baseUrl}?description=${params.description}&location=${params.location}&full_time=${params.full_time}&page=${page}`)
  }


  /**
   * Perform a job search with the provided parameters
   */
  updateResults = async (formResults) => {

    this.setState({loading: true})

    formResults.full_time = formResults.full_time === true ? 'on' : 'off' // transform for api call

    const url = this.buildUrl(formResults, 1);
    const r = await this.getRequest(url);
    const hasNext = await this.checkNextPage(r, formResults, 0);

    this.setState({jobList: r,
                   page: 1,
                   formData: formResults,
                   pagination: hasNext,
                   hasNext: hasNext,
                   loading: false})
  }

  /**
   * Request previous or next page of the search.
   */
  requestPage = async (direction) => {

    this.setState({loading: true})
    let hasNext, nextPage, r;

    if (direction === 'back'){
      nextPage = this.state.page - 1;
      r = await this.getRequest(this.buildUrl(this.state.formData, nextPage));
      hasNext = true; // we already know that there is a next page
    }
    else if (direction === 'next'){
      nextPage = this.state.page + 1;
      r = await this.getRequest(this.buildUrl(this.state.formData, nextPage));
      hasNext = await this.checkNextPage(r, this.state.formData, nextPage);
    }

    this.setState({hasNext: hasNext, jobList: r, page: nextPage, loading: false})
  }
    
  /**
   * Check if the result has a following page.
   * @param {Array} response 
   * @param {Object} params 
   * @param {number} currentPage 
   * @returns {boolean}
   */
  async checkNextPage(response, params, currentPage) {
    let hasNext = true;
    if(response.length < 50) {
      hasNext = false;
    }
    else if (response.length === 50) {
      // we have to request the next page and see if there is a response
      const nextPage = await this.getRequest(this.buildUrl(params, currentPage + 1));
      if(nextPage.length === 0) {
        hasNext = false;
      }
    }
    return hasNext;
  }

  render () {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <p className={classes.title}>{this.title}</p>
          <p className={classes.subtitle}>{this.subtitle}</p>
        </div>
        <JobForm updateResults={this.updateResults}/>
        {
          this.state.loading && 
          <div className={classes.splash}>
          <CircularProgress className={classes.progress} size={32} color='secondary'/>
          </div>
        }
        <JobTable jobList={this.state.jobList}
                  pagination={this.state.pagination}
                  page={this.state.page}
                  hasNext={this.state.hasNext}
                  requestPage={this.requestPage}
                  />
      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(homeStyles)(Home);