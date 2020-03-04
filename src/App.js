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
import 'antd/dist/antd.css';
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
	 *
	 * @param {boolean} - searching
	 * @param {string} - searchKey
	 */
	searchForRepos = (searching, searchKey) => {
		
		if(searching) {
			this.setState({ loading: true })
		}
		
		
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
			
			return searching
				? this.setState((prevState) => {
					return {
						loading: false,
						cardList: result.data.search.nodes
					}
				})
				: this.saveSearch(result.data.search.nodes)
		})
		.catch((error) => {
			this.setState({ loading: true })
		})
	}

	/**
	 * onSearchChange
	 *
	 * @param {string} - searchKey
	 */
	onSearchChange = searchKey => {
		this.setState({
			searchKey
		})
		return searchKey.length > 2 && this.searchForRepos(false, searchKey)
	};

	/**
	 * saveSearch
	 *
	 * @param {object} - key
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
	 * toggleSearch
	 *
	 */
	toggleSearch = () => {
		console.log('called')
		const { searchKey } = this.state
		this.setState({
			toggleSearchView: true,
		}, () => this.searchForRepos(true, searchKey))
	}
	
	/**
	 * deleteCard
	 *
	 * @param {string} - nameWithOwner
	 */
	deleteCard = (nameWithOwner) => {
		const list = this.state.cardList
		const cardList = list.filter((activity) => activity.nameWithOwner !== nameWithOwner);
		this.setState({ cardList })
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
			      dataSource={dataSource}
			      searchKey={searchKey}
			      toggleSearch={this.toggleSearch}
		      />
		
		      <div className="App-body">
			      {
				      toggleSearchView && (
					      <Card
						      deleteCard={this.deleteCard}
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
