// react
import React from 'react';

import eye from '../../assets/eye.png';
import fork from '../../assets/fork.png';
import star from '../../assets/star.png';

export const Card = props => {
	const { cardList } = props
	
	return (
		<div>
			<p className="App-intro">
				<code>You have {cardList.length} result(s)</code>
			</p>
			
			{
				cardList.map((result) => {
					const {
						name, url, nameWithOwner, owner, watchers, forkCount, stargazers
					} = result
					const { login, avatarUrl } = owner
					console.log(result)
					return (
						<div className="App-card">
							
							<div
								style={{
									height: '100%',
									width: '40%',
								}}
							>
								<img
									style={{
										height: '100%',
										width: '100%',
										borderRadius: '8px'
									}}
									src={avatarUrl}
									alt="Avatar"
								/>
							</div>
							
							
							<div
								style={{
									height: '100%',
									width: '60%',
									margin: '3%',
									display: "flex",
									flexDirection: "column",
									justifyContent: "space-between"
								}}
							>
								<div>
									<a
										style={{
											textDecoration: 'none',
										}}
										target="_blank"
										href={`${url}`}
									>
										{name.charAt(0).toUpperCase() + name.slice(1)}
									</a>
									
									<p
										style={{
											textDecoration: 'none',
										}}
									>
										{login}
									</p>
								</div>
								
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "space-between",
										marginBottom: '3%'
									}}
								>
									
									<div className="App-bottom-card">
										<div
											style={{
												height: '100%',
												width: '50%',
											}}
										>
											<img
												style={{
													height: '100%',
													width: '100%',
												}}
												src={eye}
												alt="Avatar"
											/>
										</div>
										
										<a
											style={{
												textDecoration: 'none',
												marginTop: '8%'
											}}
										>
											{watchers.totalCount}
										</a>
									</div>
									
									<div className="App-bottom-card">
										<div
											style={{
												height: '100%',
												width: '50%',
											}}
										>
											<img
												style={{
													height: '100%',
													width: '100%',
												}}
												src={star}
												alt="Avatar"
											/>
										</div>
										
										<a
											style={{
												textDecoration: 'none',
												marginTop: '8%'
											}}
										>
											{stargazers.totalCount}
										</a>
									</div>
									
									<div className="App-bottom-card">
										<div
											style={{
												height: '100%',
												width: '50%',
											}}
										>
											<img
												style={{
													height: '50%',
													width: '50%',
													marginLeft: '30%',
													marginTop: '15%'
												}}
												src={fork}
												alt="Avatar"
											/>
										</div>
										
										<a
											style={{
												textDecoration: 'none',
												marginTop: '8%'
											}}
										>
											{forkCount}
										</a>
									</div>
									
								</div>
								
								
							</div>
							
							
							{/*<div*/}
							{/*	style={{*/}
							{/*		display: "flex",*/}
							{/*		justifyContent: "space-between"*/}
							{/*	}}*/}
							{/*>*/}
							{/*	<a*/}
							{/*		style={{ textDecoration: 'none' }}*/}
							{/*		target="_blank"*/}
							{/*		href={`${url}`}*/}
							{/*	>*/}
							{/*		{name.charAt(0).toUpperCase() + name.slice(1)}*/}
							{/*	</a>*/}
							{/*</div>*/}
						</div>
					)
				})
			}
			
			
		</div>
	)
}


export default Card
