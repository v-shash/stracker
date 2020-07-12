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


const AccountPrinciples = props => {
    const { className, ...rest } = props;

    const classes = useStyles();


    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <CardHeader
                subheader="The information can be edited"
                title="Principles & Work Philosophy"
            />
            <CardContent>
            </CardContent>

        </Card>
    )
}

AccountPrinciples.propTypes = {

}

export default AccountPrinciples
