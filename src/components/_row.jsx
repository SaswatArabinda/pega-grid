import React, { PureComponent } from 'react';

class Row extends PureComponent {
    createTable = (data) => {
        let table = [];
        let keys = []
        for (let key in data) {
            keys.push(key);
            table.push(<td>{data[key]}</td>);
        }
        return table;
    }


    render() {
        const { data, index } = this.props;
        return (
            <tr>
                <td>{index}</td>
                {this.createTable(data)}
            </tr>

        );
    }
}

export default Row;