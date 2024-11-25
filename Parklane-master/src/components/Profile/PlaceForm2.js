import {useRef, useState} from 'react';
import classes from './PlaceForm2.module.css';

const isEmpty = value => value.trim() === '';

const isTenChars = value => value.trim().length === 10;

const checkSlot = (t1, t2) => {
	const currentDate = new Date();
	return ((t2 > t1) && (new Date(t1) >= currentDate));
};

const timeDiff = (t1, t2) => {
	const date1 = new Date(t1);
	const date2 = new Date(t2);

	const ms = date2.getTime() - date1.getTime();
	const minutes = ms / (1000 * 60);
	return (minutes / 60);
};

const ID = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", 1, 2, 3, 4, 5, 6, 7, 8, 9, "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
"U", "V", "W", "X", "Y", "Z"];


const PlaceForm2 = (props) => {
	const [formInputsValidity, setFormInputsValidity] = useState({
		name: true,
		city: true,
		phone: true,
		vehicle: true,
		license: true,
		timeSlot: true
	});

	const [isConfirmed, setIsConfirmed] = useState(false);
	const [amount, setAmount] = useState(null);
	const [ticketId, setTicketId] = useState(null);

	const nameInputRef = useRef();
	const cityInputRef = useRef();
	const phoneInputRef = useRef();
	const vehicleInputRef = useRef();
	const licenseInputRef = useRef();
	const entryInputRef = useRef();
	const exitInputRef = useRef();

	const amountHandler = () => {
		const enteredName = nameInputRef.current.value;
		const enteredCity = cityInputRef.current.value;
		const enteredPhone = phoneInputRef.current.value;
		const enteredVehicle = vehicleInputRef.current.value;
		const enteredLicense = licenseInputRef.current.value;
		const enteredEntryTime = entryInputRef.current.value;
		const enteredExitTime = exitInputRef.current.value;

		const enteredNameIsValid = !isEmpty(enteredName);
		const enteredCityIsValid = !isEmpty(enteredCity);
		const enteredPhoneIsValid = isTenChars(enteredPhone);
		const enteredVehicleIsValid = !isEmpty(enteredVehicle);
		const enteredLicenseIsValid = !isEmpty(enteredLicense);
		const enteredTimeslotIsValid = checkSlot(enteredEntryTime, enteredExitTime);

		setFormInputsValidity({
			name: enteredNameIsValid,
			city: enteredCityIsValid,
			phone: enteredPhoneIsValid,
			vehicle: enteredVehicleIsValid,
			license: enteredLicenseIsValid,
			timeSlot: enteredTimeslotIsValid
		});

		const formIsValid = (
		  enteredNameIsValid &&
		  enteredCityIsValid &&
		  enteredPhoneIsValid &&
		  enteredVehicleIsValid &&
		  enteredLicenseIsValid &&
		  enteredTimeslotIsValid
		);

		if (!formIsValid) {
		  return;
		}
		
		const hours = timeDiff(enteredEntryTime, enteredExitTime);
		setAmount((hours * props.price).toFixed(2));

		let randomIndex;
		let x = '';
		for (let i = 0; i < 6; i++) {
			randomIndex = Math.floor(Math.random() * ID.length);
			x += ID[randomIndex];
		}

		setTicketId(x);
		setIsConfirmed(true);
	};

	const bookingHandler = (event) => {
		event.preventDefault();

		const enteredName = nameInputRef.current.value;
		const enteredCity = cityInputRef.current.value;
		const enteredPhone = phoneInputRef.current.value;
		const enteredVehicle = vehicleInputRef.current.value;
		const enteredLicense = licenseInputRef.current.value;
		const enteredEntryTime = entryInputRef.current.value;
		const enteredExitTime = exitInputRef.current.value;
		
		props.onBook({
			name: enteredName,
			city: enteredCity,
			phone: enteredPhone,
			vehicle: enteredVehicle,
			license: enteredLicense,
			timeSlot: [enteredEntryTime, enteredExitTime],
			id: ticketId,
			amount: amount
		});
	};

	const nameControlClasses = `${classes.field1} ${formInputsValidity.name ? '' : classes.invalid}`;
	const cityControlClasses = `${classes.field} ${formInputsValidity.city ? '' : classes.invalid}`;
	const phoneControlClasses = `${classes.field} ${formInputsValidity.phone ? '' : classes.invalid}`;
	const vehicleControlClasses = `${classes.field} ${formInputsValidity.vehicle ? '' : classes.invalid}`;
	const licenseControlClasses = `${classes.field} ${formInputsValidity.license ? '' : classes.invalid}`;
	const timeSlotControlClasses = `${classes.field} ${formInputsValidity.timeSlot ? '' : classes.invalid}`;
	const outputControlClasses = `${classes.output} ${isConfirmed ? classes.op : ''}`;

	const op = (isConfirmed ? `$${amount}` : 'Net amount');	

	return (
		<section className = {classes.section}>
			<div className = {classes.container}>
				<div className = {classes.title}>Registro</div>
				<div className = {classes.subtitle}>Entradas y Salidas</div>
				<div className = {classes.space}></div>
				<form onSubmit = {bookingHandler}>
					<div className = {classes.group}>
						<div className = {nameControlClasses}>
							<input className = {classes.input} type = 'text' id = 'name' placeholder = " " ref = {nameInputRef} />
							<div className = {`${classes.cut} ${classes.cuttop}`}></div>
							<label htmlFor = "name" className = {classes.placeholder}>Nombre completo</label>
							{!formInputsValidity.name && <p>¡Por favor, introduzca un nombre válido!</p>}
						</div>        

						<div className = {cityControlClasses}>
							<input className = {classes.input} type = 'text' id = 'rescity' placeholder = " " ref = {cityInputRef} />
							<div className = {`${classes.cut} ${classes.cutbig3}`}></div>
							<label htmlFor = "rescity" className = {classes.placeholder}>
								<div className = {classes.city1}>Ciudad de residencia</div>
								<div className = {classes.city2}>Ciudad</div>
							</label>
							{!formInputsValidity.city && <p>¡Por favor, introduzca una ciudad válida!</p>}
						</div>

						<div className = {phoneControlClasses}>
							<input className = {classes.input} type = 'text' id = 'phone' placeholder = " " ref = {phoneInputRef} />
							<div className = {classes.cut}></div>
							<label htmlFor = "phone" className = {classes.placeholder}>Telefono</label>
							{!formInputsValidity.phone && <p>¡Por favor, introduzca un contacto válido!</p>}
						</div>

						<div className = {vehicleControlClasses}>
							<input className = {classes.input} type = 'text' id = 'vehicle' placeholder = " " ref = {vehicleInputRef} />
							<div className = {`${classes.cut} ${classes.cutbig2}`}></div>
							<label htmlFor = "vehicle" className = {classes.placeholder}>Modelo de vehículo</label>
							{!formInputsValidity.vehicle && <p>¡Por favor, introduzca un vehículo válido!</p>}
						</div>

						<div className = {licenseControlClasses}>
							<input className = {classes.input} type = 'text' id = 'license' placeholder = " " ref = {licenseInputRef} />
							<div className = {`${classes.cut} ${classes.cutbig1}`}></div>
							<label htmlFor = "license" className = {classes.placeholder}>Matrícula</label>
							{!formInputsValidity.license && <p>¡Por favor, introduzca una licencia válida!</p>}
						</div>

						<div className = {timeSlotControlClasses}>
							<input className = {classes.input2} type = 'datetime-local' id = 'entrytime' placeholder = " " ref = {entryInputRef} />
							<div className = {`${classes.cut} ${classes.cutdate1}`}></div>
							<label htmlFor = "entrytime" className = {classes.placeholder}>Hora de entrada</label>
						</div>
						<div className = {timeSlotControlClasses}>
							<input className = {classes.input2} type = 'datetime-local' id = 'exittime' placeholder = " " ref = {exitInputRef} />
							<div className = {`${classes.cut} ${classes.cutdate2}`}></div>
							<label htmlFor = "exittime" className = {classes.placeholder}>Hora de salida</label>
						</div>
						{!formInputsValidity.timeSlot && <p className={classes.center}>¡Por favor, seleccione una franja horaria válida!</p>}
					</div>
					
					{isConfirmed && <button type="text" className={classes.submit2}>CONFIRMAR</button>}
				</form>
				{!isConfirmed && <button type="text" className={classes.submit} onClick = {amountHandler}>ENVIAR</button>}
			</div>
		</section>
	);
}

export default PlaceForm2;
