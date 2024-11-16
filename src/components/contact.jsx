import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../shared/logo'
import Navbar from '../shared/navbar'

const Contact = () => {
	const botToken = import.meta.env.VITE_APP_BOT_API
	const chatId = import.meta.env.VITE_APP_CHAT_ID

	const sendTelegramMessage = async (name, number) => {
		try {
			const response = await axios.post(
				`https://api.telegram.org/bot${botToken}/sendMessage`,
				{
					chat_id: chatId,
					text: `-----------------------\n Name: ${name}\n Phone: ${number}\n-----------------------\n Message: ${usermessage}`,
				}
			)

			if (response.status === 200) {
				document.querySelector('.popup-success').style.display = 'block'
			} else {
				document.querySelector('.popup-nosuccess').style.display = 'block'
			}
		} catch (error) {
			console.error('Error:', error)
		}
	}

	const [username, setUsername] = useState('')
	const [usernumber, setUsernumber] = useState('')
	// const [useraccount, setUseraccount] = useState("");
	const [usermessage, setUsermessage] = useState('')
	const handleSubmit = async e => {
		e.preventDefault()
		const name = username
		const number = `+998${usernumber}`
		// const account = useraccount;
		const message = usermessage
		sendTelegramMessage(name, number, message)
		setUsername('')
		setUsermessage('')
		setUsernumber('')
		// setUseraccount("");
		let chk = document.myform.poscheckbox
		chk.checked = false
	}

	function clrForm() {
		setUsername('')
		setUsernumber('')
		setUsermessage('')
		// setUseraccount("");
	}

	function closePopup() {
		document.querySelector('.popup').style.display = 'none'
		document.querySelector('.popup-nosuccess').style.display = 'none'
	}

	const [validationMessage, setValidationMessage] = useState('')
	const [phoneNumberDetails, setPhoneNumberDetails] = useState('')

	const handlePhoneNumber = e => {
		e.preventDefault()
		const phoneNumber = e.target.value
		const pattern = /\d{9}/
		if (phoneNumber.match(pattern) && phoneNumber.length == 9) {
			const formattedPhoneNumber = `+998 (${phoneNumber.slice(
				0,
				2
			)}) ${phoneNumber.slice(2, 5)} ${phoneNumber.slice(
				5,
				7
			)} ${phoneNumber.slice(7, 9)}`
			setValidationMessage("Telefon raqam to'g'ri kiritildi.")
			setPhoneNumberDetails(' Raqamingiz: ' + formattedPhoneNumber)
		} else {
			setValidationMessage('Telefon raqam xato kiritildi.')
			setPhoneNumberDetails('')
		}
	}

	return (
		<>
			<Navbar logoSize={'60px'} />
			<div className='Contact' id='contact'>
				<div className='popup popup-success'>
					<div className='top'>
						<div className='left'>
							<div className='success-checkmark'>
								<div className='check-icon'>
									<span className='icon-line line-tip'></span>
									<span className='icon-line line-long'></span>
									<div className='icon-circle'></div>
									<div className='icon-fix'></div>
								</div>
							</div>
						</div>
						<div className='right'>
							<h1>Xabaringiz yuborildi.</h1>
							<p>
								Yangiliklarni kuzatib borish uchun kanalimizga obuna bo'ling!
							</p>
						</div>
					</div>
					<div className='bottom'>
						<a href='https://t.me/sifatedu'>A'zo bo'lish</a>
						<button onClick={closePopup} className='btn-i-cancel'>
							Orqaga
						</button>
					</div>
				</div>
				<div className='popup popup-nosuccess'>
					<div className='top'>
						<div className='left'>
							<ion-icon name='close-circle-outline'></ion-icon>
						</div>
						<div className='right'>
							<h1>Xabaringiz yuborildi.</h1>
							<p>
								Yangiliklarni kuzatib borish uchun kanalimizga obuna bo'ling!
							</p>
						</div>
					</div>
					<div className='bottom'>
						<a href='https://t.me/sifatedu'>A'zo bo'lish</a>
						<button onClick={closePopup} className='btn-i-cancel'>
							Orqaga
						</button>
					</div>
				</div>
				<div className='con-main'>
					<div className='left'>
						<div className='con-img-box'>
							<Link to='/'>
								<Logo height={'80px'} />
							</Link>
						</div>
						<div className='sidebar'>
							<h1>Bizning maqsad</h1>
							<p>
								Sayt vatanimiz yoshlarini STEM fanlariga, jumadan injeneriyaga,
								qiziqtirish va yurtdoshlarimizga mazkur soha haqida qiziqarli
								bilimlarni ulashish maqsadida ochilgan. Loyiha Islomov Humoyun
								va Islomov Ravshan tomonidan asos solingan. Hozirda sayt
								faoliyati ular boshchiligidagi bir guruh volontyor tomonidan
								amalga oshiriladi.
							</p>
							<h1>Biz bilan bog'lanish</h1>
							<p>
								Sayt faoliyati haqida takliflar, murojaatlar va volontyorlik
								so'rovlari uchun quyidagi botga ma'lumotlaringizni, jumladan
								telefon raqamingizni yozib qoldiring, yoki quyidagi email va
								telefon raqamiga murojaat qiling!
							</p>
							<p className='p2'>Shuningdek bizning kontaktlarimiz: </p>
							<ul>
								<li>
									<a href='tel:+998991750099'>
										<i className='fa-solid fa-phone'></i>
										<p>+998 (99) 175 0099</p>
									</a>
								</li>
								<li>
									<a href='mailto:admin@everyday-engineering.uz'>
										<i className='fa-brands fa-email'></i>
										<p>admin@everyday-engineering.uz</p>
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className='right'>
						<form onSubmit={handleSubmit} name='myform'>
							<div className='item'>
								<label htmlFor='name'>Ism va familiya</label>
								<input
									type='text'
									name='name'
									placeholder='F.I.O'
									value={username}
									onChange={e => setUsername(e.target.value)}
									required
								/>
							</div>
							<div className='item'>
								<label htmlFor='phoneNumber'>Telefon raqam</label>
								<div className='num-r-contact'>
									<span>+998</span>
									<input
										id='phoneNumber'
										type='text'
										name='phoneNumber'
										placeholder='00 000 0000'
										value={usernumber}
										onChange={e => {
											setUsernumber(e.target.value)
											handlePhoneNumber(e)
										}}
										required
									/>
								</div>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										gap: '10px',
									}}
									className='phoneres'
								>
									<p
										style={{ fontSize: '12px', margin: '0' }}
										id='validationMessage'
									>
										{validationMessage}
									</p>
									<p
										style={{ fontSize: '12px', margin: '0' }}
										id='phoneNumberDetails'
									>
										{phoneNumberDetails}
									</p>
								</div>
							</div>
							<div className='item'>
								<label htmlFor='message'>Xabar yozing</label>
								<textarea
									name='message'
									value={usermessage}
									onChange={e => setUsermessage(e.target.value)}
									required
									placeholder='Xabar'
								></textarea>
							</div>
							<div className='item'>
								<input
									type='submit'
									className='btn-i-primary-dark-hovered'
									value='Yuborish'
								/>
								<input onClick={clrForm} type='reset' value='Tozalash' />
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export default Contact
