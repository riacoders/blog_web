import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { API_REQUEST } from '../services'
import Loader from '../shared/loader'
import NewsCard from '../shared/news-card'

const MainNews = () => {
	const [categoryResults, setCategoryResults] = useState([])
	const [blogResults, setBlogResults] = useState([])
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [categoryResponse, blogResponse] = await Promise.all([
					axios.get(API_REQUEST.categories),
					axios.get(API_REQUEST.blogs),
				])
				setCategoryResults(categoryResponse.data.data)
				setBlogResults(blogResponse.data.data)
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<div className='error-message'>
					<p>Something went wrong: {error}</p>
				</div>
			) : (
				<div className='MainNews'>
					{/* <div className='tab-bar'>
						<ul>
							{categoryResults.length > 0 ? (
								categoryResults.map(cty => (
									<li key={cty._id}>
										<div>
											<p>{cty.name}</p>
											<span className=''></span>
										</div>
									</li>
								))
							) : (
								<p>Kategoriyalar mavjud emas!</p>
							)}
						</ul>
					</div> */}
					<h1 style={{ fontSize: '1.2rem' }}>Boshqa yangiliklar</h1>
					<div className='news-cards'>
						{blogResults.length > 0 ? (
							blogResults
								.slice(-3)
								.map(blg => (
									<NewsCard
										key={blg._id}
										title={
											blg.title.length > 100
												? `${blg.title.slice(0, 100)}...`
												: blg.title
										}
										description={
											blg.description.length > 300
												? `${blg.description.slice(0, 300)}...`
												: blg.description
										}
										timeStamp={moment(blg.updatedAt).format('MMMM Do, YYYY')}
										postLink={`/post/${blg._id}`}
										image={`${API_REQUEST.endpoint}/${blg.image} `}
									/>
								))
						) : (
							<p>Yangiliklar mavjud emas!</p>
						)}
					</div>
				</div>
			)}
		</>
	)
}

export default MainNews
