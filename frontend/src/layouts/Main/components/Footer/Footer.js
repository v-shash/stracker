import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Favorite from '@material-ui/icons/Favorite';
import { Typography, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Footer = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography variant="body1">
        &copy;{' '}
        <Link
          component="a"
          href="mailto:mhusseini1208@gmail.com"
          target="_blank"
        >
          Mo Husseini
        </Link>
        . 2020
      </Typography>
      <Typography variant="caption">
        Created with
        {/* <Favorite style={{ fontSize: 15, paddingTop: 4, color: 'black' }} /> */}
        <Link component="a" href="https://reactjs.org/" target="_blank">
          <img
            alt="Logo"
            src="/images/logos/react.svg"
            width="20"
            height="20"
            style={{ paddingTop: 4 }}
          />
        </Link>

        - Theme by <Link component="a" href="https://devias.io/" target="_blank">Devias.io</Link>
      </Typography>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
