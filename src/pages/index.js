import React, { Fragment } from "react";
import { graphql, Link } from "gatsby";
import "./index.sass";
import Layout from "../components/layout";
import CurrencyBox from "../components/CurrencyBox";
import icoUser1 from "../resources/ico-user-level-1.svg";
import icoUser2 from "../resources/ico-user-level-2.svg";
import icoUser3 from "../resources/ico-user-level-3.svg";
import icoTriangle from "../resources/ico-triangle.svg";
import icoShield from "../resources/ico-shield.svg";
import icoEye from "../resources/ico-eye.svg";
import Modal from "../components/Modal";
import Player from "@vimeo/player";
import UiImg from "../components/UiImg";

const bottomLabelTx = "Q4 2018";
const currencies = [
	{ nCurrency: "sUSD", currency: "USD", currencyNumber: "$1.00" },
	{ nCurrency: "sEUR", currency: "EURO", currencyNumber: "€1.00", bottomLabel: bottomLabelTx },
	{ nCurrency: "sJPY", currency: "YEN", currencyNumber: "¥1.00", bottomLabel: bottomLabelTx },
	{ nCurrency: "sAUD", currency: "AUD", currencyNumber: "$1.00", bottomLabel: bottomLabelTx },
	{ nCurrency: "sKRW", currency: "WON", currencyNumber: "₩1.00", bottomLabel: bottomLabelTx },
	{ nCurrency: "sXAU", currency: "ounce/gold", currencyNumber: "1.00", bottomLabel: bottomLabelTx }
];

class IndexPage extends React.Component {
	state = {
		isOpen: false,
		showThanks: false,
		emailAddress: ""
	};

	player = null;

	startVideo() {
		this.player = new Player("video-how-it-works", {
			id: 254987969,
			width: 640
		});

		this.player.play();
	}

	pauseVideo() {
		if (this.player) this.player.pause();
	}

	handleChange = e => this.setState({ [e.target.name]: e.target.value });

