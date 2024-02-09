import React, { useEffect } from 'react';
import { getSchemaObject, handleCreateView, handleFieldAdd, handleSubViewCreate } from "./Helper";
export const processCommand = async (command: string) => {

    //process cmd and save to local stroage
    convertToJson(command);
}


const convertToJson = (command: string) => {

    if (command) {
        const splitCmd = command.split(" ")
        if (splitCmd.length > 1) {
            findFieldType(splitCmd[0], splitCmd[1])
        }
    }
}

//Emplyee vw
//e.g : fistName tb --> add a text box
const findFieldType = async (prefix: string, suffix: string) => {
    // Parse viewjson from localStorage
    let viewjson = JSON.parse(localStorage.getItem("viewjson"));

    switch (suffix) {
        case 'vw':
            await createViewJson(prefix);
            break;
        case 'fr':
            await createFormTableJson(prefix, 'fr');
            break;
        case 'gr':
            await createFormTableJson(prefix, 'gr');
            break;
        case 'dt':
            createJsonForComponent(prefix, 'date', viewjson.viewtype, viewjson.subview);
            break;
        case 'dd':
            createJsonForComponent(prefix, 'select', viewjson.viewtype, viewjson.subview);
            break;
        case 'cb':
            createJsonForComponent(prefix, 'checkbox', viewjson.viewtype, viewjson.subview);
            break;
        default:
            createJsonForComponent(prefix, 'text', viewjson.viewtype, viewjson.subview);
    }
}

const createViewJson = async (viewName: string) => {
    const viewjson = {
        name: viewName,
        tables: [],
    };
    localStorage.setItem("viewjson", JSON.stringify(viewjson));
    if (viewName) {
        await handleCreateView(viewName, viewjson);
    }
    // const command = JSON.parse(localStorage.getItem("viewName"));
    window.location.href=`/view/${viewName}`;

}

const createFormTableJson = async (name: string, type: string) => {

    if (name) {
        const subviewName = `${name}`;
        let viewjson = JSON.parse(localStorage.getItem("viewjson"));
        if (type === "fr") {
            viewjson = {
                ...viewjson,
                form: {
                    name: name,
                    data: {},
                },
            };
        }
        else {
            viewjson.tables.push({
                name: name,
                data: {},
            });
        }

        localStorage.setItem("viewjson", JSON.stringify(viewjson));

        await handleSubViewCreate(name, subviewName, type, viewjson);
    }
};
const createJsonForComponent = async (prefix: string, componentType: string, viewtype: string, subviewname: string) => {
    const viewjson = JSON.parse(localStorage.getItem("viewjson"));
    if (viewtype === "gr") {
        const table = viewjson.tables.find((table: any) => table.name === subviewname);
        if (table) {
            table.data[prefix] = componentType;
        }
    } else {
        viewjson.form.data[prefix] = componentType;
    }
    localStorage.setItem("viewjson", JSON.stringify(viewjson));

    const sbname = viewtype === "gr" ? subviewname : viewjson.form.name;
    await handleFieldAdd(viewjson.name, sbname, viewtype, prefix, viewjson);
}

