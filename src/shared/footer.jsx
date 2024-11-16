import { FaFacebook, FaInstagram, FaLinkedinIn } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import Logo from './logo'

const Footer = () => {
	return (
		<div className='Footer'>
			<div className='foo-container'>
				<ul>
					<li>
						<Logo height={'80px'} />
					</li>
					<li>
						<ul className='foo-nav'>
							<li>
								<Link to='/'>Bosh sahifa</Link>
							</li>
							<li>
								<Link to='/collections'>Maqolalar</Link>
							</li>
							<li>
								<Link to='/news'>Yangiliklar</Link>
							</li>
							<li>
								<Link to='/contact'>Biz bilan bog'lanish</Link>
							</li>
						</ul>
					</li>
					<li>
						<div className='socials'>
							<ul className='foo-soc-item'>
								<li>
									<a href='#'>
										<FaInstagram />
									</a>
								</li>
								<li>
									<a href='#'>
										<FaFacebook />
									</a>
								</li>
								<li>
									<a href='#'>
										<FaLinkedinIn />
									</a>
								</li>
							</ul>
						</div>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Footer
