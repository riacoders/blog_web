import { Link } from 'react-router-dom'

const NewsCard = ({ title, description, timeStamp, postLink, image }) => {
	return (
		<Link to={postLink} className='NewsCard'>
			<div className='news-container'>
				<div className='img-box'>
					<img src={image} alt='news image' />
				</div>
				<div className='info'>
					<div className='title-desc'>
						<h3>{title}</h3>
						<p>{description}</p>
					</div>
					<div className='post-info'>
						<span>
							<p className='post-time'>{timeStamp}</p>
						</span>
						{/* <span className='time-author'>
							<p>| {getReadingTime(description)} read</p>
						</span> */}
					</div>
				</div>
			</div>
			{/* <div className='news-commands'>
				<ul>
					<li>
						<button className='btn-i-controls'>
							<CiHeart style={{ color: 'red', fontSize: '38px !important' }} />
						</button>
							<p className='post-meta-info'>12</p>
					</li>
					
					<li>
						<button className='btn-i-controls'>
							<CiShare1 style={{ color: 'blue' }} />
						</button>
					</li>
				</ul>
			</div> */}
		</Link>
	)
}

export default NewsCard
