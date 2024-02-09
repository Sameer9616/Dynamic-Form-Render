import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import DateInput from '../new component/Date';
import Checkbox from '../new component/Checkbox';
import Text from '../new component/Text';
import Select from '../new component/Select';

interface FormRenderProps {
  formSchema: {};
}

const FormRender: React.FC<FormRenderProps> = ({ formSchema = {} }) => {
  const [formData, setFormData] = useState({});

  const handleFieldChange = (fieldName, e) => {
    // Update the formData state when a field change
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

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
        <div key={index} className="col-6 form-field d-flex">
          {field}
        </div>
      ))}</>);
  };

  return (
    <div className='container'>
      <form > {/* Use the onSubmit prop */}
        <div className='row'>
          {renderField(formSchema)}
        </div>
        <div className="mt-2">
          <Button color="primary" type="submit">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormRender;
