import React from 'react';

export const Prism = ({ children, ...props }) => {
    return React.createElement('pre', props, React.createElement('code', null, children));
};

export default { Prism };
