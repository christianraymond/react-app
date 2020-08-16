import React, { Component } from 'react';
import classes from './Footer.module.css';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa'

class Footer extends Component {

    render() {
        return (
            <footer className={classes.SiteFooter}>
                <p>Copyright &copy; {new Date().getFullYear()} All Rights Reserved by <a href="https://christianraymond.github.io/"> christiangubana</a>.</p>
                <ul className={classes.SocialIcons}>
                    <li><a className={classes.GitHub} href="https://github.com/christianraymond/burger"><i><FaGithub /></i></a></li>
                    <li><a className={classes.Twitter} href="https://twitter.com/Christiangubana"><i><FaTwitter /></i></a></li>
                    <li><a className={classes.Linkedin} href="https://www.linkedin.com/in/christian-ngubana-ba0668105/"><i><FaLinkedinIn /></i></a></li>
                </ul>
            </footer >
        );
    }
}

export default Footer;
