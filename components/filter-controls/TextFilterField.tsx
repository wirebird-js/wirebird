import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import ClearIcon from '@material-ui/icons/Clear';
import debounce from 'lodash/debounce';
import React, {
    ChangeEvent,
    FC,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: theme.spacing(10),
        maxWidth: theme.spacing(20),
    },
}));

export interface ITextFilterFieldProps {
    onChange: (value?: string) => void;
    value?: string;
    label: string;
}

export const TextFilterField: FC<ITextFilterFieldProps> = ({
    onChange,
    value,
    label,
}) => {
    const classes = useStyles();

    const [internalValue, setInternalValue] = useState(value);

    const debouncedCommitChange = useMemo(
        () => debounce((value) => onChange(value), 400),
        [onChange]
    );

    const handleChange = useMemo(
        () => ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
            setInternalValue(value);
            debouncedCommitChange(value);
        },
        [onChange]
    );

    const handleClear = useCallback(() => {
        setInternalValue('');
        debouncedCommitChange('');
    }, [onChange]);

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    const inputProps = useMemo(() => {
        if (internalValue?.length) {
            return {
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton size="small" onClick={handleClear}>
                            <ClearIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            };
        }
        return undefined;
    }, [internalValue, handleClear]);

    return (
        <TextField
            className={classes.root}
            onChange={handleChange}
            value={internalValue === undefined ? '' : internalValue}
            label={label}
            InputProps={inputProps}
        />
    );
};
