import React, { Component } from "react";
// import { store } from '../store/index';
// import { getGridData } from '../actions/index';

import Header from './_header';
import Row from './_row';
import '../css/dashboard.css';

class Dashboard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: []
		}
		// this.loadResults = this.loadResults.bind(this)
	}

	componentDidMount() {
		let sock = new WebSocket("ws://localhost:5001");
		let parsedJSON = {};
		let that = this;
		sock.onopen = () => {
			console.log("Socket connected successfully");
			let params = {
				type: "FETCH_DATA",
				pageSize: 100,
				pageNumber: 1
			}
			sock.send(JSON.stringify(params));
		}

		sock.onmessage = (event) => {

			try { parsedJSON = JSON.parse(event.data); }
			catch (e) {
				console.error("Invalid data");
			}
			this.setState({ data: parsedJSON });
			// that.loadResults(parsedJSON);
			// this.loadResults(parsedJSON).bind(this);
		}
		// debugger
		// this.loadResults(parsedJSON).bind(this);
	}

	// loadResults = (parsedJSON) => {
	// 	let params = {
	// 		data: parsedJSON
	// 	}
	// 	store.dispatch(getGridData(params));
	// }
	render() {
		// debugger
		// const {key} = this.props;
		const { data } = this.state;
		// const { data } = store.getState();

		const headerNames = [];

		if (data && data.length > 0) {
			for (var key in data[0]) {
				headerNames.push(key)
			}
		}

		return (
			<div className="table-wrapper">
				<table>
					<Header headerNames={headerNames} />
					<tbody>
						{data && data.map((curr, i) => {
							return <Row data={curr} index={i + 1} />
						})}
					</tbody>
				</table>
			</div>

		)
	}
}

export default Dashboard; 