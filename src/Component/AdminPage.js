import React from "react";
import MaterialTable from "material-table";


export default function AdminPanel() {
    const [state, setState] = React.useState({
        columns: [
            { title: "BookName", field: "bookName" },
            { title: "AuthorName", field: "authorName" },
            { title: "BookPrice", field: "bookPrice" },
            { title: "ISBN", field: "isbn" },
            { title: "Quantity", field: "quantity" },
            { title: "Description", field: "description" },
            { title: "ImageUrl", field: "imageurl" },
            { title: "PublishingYear", field: "publishingYear" },
        ],
        data: []
    });

    return (
        <MaterialTable
            title="Admin Panel"
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            setState(prevState => {
                                const data = [...prevState.data];
                                data.push(newData);                                
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState(prevState => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            setState(prevState => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }, 600);
                    })
            }}
        />
    );
}
