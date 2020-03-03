// react library
import React, { Component } from 'react';

// react third-party libraries
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { gql } from 'apollo-boost';

// common
import Header from './common/Header'

// styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Card from './components/Card/Card'

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
		cardList: [],
		searchKey: '',
		toggleSearchView: false,
		loading: false
	}

	/**
	 * searchForRepos
	 *
	 */
	searchForRepos = () => {
		const { searchKey } = this.state
		this.setState((prevState) => {
			return {
				loading: !prevState.loading,
			}
		})
		
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
				"first": 100,
				"after": null }
		})
		.then(result => {
			
			this.setState((prevState) => {
				return {
					loading: !prevState.loading,
					cardList: result.data.search.nodes
				}
			})
			
			this.saveSearch(result.data.search.nodes)
		})
		.catch((error) => {
			console.log(error)
			this.setState((prevState) => {
				return {
					loading: !prevState.loading,
				}
			})
		})
	}

	/**
	 * onSearchChange
	 *
	 * @param value
	 */
	onSearchChange = searchKey => {
		this.setState({ searchKey });
		return searchKey.length > 2 && this.searchForRepos()
	};

	/**
	 * saveSearch
	 *
	 * @param data
	 */
	saveSearch = (data) => {
		const dataSource = []
		data.map((results) => {
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
	onSubmit = ({ value }) => {
		this.setState({ searchKey: value }, () => this.toggleSearch())
	}

	toggleSearch = () => {
		console.log(this.state.searchKey)
		this.setState((prevState) => {
			return {
				toggleSearchView: true
			}
		}, () => this.searchForRepos())
	}

  render() {
		const {
			dataSource, searchKey, toggleSearchView, cardList, loading
		} = this.state
	  
    return (
      <ApolloProvider client={client}>
	      
	      <div
		      style={{
		      	height: '100vh',
		      }}
	      >
		      <Header
			      onSearchChange={this.onSearchChange}
			      onSubmit={this.onSubmit}
			      dataSource={dataSource}
			      searchKey={searchKey}
			      toggleSearch={this.toggleSearch}
		      />
		
		      <div className="App-body">
			      {
				      toggleSearchView && (
					      <Card
						      loading={loading}
						      cardList={cardList}
					      />
				      )
			      }
		      </div>
		     
	      </div>
      </ApolloProvider>
    );
  }
}

export default App;
