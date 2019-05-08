/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

/*	FIRST MAIN BLOCK	*/
class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <img src={siteConfig.headerIcon} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        {siteConfig.tagline}
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    const ImgSoftware = props => (
      <div className="pluginWrapper">
        <img src={props.img_src} alt="GAMA-Platform Software" />
      </div>
    );

    const Design = props => (    
      <style dangerouslySetInnerHTML={{__html: `
        .fixedHeaderContainer, footer{
          display: none;
        }

        .navPusher{
          padding: 0;
        }

        .homeSplashFade {
            max-height: 100vh;
            background: linear-gradient(#121020,#21233e);
            overflow: hidden;
        }
        .homeSplashFade {
            min-height: 700px;
            max-height: 100vh;
            background: linear-gradient(#121020,#21233e);
            position: relative;
            overflow: hidden;
        }
        .projectTitle {
          color: white;
        }
        .projectTitle > small {
          width: 50%;
          margin: 1.5em auto 0 auto;
        }

        .promoSection {
            margin: 3em;
        }
      `}} />
    );

    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href={docUrl('Home')}>Documentation</Button>
            <Button href={docUrl('Tutorials')}>Tutorials</Button>
          </PromoSection>
          <ImgSoftware img_src={`${baseUrl}img/flipper.png`} />
          <Design/>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
      </div>
    );
  }
}

module.exports = Index;
