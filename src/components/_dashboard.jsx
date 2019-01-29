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
			data: [],
			loadingFlag: false,
			page: 1
		}
		window.addEventListener('scroll', this.handleScroll.bind(this))

		this.sock = new WebSocket("ws://localhost:5001");
		this.getComment = this.getComment.bind(this)
		this.getDataFromSocket = this.getDataFromSocket.bind(this)
	}

	handleScroll(e) {
		//this function will be triggered if user scrolls
		let body = document.body,
			html = document.documentElement;

		let height = Math.max(body.scrollHeight, body.offsetHeight,
			html.clientHeight, html.scrollHeight, html.offsetHeight);

		let windowHeight = height;
		let totalScrolled = window.innerHeight + window.scrollY;

		if (totalScrolled + 100 > windowHeight) { //user reached at bottom
			console.log("reached bottom")
			if (!this.state.loadingFlag) { //to avoid multiple request
				this.setState({
					loadingFlag: true,
				});
				this.getComment();
			}
		}
	}

	getComment() {
		//method to fetch comments will concat result to state.comment
		var nextPage = this.state.page + 1; //increase the page count
		this.setState({
			loadingFlag: true,
			page: nextPage
		});
		this.getDataFromSocket(nextPage)
	}

	getDataFromSocket(page) {
		let parsedJSON = {};
		let params = {
			type: "FETCH_DATA",
			pageSize: 100,
			page: page
		}
		if (this.sock.readyState) {
			this.sock.send(JSON.stringify(params));
		} else {
			this.sock.onopen = () => {
				console.log("Socket connected successfully");
				this.sock.send(JSON.stringify(params));
			}
		}

		this.sock.onmessage = (event) => {
			try { parsedJSON = JSON.parse(event.data); }
			catch (e) {
				console.error("Invalid data");
			}
			this.setState({
				data: this.state.data.concat(parsedJSON),
				loadingFlag: false
			});
		}
	}

	componentDidMount() {
		this.getDataFromSocket(this.state.page);
	}

	render() {
		const { data, loadingFlag } = this.state;
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
				<p className={loadingFlag ? 'loader' : 'loader hide'} >Loading...</p>
			</div>

		)
	}
}

export default Dashboard; 