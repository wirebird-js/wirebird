import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React, { FC } from 'react';
import { useErrorBoundary, withErrorBoundary } from 'react-use-error-boundary';

const useErrorBoundaryStyles = makeStyles((_theme) => ({
    errorContainer: {
        display       : 'flex',
        flexDirection : 'column',
        justifyContent: 'center',
        alignItems    : 'center',
        height        : '100%',
    },
    errorMessage: {
        textAlign: 'center',
    },
}));
export function withUiErrorBoundary<Props>(Component: FC<Props>) {
    const WithUiErrorBoundary: FC<Props> = withErrorBoundary((props) => {
        const [error, retry] = useErrorBoundary();
        const classes = useErrorBoundaryStyles();
        if (error) {
            return (
                <div className={classes.errorContainer}>
                    <Typography
                        variant="h5"
                        color="textPrimary"
                        className={classes.errorMessage}
                    >
                        Something went wrong...
                    </Typography>
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={retry}
                        >
                            Retry
                        </Button>
                    </div>
                    <Typography
                        variant="body1"
                        color="textPrimary"
                        className={classes.errorMessage}
                    >
                        <pre>{(error as Error).message}</pre>
                    </Typography>
                </div>
            );
        }
        return <Component {...props} />;
    });
    return WithUiErrorBoundary;
}
