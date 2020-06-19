import React, { useReducer, useRef, useEffect } from 'react';
import { selectStep, updateStep} from './redux/features/siteManager';
import { useSelector, useDispatch } from 'react-redux';

import { Power3, TweenMax } from 'gsap';

import './fonts/Azo-Sans-Bold/Azo-Sans-Bold.woff';
import './fonts/Azo-Sans-Light/Azo-Sans-Light.woff';
import './fonts/Elaine_D02/Elaine_D02.woff';
import './scss/app.scss';

function App() {
	const dispatch = useDispatch();
	let currentStep = useSelector(selectStep).step;
	let steps = useRef([]);
	const [userInput, setUserInput] = useReducer(
		(state, newState) => ({
			...state,
			...newState
		}), {
			email: '',
			checkbox: false,
			firstName: '',
			lastName: '',
		}
	);
	const { email, checkbox, firstName, lastName } = userInput;
	const handleChange = (e) => {
		const name = e.target.name;
		const newValue = e.target.value;
		if (name === 'checkbox') {
			setUserInput({ 'checkbox': !checkbox });
		} else {
			setUserInput({ [name]: newValue });
		}
	}
	const showNextStep = () => {
		dispatch(updateStep(currentStep + 1));
		TweenMax.to(steps.current[currentStep + 1], 1, {
			opacity: 1,
			ease: Power3.easeInOut
		})
	}
	const encode = (data) => {
		return Object.keys(data)
			.map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
			.join('&');
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (email && firstName && lastName) {
			console.log({
				email,
				firstName,
				lastName
			})
			fetch("/", {
					method: "POST",
					headers: { "Content-Type": "application/x-www-form-urlencoded" },
					body: encode({ "form-name": "contact", ...userInput })
				})
				.then(() => console.log("Success"))
				.catch(error => console.log(error));
		}
		TweenMax.to(steps.current[currentStep], 0.5, {
			opacity: 0,
			onComplete: showNextStep,
			ease: Power3.easeInOut
		});
	}
	useEffect(() => {
		TweenMax.to(steps.current[0], 1, {
			opacity: 1,
			ease: Power3.easeInOut
		})
	}, []);
	return (
		<div className="App">
			<div className="container">
				<div className="inner">

					{currentStep === 0 && (
						<div ref={el => steps.current[0] = el} className="newsletter step-1">
							<h1>join the list</h1>
							<div className="form-container">
								<h2>SIGN UP FOR THE IN-Dex NEWSLETTER.</h2>
								<form onSubmit={handleSubmit}>
									<div className="form-group">
										<input onChange={handleChange} placeholder="Email" name="email" type="text" value={email} required />
										<button type="submit">Next</button>
									</div>
									<div className="form-group">
										<input onChange={handleChange} id="checkbox" name="checkbox" value={checkbox} type="checkbox" checked={checkbox} required />
										<label htmlFor="checkbox">
											I agree to receive information from Interactive Nerd in
												accordance with the following <a href="/">Privacy Policy</a>
										</label>
									</div>
								</form>
							</div>
						</div>
					)}

					{currentStep === 1 && (
						<div ref={el => steps.current[1] = el} className="newsletter step-2">
							<h1>join the list</h1>
							<div className="form-container">
								<h2>ALMOST DONE! PLEASE ENTER YOUR FIRST AND LAST NAME.</h2>
								<form onSubmit={handleSubmit} data-netlify="true" netlify name="newsletter">
									<div className="form-group">
										<input type="hidden" name="form-name" value="contact" />
										<input onChange={handleChange} value={firstName} placeholder="First Name" name="firstName" type="text" required />
										<input onChange={handleChange} value={lastName} placeholder="Last Name" name="lastName" type="text" required />
										<button type="submit">Sign Up</button>
									</div>
								</form>
							</div>
						</div>
					)}

					{currentStep === 2 && (
						<div ref={el => steps.current[2] = el} className="newsletter step-3">
							<h1>congratulations!</h1>
							<div className="form-container">
								<h2>Thank You For Signing Up!</h2>
								<p> Look out for the latest news on your favorite shows.</p>
							</div>
						</div>
					)}

				</div>
			</div>
		</div>
	);
}

export default App;
