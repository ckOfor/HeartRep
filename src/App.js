// react library
import React, { Component } from 'react';

// react third-party libraries
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { gql } from 'apollo-boost';

// constants
import * as routes from './constants/routes';

// common
import Header from './common/Header'

// styles
import './App.css';

// Yes, this is an unsafe way ;)
const TOKEN = process.env.REACT_APP_TOKEN;

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
      Authorization: `token ${TOKEN}`,
    },
  }),
  cache: new InMemoryCache(),
});

class App extends Component {
	
	state={
		dataSource: [],
		searchKey: '',
	}
	
	/**
	 * onSearchChange
	 *
	 * @param value
	 */
	onSearchChange = searchKey => {
		this.setState({ searchKey });
		return searchKey.length > 3 && this.searchForRepos()
	};
	
	/**
	 * searchForRepos
	 *
	 */
	searchForRepos = () => {
		const { searchKey } = this.state
		
		client
		.query({
			query: gql`
				query searchRepos($queryString: String!, $first: Int!, $after: String) {
					search(
						query: $queryString,
						type: REPOSITORY,
						first: $first,
						after: $after
					) {
						repositoryCount
						nodes {
							... on Repository {
								name
								owner {
									login
									url
									avatarUrl
								}
								url
								nameWithOwner
								forkCount
								watchers {
									totalCount
								}
								stargazers {
									totalCount
								}
							}
						}
						pageInfo {
							endCursor
							hasNextPage
						}
					}
				}
			`, variables: { "queryString": searchKey,
				"first": 5,
				"after": null }
		})
		.then(result => {
			// console.log(result.data.search.nodes)
			this.saveSearch(result.data.search.nodes)
			
		})
		.catch((error) => {
			console.log(error)
		})
	}
	
	saveSearch = (data) => {
		const dataSource = []
		data.map((results) => {
			console.log(results)
			const newObject = {
				value: results.name,
				label: results.name
			}
			dataSource.push(newObject)
		})
		
		this.setState({ dataSource })
	}
	
	/**
	 * onSubmit
	 *
	 * @param value
	 */
	onSubmit = searchKey => {
		this.setState({ searchKey });
	}
	
  render() {
		const { dataSource, searchKey } = this.state
	  console.log(this.state)
	  
    return (
      <ApolloProvider client={client}>
	      <Router>
		      <Header
			      onSearchChange={this.onSearchChange}
			      onSubmit={this.onSubmit}
			      dataSource={dataSource}
			      searchKey={searchKey}
		      />
		
		      <Route
			      exact
			      path={routes.HOME}
			      component={() => (
				      <div className="App-content_large-header">
				
				      </div>
			      )}
		      />
	      </Router>
      </ApolloProvider>
    );
  }
}

export default App;