	submitEmail = e => {
		e.preventDefault();
		const { emailAddress } = this.state;
		if (!emailAddress) return;
		fetch("/", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: this.encode({
				"form-name": "mailing-list",
				emailAddress: emailAddress
			})
		})
			.then(() => console.log("Success!"))
			.catch(error => console.log("error", error));
		this.setState({ showThanks: true });
	};

	encode = data => {
		return Object.keys(data)
			.map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
			.join("&");
	};

	render() {
		let { isOpen, showThanks, emailAddress } = this.state;
		const { swapprUrl, mintrUrl, dashboardUrl } = this.props.data.site.siteMetadata;

		return (
			<Layout>
				<div className="home-page">
					<section className="section pb-30">
						<div className="container">
							<h1 className="page-title">
								<UiImg src={"/assets/synthetix-title.png"} alt="Synthetix" isResponsive />
							</h1>
							<div className="page-subtitle">
								Synthetix, formerly Havven, is a synthetic assets platform that enables the creation
								of on-chain, cryptocurrency-backed synthetic assets, including stablecoins,
								metal-pegged dollars, and indices.
							</div>
							<div className="has-text-centered pb-10">
								<Link to="/announcement" className="is-button is-announcement">
									<span>NEW</span>
									<span>Havven is now Synthetix. Learn more about our rebrand here!</span>
								</Link>
							</div>
						</div>
					</section>
					<section className="section currency-section pb-110 pt-30">
						<div className="container">
							<div className="columns is-centered currency-row">
								{currencies.slice(0, 3).map(el => (
									<CurrencyBox {...el} key={el.currency} />
								))}
							</div>
							<div className="columns is-centered currency-row pb-110">
								{currencies.slice(3).map(el => (
									<CurrencyBox {...el} key={el.currency} />
								))}
							</div>
						</div>

						<div className="section-title">
							Synthetix provides on-chain synthetic assets (Synths), including dollars pegged to a
							variety of currencies, metals, and more to come!
						</div>
						<div className="section-desc">
							Synths are currently available in sUSD, sEUR, sJPY, sAUD, sKRW, sXAU, and we’ll be
							adding more in the near future!
						</div>
					</section>
					<section className="section is-padded">
						<div className="section-title is-white is-narrow pb-50">
							Synthetix is built for engineers
						</div>
						<CodeBox />
						<div className="has-text-centered">
							<a
								href="https://developer.havven.io/"
								target="_blank"
								className="is-button is-blue w-270"
								rel="noopener noreferrer"
							>
								View our Developer Portal
							</a>
						</div>
					</section>
					<section className="section is-white is-padded pb-110">
						<div className="section-title is-large w-auto">
							Get rewarded for maintaining stability
						</div>
						<div className="section-desc pb-70">
							SNX holders who mint Synths are entitled to receive fees generated by all Synth
							transactions.
						</div>
						<div className="columns is-centered get-rewarded-boxes">
							<a className="column" href={dashboardUrl} target="_blank" rel="noopener noreferrer">
								<div className="c-top">
									<img src={icoUser2} alt="For new and experienced users" />
									<div className="p1 red">
										For New and <br /> Experienced Users
									</div>
								</div>
								<div className="c-bottom">
									<div className="p2 red">Dashboard</div>
									<div className="p3">An overview of the Synthetix network</div>
								</div>
							</a>
							<a className="column" href={swapprUrl} target="_blank" rel="noopener noreferrer">
								<div className="c-top">
									<img src={icoUser1} alt="For new users" />
									<div className="p1 blue">For New Users</div>
								</div>
								<div className="c-bottom">
									<div className="p2 blue">Swappr</div>
									<div className="p3">Easily swap ETH for SNX and sUSD</div>
								</div>
							</a>
							<a className="column" href={mintrUrl} target="_blank" rel="noopener noreferrer">
								<div className="c-top">
									<img src={icoUser3} alt="For experienced users" />
									<div className="p1 green">For Experienced Users</div>
								</div>
								<div className="c-bottom">
									<div className="p2 green">Mintr</div>
									<div className="p3">Use your SNX to mint Synths and collect fees</div>
								</div>
							</a>
						</div>
					</section>
					<section className="section">
						<div className="section-title is-white pt-60">Our network is decentralised</div>
						<div className="section-desc mb-80">
							The Synthetix Network is designed to be decentralised and trustless.
						</div>
						<div className="columns is-centered feature-boxes">
							<div className="column pb-40">
								<div className="c-img">
									<img src={icoTriangle} alt="Trustless" />
								</div>
								<div className="p1">Trustless</div>
								<div className="p2">
									A distributed pool of token holders are responsible for maintaining stability.
								</div>
							</div>
							<div className="column pb-40">
								<div className="c-img">
									<img src={icoShield} alt="Censorship resistant" />
								</div>
								<div className="p1">Censorship Resistant</div>
								<div className="p2">
									Collateral is provided by individual SNX holders, which means it can’t be seized.
								</div>
							</div>
							<div className="column pb-40">
								<div className="c-img">
									<img src={icoEye} alt="Transparent" />
								</div>
								<div className="p1">Transparent</div>
								<div className="p2">
									Our collateral is on-chain, so doesn’t require pesky third party audits.
								</div>
							</div>
						</div>
					</section>
					<section className="section is-blue subscribe-section pt-110 pb-130 is-hidden">
						<div className="container">
							{!showThanks ? (
								<Fragment>
									<div className="sub-title pb-30">Subscribe to the Synthetix Mailing List</div>
									<form
										name="mailing-list"
										method="post"
										data-netlify="true"
										data-netlify-honeypot="bot-field"
										onSubmit={this.submitEmail}
									>
										<div className="columns sub-inputs">
											<div className="column is-narrow">
												<input type="hidden" name="bot-field" />
												<input
													name="emailAddress"
													type="text"
													className="input"
													placeholder="Enter your Email Address"
													value={emailAddress}
													onChange={this.handleChange}
												/>
											</div>
											<div className="column is-narrow">
												<button className="is-button is-blue">Subscribe</button>
											</div>
										</div>
									</form>
								</Fragment>
							) : (
								<div className="sub-title pb-30">Thanks for Subscribing!</div>
							)}
						</div>
					</section>
				</div>
				<Modal
					isOpen={isOpen}
					onRequestClose={() => {
						this.setState({ isOpen: false });
						this.pauseVideo();
					}}
					className="is-video"
				>
					<div data-vimeo-id="254987969" data-vimeo-width="840" id="video-how-it-works" />
				</Modal>
			</Layout>
		);
	}
}

export default IndexPage;

const CodeBox = () => (
	<div className="ui-box is-code code-regular mb-50">
		<span className="code-comment">
			{"//"} Initialize havven-js library with any signer (Metamask, Trezor, Ledger, PrivateKey
			supported)
		</span>
		<br />
		<span className="code-green">const </span>
		{"{"} HavvenJs {"}"} = <span className="code-green">require</span>(
		<span className="code-white">'havven-js'</span>
		);
		<br />
		<span className="code-green">const </span> metaMaskSigner ={" "}
		<span className="code-green">new</span> HavvenJs.signers.Metamask();
		<br />
		<span className="code-green">const </span> havjs = new HavvenJs(
		{"{"}
		signer: metaMaskSigner
		{"}"}
		);
		<br />
		<br />
		<span className="code-comment">
			{"//"} Transfer stablecoins to any ethereum address, wallet or smart contract
		</span>
		<br />
		<span className="code-green">const </span>
		txObj = <span className="code-green">await</span> havjs
		<br />
		&nbsp;&nbsp;&nbsp;.StablePayments
		<br />
		&nbsp;&nbsp;&nbsp;.transfer(
		<span className="code-white">'0x5C545CA7f9D34857664FDCe6aDC22edcF1D5061f'</span>,<br />
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;havjs.util.parseEther(
		<span className="code-white">'100'</span>
		));
	</div>
);

export const query = graphql`
	query HomePageQuery {
		site {
			siteMetadata {
				dashboardUrl
				swapprUrl
				mintrUrl
			}
		}
	}
`;
