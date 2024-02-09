import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import Text from '../new component/Text';
import DateInput from '../new component/Date';
import Checkbox from '../new component/Checkbox';
import Select from '../new component/Select';
import { useParams} from 'react-router-dom';
import { getTableData,updateTableData } from './Helper';
interface TableRenderProps {
  tablename: string;
  tableSchema: {};
}

const TableRender: React.FC<TableRenderProps> = ({ tablename, tableSchema }) => {
  const {viewname, id} = useParams();
  const [tableData,setTableData] = useState({});
  const handleTableDataUpdate = async () => {
    try {
      updateTableData(
        viewname,
        tablename,
        tableData["prim_id"],
        tableData,
        tableSchema
      )
    }
      catch (error) {
        console.error("Error updating data:", error);
      }
    
  };
  const fetchData = async () => {
    try {
      const response = await getTableData(viewname,tablename,id);
      const data = await response.json();
      setTableData(data);
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };
  useEffect(() => {
    if(id){
    fetchData();
    }
  }, [id]);

  const [isModalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({});

  const handleFieldChange = (fieldName, e) => {
    // Update the formData state when a field change
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const formFields = Object.keys(tableSchema);

  const renderField = (jsonData: any) => {
    const formFields = [];
    // console.log("yaya h ",jsonData);
    for (const key in jsonData) {
      // console.log("key idhar h",key);
      if (Object.hasOwnProperty.call(jsonData, key)) {
        // console.log("here the key",key);
        const typeSuffix = jsonData[key];
        // console.log("here the json key",typeSuffix);
        let component = null;
        if (typeSuffix === 'text') {
          component = <Text name={key} value={formData[key]} onChange={(e) => handleFieldChange(key, e)} />;
        } else if (typeSuffix === 'date') {
          component = <DateInput name={key} value={formData[key]} onChange={(e) => handleFieldChange(key, e)} />;
        } else if (typeSuffix === 'checkbox') {
          component = <Checkbox name={key} checkbox={formData[key]} onChange={(e) => handleFieldChange(key, e)} />;
        } else if (typeSuffix === 'select') {
          component = <input type="text" placeholder='select' />
          // You should have an 'options' prop to pass to the Select component
          const options = []; // Define your options array here
          component = <Select name={key} value={formData[key]} onChange={(e) => handleFieldChange(key, e)} options={options} />;
        }
        if (component) {
          formFields.push(
            <div key={key}>
              {/* <label>{key}</label> */}
              {component}
            </div>
          );
        }
      }
    }
    return (<>
      {formFields.map((field, index) => (
        <div key={index} className="col-6 pt-2">
          <span>{field}</span>
        </div>
      ))}</>);
  };

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>
              <Button className="bg-light text-dark" onClick={toggleModal}>
                +
              </Button>
            </th>
            {formFields.map((field, index) => (
              <th key={index}>{field}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{tablename}</td>
            {formFields.map((field, index) => (
              <td key={index}>{tableSchema[field]}</td>
            ))}
            </tr>
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add Data</ModalHeader>
        <ModalBody>
          <div className="row">
            {renderField(tableSchema)}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleTableDataUpdate} >
            Save
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default TableRender;
