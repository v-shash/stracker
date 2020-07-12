import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { AccountEducation, AccountPrinciples, AccountProjects, AccountExperience, AccountSkills, AccountIntro } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Account = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >

        <Grid
          item
          lg={12}
          md={12}
          xl={12}
          xs={12}
        >
          <AccountIntro />
        </Grid>

        <Grid
          item
          lg={12}
          md={12}
          xl={12}
          xs={12}
        >
          <AccountExperience />
        </Grid>

        <Grid
          item
          lg={12}
          md={12}
          xl={12}
          xs={12}
        >
          <AccountEducation />
        </Grid>

        <Grid
          item
          lg={12}
          md={12}
          xl={12}
          xs={12}
        >
          <AccountProjects />
        </Grid>

        <Grid
          item
          lg={12}
          md={12}
          xl={12}
          xs={12}
        >
          <AccountPrinciples />
        </Grid>

        <Grid
          item
          lg={12}
          md={12}
          xl={12}
          xs={12}
        >
          <AccountSkills />
        </Grid>
      </Grid>
    </div>
  );
};

export default Account;
