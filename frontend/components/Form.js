import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';

// Validation error messages
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L',
};

// Yup validation schema
const schema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, validationErrors.fullNameTooShort)
    .max(20, validationErrors.fullNameTooLong)
    .required('full name is required'),
  size: Yup.string()
    .oneOf(['S', 'M', 'L'], validationErrors.sizeIncorrect)
    .required('size is required'),
  toppings: Yup.array().of(Yup.string()), // Array of topping IDs as strings
});

// Toppings data
const toppings = [
  { topping_id: '1', text: 'Pepperoni' },
  { topping_id: '2', text: 'Green Peppers' },
  { topping_id: '3', text: 'Pineapple' },
  { topping_id: '4', text: 'Mushrooms' },
  { topping_id: '5', text: 'Ham' },
];

// Get initial form values
const getInitialValues = () => ({
  fullName: '',
  size: '',
  toppings: [],
});

// Get initial error messages
const getInitialErrors = () => ({
  fullName: '',
  size: '',
  toppings: '',
});

export default function Form() {
  const [values, setValues] = useState(getInitialValues());
  const [errors, setErrors] = useState(getInitialErrors());
  const [serverSuccess, setServerSuccess] = useState();
  const [serverFailure, setServerFailure] = useState();
  const [formEnabled, setFormEnabled] = useState(false);

  // Validate the whole form on values change
  useEffect(() => {
    schema.isValid(values).then(setFormEnabled);
  }, [values]);

  // Handle input changes
  const onChange = (evt) => {
    const { type, name, value, checked } = evt.target;

    if (type === 'checkbox') {
      // Handle toppings checkbox input
      const newToppings = checked
        ? [...values.toppings, name] // Add topping
        : values.toppings.filter((topping_id) => topping_id !== name); // Remove topping

      setValues({ ...values, toppings: newToppings });

      // Validate toppings array
      Yup.reach(schema, 'toppings')
        .validate(newToppings)
        .then(() => setErrors((prev) => ({ ...prev, toppings: '' })))
        .catch((err) =>
          setErrors((prev) => ({ ...prev, toppings: err.errors[0] }))
        );
    } else {
      // Handle text and select inputs
      setValues({ ...values, [name]: value });

      // Validate the specific field
      Yup.reach(schema, name)
        .validate(value)
        .then(() => setErrors((prev) => ({ ...prev, [name]: '' })))
        .catch((err) =>
          setErrors((prev) => ({ ...prev, [name]: err.errors[0] }))
        );
    }
  };

  // Handle form submission
  const onSubmit = (evt) => {
    evt.preventDefault();

    axios
      .post('http://localhost:9009/api/order', values)
      .then((res) => {
        console.log(res.data);
        setValues(getInitialValues());
        setErrors(getInitialErrors());
        setServerSuccess(res.data.message);
        setServerFailure('');
      })
      .catch((err) => {
        setServerFailure(err.response?.data?.message || 'Server error');
        setServerSuccess('');
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Order Your Pizza</h2>

      {serverSuccess && <div className="success">{serverSuccess}</div>}
      {serverFailure && <div className="failure">{serverFailure}</div>}

      <div className="input-group">
        <label htmlFor="fullName">Full Name</label>
        <input
          placeholder="Type full name"
          id="fullName"
          name="fullName"
          type="text"
          value={values.fullName}
          onChange={onChange}
        />
        {errors.fullName && <div className="error">{errors.fullName}</div>}
      </div>

      <div className="input-group">
        <label htmlFor="size">Size</label>
        <select
          id="size"
          name="size"
          value={values.size}
          onChange={onChange}
        >
          <option value="">----Choose Size----</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
        </select>
        {errors.size && <div className="error">{errors.size}</div>}
      </div>

      <div className="input-group">
        {toppings.map((topping) => (
          <label key={topping.topping_id}>
            <input
              name={topping.topping_id}
              type="checkbox"
              checked={values.toppings.includes(topping.topping_id)}
              onChange={onChange}
            />
            {topping.text}
          </label>
        ))}
        {errors.toppings && <div className="error">{errors.toppings}</div>}
      </div>

      <input disabled={!formEnabled} type="submit"  />
    </form>
  );
}
