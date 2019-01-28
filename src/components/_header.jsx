import React, { PureComponent } from 'react';

class Header extends PureComponent {
    render() {
        const { headerNames } = this.props;
        return (
            <thead>
                <tr>
                    <th></th>
                    {headerNames.map((curr, i) => {return <th>{curr.split('_').join(' ')}</th> })}
                </tr>
            </thead>

        );
    }
}

export default Header;