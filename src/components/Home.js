import React from 'react'
import bigfoot from './bigfoot.png'

export const Home = () => {
	return (
		<div>
			<h1 className="home-title">Big Foot Sightings!</h1>
			<img src={bigfoot} className="bigfoot" alt="bigfoot" width="500" height="600" />
		</div>
	)
}
