/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/en/1.9.0/site-config for all the possible
// site configuration options.

/*
// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: 'User1',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/image.jpg'.
    image: '/img/undraw_open_source.svg',
    infoLink: 'https://www.facebook.com',
    pinned: true,
  },
];
*/

const BASE_URL = '/BC2019-Gama-Site/';

const siteConfig = {

	/*
	 *		SETUP
	 *	Modify at your own risk
	 */
  url: 'https://roiarthurb.github.io', // Your website URL
  baseUrl: BASE_URL, // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: 'BC2019-Gama-Site',
  organizationName: 'RoiArthurB',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  algolia: {
    apiKey: '0f9f28b9ab9efae89810921a351753b5',
    indexName: 'github',
  },

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
    defaultLang: 'javascript',
  },

  // If you have users set above, you add it here:
//  users,

  // On page navigation for the current documentation page.
  //onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

	/*	
	  JS
	*/
  // Add custom scripts here that would be placed in <script> tags.
  scripts: [
	{
		src: 'https://buttons.github.io/buttons.js',
		async: true
	},
	{
		src: 'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
		async: true
	},
	{
		src: BASE_URL + 'js/code-block-buttons.js',
		async: true
	}
  ],

	/*	
	  CSS
	*/
  stylesheets: [
	'/css/code-block-buttons.css'
  ],


	/*
	 *		METADATA
	 *	Website title, etc
	 */
  title: 'GAMA-Platform', // Title for your website.
  tagline: 'GAMA, modeling made easy',


	/*
	 *		ENHANCE FRAMEWORK
	 *	Structure apply to the website (url format, etc)
	 */

	/*	HEADER	*/
  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {index: 'Home', label: 'Index'},
    {doc: 'Home', label: 'Docs'},
//    {doc: 'doc4', label: 'API'},
    {page: 'help', label: 'Help'},
    {blog: true, label: 'Blog'},
    // Determines search bar position among links
    { search: true },
    // Determines language drop down position among links
    { languages: true }
  ],


	/*
	 *		ENHANCE UI
	 *	Look'n'Feel
	 */

	/* path to images for header/footer */
  headerIcon: 'resources/images/general/GamaPlatform.png',
  footerIcon: 'resources/images/general/GamaPlatform.png',
  favicon: 'resources/images/general/GamaPlatform.png',

	/* Colors for website */
  colors: {
    primaryColor: '#a44b0d',
    secondaryColor: '#723409',
  },

	/* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

	/* This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.	*/
  copyright: `Copyright © ${new Date().getFullYear()} GAMA-Platform`,

  	/*	Open Graph and Twitter card images.	*/
  ogImage: 'resources/images/general/GamaPlatform.png',
  twitterImage: 'resources/images/general/GamaPlatform.png',

  // Show documentation's last contributor's name.
  // enableUpdateBy: true,

  // Show documentation's last update time.
  // enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',
};

module.exports = siteConfig;
