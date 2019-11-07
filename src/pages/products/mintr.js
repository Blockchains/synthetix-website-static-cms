import React from "react";
import { graphql, withPrefix } from "gatsby";
import "../index.sass";
import Layout from "../../components/layout";
import "./mintr.sass";
import mintrLogo from "../../resources/products/mintr.svg";
import mintrButton from "../../resources/products/mintr-button.svg";

const MintrPage = props => {
	const { mintrUrl, discordUrl } = props.data.site.siteMetadata;
	let mintrScreenshot = withPrefix(`/img/mintr-screenshot.png`);
	return (
		<Layout>
			<div className="mintr-page">
				<section className="section header-section">
					<div className="container">
						<div className="header-image">
							<img src={mintrLogo} />
						</div>
						<div className="page-subtitle">
							Mintr is a dApp for SNX holders to mint Synths and participate in the
							Synthetix Network.
						</div>
					</div>
				</section>
				<section className="section is-white mintr-about">
					<div className="container">
						<div className="section-title sp7 pt-10">
							Mintr is a dApp for SNX holders
						</div>
						<div className="section-desc sp1">
							Mintr is a dApp for SNX holders to perform a variety of actions in the
							Synthetix Network. It provides a clean and intuitive interface that
							allows users to mint and burn Synths, manage their collateralisation
							ratio, collect fees generated by circulating Synths, send sUSD to a
							selling queue, view their balances and Mintr history, unlock escrowed
							SNX, and more.
						</div>
						<div className="mintr-button">
							<a href={mintrUrl} target="_blank">
								<img src={mintrButton} />
							</a>
						</div>
					</div>
				</section>
				<section className="section how-it-works">
					<div className="container">
						<div className="columns">
							<div className="column is-half first-column">
								<div className="section-title sp5 white">How it Works</div>
								<div className="section-desc sp6 pb-40">
									You can connect to Mintr using MetaMask or one of two kinds of
									hardware wallets: Trezor and Ledger. To use Mintr with any of
									these kinds of wallets, you must sign a transaction giving
									permission for Mintr to interact with your wallet, which you
									will be asked to do when connecting your wallet.
									<br />
									<br />
									For hardware wallets that store several wallet addresses, you
									can choose between the addresses when you connect.
									Alternatively, once you have chosen a wallet address you can
									swap to another one from the top-right drop-down in the menu.
									<br />
									<br />
									If you have any more questions, please come join our community
									on{" "}
									<a href={discordUrl} target="_blank">
										Discord
									</a>
									.
								</div>
							</div>
							<div className="column is-half second-column">
								<div className="mintr-screenshot">
									<img src={mintrScreenshot} />
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="section is-white minting-synths">
					<div className="container">
						<div className="section-title sp5 pb-40">
							Minting Synths and the Collateralisation Ratio
						</div>
						<div className="section-desc sp4">
							Synthetix allows synthetic assets (Synths) to be minted against the
							value of SNX tokens. This is done by locking SNX into a smart contract
							as collateral at a ratio of 750% to the Synths minted. For example, this
							means that if 1000 SNX is locked at a value of $0.10 USD, 13.3 sUSD can be
							minted against it. 750% has been chosen to provide ample protection
							against price fluctuations.
							<br />
							<br />
							Your Collateralisation Ratio affects the proportion you receive of fees
							generated by Synth transactions. If your Ratio drops below 750%, you will not be able to claim fees until you have brought it back above 750%. This is to incentivise SNX holders from maintaining the entire Network
							Collateralisation Ratio (i.e. value of total locked SNX against value of
							total Synths) as well as keeping Synth prices stable.
						</div>
					</div>
				</section>
			</div>
		</Layout>
	);
};
export const query = graphql`
	query MintrPageQuery {
		site {
			siteMetadata {
				mintrUrl
				discordUrl
			}
		}
	}
`;

export default MintrPage;
