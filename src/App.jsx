import { Route, Routes } from 'react-router-dom'
import CategoryCollection from './components/category-collection'
import CollectionPage from './components/collection-page'
import Contact from './components/contact'
import Homepage from './components/homepage'
import NewsPage from './components/news-page'
import PostPage from './components/post-page'
import Footer from './shared/footer'

const App = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Homepage />} />
				<Route path='/news' element={<NewsPage />} />
				<Route path='/collections' element={<CategoryCollection />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/post/:id' element={<PostPage />} />
				<Route path='/collection/:id' element={<CollectionPage />} />
			</Routes>
			<Footer />
		</>
	)
}

export default App
