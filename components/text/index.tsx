import React from 'react';
interface Props {
  style?: any;
  children: any
}
const StyledText: React.FC<Props> = ({ style, children }) => {
    return <p style={style}>{children}</p>
};

export default StyledText;
