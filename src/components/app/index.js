import React, {Component} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getMainInfo, getDate, getTime, getLink } from '../../actions';

import './app.scss';
import '../../month'
import {month} from "../../month";
class App extends Component {

	state = {
		date: {},
		time: '21:30',
		link: '',
		reminder: true
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

	handleChangeTime = (e) => {
		const { value } = e.target;
		this.setState({
			time: value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.getDate(this.state.date);
		this.props.getTime(this.state.time);
		this.props.getLink(this.state.link);
	};


	render() {
		const { reminder } = this.state;
		const { reducerDate, reducerTime, reducerLink } = this.props;

		return (
			<div className="wrapper">
				<div className="row">
					<div className="column">
						<form onSubmit={this.handleSubmit}>
							<div>
								<input type="text" onChange={this.handleChangeLink} className={'link'} required placeholder={'Ссылка'}/>
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
							<div>
								<pre>$natural on the {reducerDate.day}th of {reducerDate.month} at {reducerTime} send @everyone {reducerLink} to #стримы </pre>
							</div>
						</form>
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