import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { StaticQuery, graphql, withPrefix } from "gatsby";
import "../styles/bulma/bulma.sass";
import "../styles/main.sass";
import Header from "./Header";
import Footer from "./Footer";
import NewsBanner from "./NewsBanner";

let siteUrl = process.env.SITE_URL || "https://synthetix.io";

class Layout extends Component {
	state = {
		contentIsHidden: false
	};

	render() {
		const { children, ...rest } = this.props;
		const { contentIsHidden } = this.state;
		return (
			<StaticQuery
				query={graphql`
					query SiteDataQuery {
						site {
							siteMetadata {
								keywords
								description
								title
								twitterUrl
								mediumUrl
								discordUrl
								redditUrl
								ogImage
								dashboardUrl
								mintrUrl
							}
						}
					}
				`}
				render={data => {
					let { title, keywords, description, ogImage } = data.site.siteMetadata;
					return (
						<>
							<Helmet>
								<html lang="en" />
								<meta name="description" content={description} />
								<meta name="keywords" content={keywords} />
								<meta name="title" property="og:title" content={title} />
								<meta property="og:type" content="website" />
								<meta property="og:image" content={siteUrl + withPrefix(ogImage)} />
								<meta property="og:description" content={description} />
							</Helmet>
							<NewsBanner />
							<Header
								siteTitle={title}
								onMenuToggle={menuIsVisible =>
									this.setState({ contentIsHidden: menuIsVisible })
								}
							/>
							{contentIsHidden ? null : <>{children}</>}
							{contentIsHidden ? null : <Footer {...data.site.siteMetadata} />}
							<a className="discord-btn" href="https://discord.gg/AEdUHzt" />
						</>
					);
				}}
			/>
		);
	}
}

Layout.propTypes = {
	children: PropTypes.node.isRequired
};

export default Layout;
