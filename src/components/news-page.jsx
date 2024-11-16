import Navbar from '../shared/navbar'
import Header from './header'
import MainNews from './main-news'

const NewsPage = () => {
	return (
		<div className='Homepage'>
			<Navbar logoSize={'60px'} />
			<Header />
			<MainNews />
		</div>
	)
}

export default NewsPage
