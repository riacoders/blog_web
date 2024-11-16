import logo from '../assets/logo.png'

const Logo = ({width, height}) => {
	return (
		<div className='Logo'>
			<img style={{width, height}} src={logo} alt='logo' />
		</div>
	)
}

export default Logo
