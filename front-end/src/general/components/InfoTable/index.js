function InfoTable(props) {
    const { colWidth, headItems, dataItems } = props;

    return (
        <table style={{tableLayout: "fixed"}}>
            <colgroup>
            {
                colWidth.map( (item, index) => { return (
                    <col key={index} style={{width: item}} />
                )})
            }
            </colgroup>

            <thead>
            <tr>
            {
                headItems.map(item => {
                    return (
                        <th>{item}</th>
                    )
                })
            }
            </tr>
            </thead>

            <tbody>
            {
                dataItems.map(item => {
                    return (
                        <tr key={Math.random()}>
                            {
                                item.map(subItem => {
                                    return <td>{subItem}</td>
                                })
                            }
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
};


export default InfoTable;
