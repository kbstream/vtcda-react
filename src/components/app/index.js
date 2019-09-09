import React, {Component, Fragment} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getMainInfo, getDate, getTime, getLink } from '../../actions';

import './app.scss';
import '../../month'
import {month} from "../../month";
class App extends Component {

	state = {
	  arr: [],
		date: {},
		time: '10:00',
		link: '',
		reminder: false,
		dlc: false,
		game: 'ETS'
	};

	handleChangeMainInfo = (e) => {
		const { value } = e.target;
		let arrMainInfo = value.split("\n");
		arrMainInfo.splice(0, 1);
		arrMainInfo.splice(2, 4);
		arrMainInfo.splice(4, 1);
		arrMainInfo.splice(9);

		arrMainInfo[7] = this.findCargo(arrMainInfo[7]);
		arrMainInfo[8] = this.findCargo(arrMainInfo[8]);

		this.setState({
			arr: arrMainInfo
		});

	};

	findCargo = (arr) => {
		let result;
		if(arr) {
			result = arr.match(/\((\w+)\)/);
			if(result) {
				return result[1];
			}
		}
	};

	handleChangeLink = e => {
		const { value } = e.target;
		this.setState({
			link: value
		})
	};

	handleChangeDate = (e) => {
		const {value} = e.target;
		if (value) {
			let arrDate = value.split("-");
			const monthNum = arrDate[1].replace(/^0+/, '');

			this.setState({
				date: {
					month: month[monthNum - 1],
					day: arrDate[2]
				}
			});
		} else {
			this.setState({
				date: {}
			});
		}
	};

	handleChangeCheckbox = (e) => {
		const name = e.target.dataset.checkbox;
		this.setState({
				[name]: e.target.checked
			}
		)
	};

	handleChangeRadio = (e) => {
		this.setState({
				game: e.target.value
			}
		)
	};

	handleChangeTime = (e) => {
		const { value } = e.target;
		this.setState({
			time: value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.getMainInfo(this.state.arr);
		this.props.getDate(this.state.date);
		this.props.getTime(this.state.time);
		this.props.getLink(this.state.link);
	};


	render() {
		const { reminder, dlc, game } = this.state;
		const { reducerDate, reducerTime, reducerMainInfo, reducerLink } = this.props;
		const otherCargo = (reducerMainInfo[8]) ? <span>или {reducerMainInfo[8]}</span> : null;
		const cargo = (reducerMainInfo[7]) ? <pre>Грузы: {reducerMainInfo[7]} {otherCargo}</pre> : null;

		const info = (
			<Fragment>
				<pre>{game} {(dlc) ? '+ DLC' : ''}</pre>
				<pre>{reducerMainInfo[4]}</pre>
				<pre>Старт: {reducerMainInfo[0]} ( {reducerMainInfo[1]} )</pre>
				<pre>{reducerMainInfo[5]}</pre>
				<pre>{reducerMainInfo[6]}</pre>
				{
					cargo
				}
			</Fragment>
		);


		let component;
		if(this.state.reminder) {
			component = (
				<div>
					<pre>$natural on the {reducerDate.day}th of {reducerDate.month} at {reducerTime} send @everyone</pre>
					{info}
					<pre>{reducerLink} to #анонс </pre>
				</div>
			)
		} else {
			component = (
				<div>
					<pre>@everyone</pre>
					{info}
					<pre>{reducerLink}</pre>
				</div>
			)
		}


		return (
			<div className="wrapper">
				<div className="row">
					<div className="column">
						<form onSubmit={this.handleSubmit}>
							<div>
								<textarea onChange={this.handleChangeMainInfo} className={'textarea header__textarea'} placeholder={'Информация о конове'}/>
								<input type="text" onChange={this.handleChangeLink} className={'link'} required placeholder={'Ссылка на конвой'}/>
								<div className={'flexbox checked-block'}>
									<div className={'radio-block'}>
										<label>
											<input type="radio" name='nameGame' value='ETS' checked={this.state.game === 'ETS'} onChange={this.handleChangeRadio} data-checkbox="dlc"/>
											ETS
										</label>
										<label>
											<input type="radio" name='nameGame' value='ATS' checked={this.state.game === 'ATS'} onChange={this.handleChangeRadio} data-checkbox="dlc"/>
											ATS
										</label>
									</div>
									<pre>+ </pre>
									<label>
										<input type="checkbox" onChange={this.handleChangeCheckbox} data-checkbox="dlc"/>
										DLC
									</label>
								</div>


							</div>
							<div>
								<label>
									<input type="checkbox" onChange={this.handleChangeCheckbox} data-checkbox="reminder"/>
									Reminder-Bot
								</label>
							</div>
							<div className="flexbox">
								<div>
									<input type="date" onChange={this.handleChangeDate} className={'input__time date'} disabled={!reminder}/>
									<input type="time" onChange={this.handleChangeTime} className={'input__time time'} disabled={!reminder} value={this.state.time}/>
								</div>
								<div>
									<button>Создать</button>
								</div>
							</div>
							<hr/>
							{component}
						</form>
					</div>
					<div className="column">
						<textarea className={'textarea textarea__right'} placeholder={"Для редактирования"}/>
					</div>
				</div>
			</div>
		);
	}
}


const mapStateToProps = state => {
	return {
		reducerMainInfo: state.reducerMainInfo,
		reducerTime: state.reducerTime,
		reducerDate: state.reducerDate,
		reducerLink: state.reducerLink
	}
};

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		getMainInfo,
		getTime,
		getDate,
		getLink
	},
	dispatch
);



export default connect(mapStateToProps, mapDispatchToProps)(App);