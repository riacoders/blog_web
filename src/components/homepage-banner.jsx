import { Link } from 'react-router-dom'

function HomepageBanner() {
	return (
		<div className='HomepageBanner'>
			<div className='info-sec'>
				<div className='left'>
					<h1>
						Everyday <br /> Engineering
					</h1>
					<p>Murakkab sohaga yangicha nigoh.</p>
					<Link to='/news'>Yangiliklarni o'qish</Link>
				</div>
				<div className='right'></div>
			</div>
		</div>
	)
}

export default HomepageBanner
