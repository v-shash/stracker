import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid,
    Button,
    TextField
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {}
}));


const AccountSkills = props => {
    const { className, ...rest } = props;

    const classes = useStyles();


    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <CardHeader
                subheader="The information can be edited"
                title="Skills"
            />
            <CardContent>
            </CardContent>

        </Card>
    )
}

AccountSkills.propTypes = {

}

export default AccountSkills
