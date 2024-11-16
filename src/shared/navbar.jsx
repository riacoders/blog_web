import { useState } from 'react'
import { CiMenuFries, CiSearch } from 'react-icons/ci'
import { Link, useLocation } from 'react-router-dom'
import Logo from './logo'

const Navbar = ({ logoSize }) => {
	const location = useLocation()
	const [visibilityNavs, setVisibilityNaws] = useState(false)

	const handleClick = () => {
		setVisibilityNaws(!visibilityNavs)
	}

	return (
		<div className='Navbar'>
			<Link to={'/'} className='brand'>
				<Logo height={logoSize} />
			</Link>
			<div className={`nav-items ${visibilityNavs ? 'show' : ''}`}>
				<ul>
					<li>
						<Link
							style={
								location.pathname === '/'
									? { color: '#f01414' }
									: { color: '#333' }
							}
							to='/'
						>
							Bosh sahifa
						</Link>
					</li>
					<li>
						<Link
							style={
								location.pathname === '/collections'
									? { color: '#f01414' }
									: { color: '#333' }
							}
							to='/collections'
						>
							Maqolalar
						</Link>
					</li>
					<li>
						<Link
							style={
								location.pathname === '/news'
									? { color: '#f01414' }
									: { color: '#333' }
							}
							to='/news'
						>
							Yangiliklar
						</Link>
					</li>
					<li>
						<Link
							to='/contact'
							style={
								location.pathname === '/contact'
									? { color: '#f01414' }
									: { color: '#333' }
							}
						>
							Biz bilan bog'lanish
						</Link>
					</li>
				</ul>
			</div>
			<div className='commands'>
				<span>
					<input type='text' name='search' id='search' />
					<button className='btn-i-controls'>
						<CiSearch />
					</button>
				</span>
			</div>
			<div className='mobile-menu'>
				<button className='circle-btn' onClick={handleClick}>
					<CiMenuFries style={{ fontSize: '24px' }} />
				</button>
			</div>
		</div>
	)
}

export default Navbar
