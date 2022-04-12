import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ToggleButton = ( props ) => {

    const [toggle, setToggle] = useState(false);
    const { defaultChecked, onChange, disabled, className } = props;

    useEffect(() => {
        if (defaultChecked) {
            setToggle(defaultChecked)
        }
    }, [defaultChecked]);

    const triggerToggle = () => {
        if ( disabled ) {
            return;
        }

        setToggle(!toggle);

        if ( typeof onChange === 'function' ) {
            onChange(!toggle);
        }
    }

    const toggleClasses = classNames('toggle', {
        'toggle--checked': toggle,
        'toggle--disabled': disabled
    }, className);

    return (
        <div onClick={triggerToggle} className={toggleClasses}>
            <div className="toggle-container">
                <div className="toggle-check">
                    <span>🌜</span>
                </div>
                <div className="toggle-uncheck">
                    <span>🌞</span>
                </div>
            </div>
            <div className="toggle-circle"></div>
            <input type="checkbox" aria-label="Toggle Button" className="toggle-input" />
        </div>
    );
}

ToggleButton.propTypes = {
    disabled: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
    icons: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.shape({
            checked: PropTypes.node,
            unchecked: PropTypes.node
        })
    ])
};

export default ToggleButton;