import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL_USER = "http://localhost:3000/Users";

const Form = (props) => {
  const [formdata, setformData] = useState({
    name: "",
    city: "",
    salary: "",
    mobile: "",
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL_USER);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formdata.name ||
      !formdata.city ||
      !formdata.salary ||
      !formdata.mobile
    ) {
      alert("error");
      return;
    }
    try {
      await axios.post(API_URL_USER, formdata);
      alert(" check userdata");
      setformData({
        name: "",
        city: "",
        salary: "",
        mobile: "",
      });
      fetchUsers();
    } catch (error) {
      console.error(error, "submit error");
    }
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formdata.name}
          onChange={handleInputChange}
          required
        />
        <label>city:</label>
        <select name="city">
          <option value={props.city}></option>
        </select>

        {/* <label>city:</label>
        <input
          type="text"
          name="city"
          value={formdata.city}
          onChange={handleInputChange}
        /> */}
        <label>salary:</label>
        <input
          type="number"
          name="salary"
          value={formdata.salary}
          onChange={handleInputChange}
          required
        />
        <label>mobile:</label>
        <input
          type="number"
          name="mobile"
          value={formdata.mobile}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {user.name},{user.city} {user.salary}, {user.mobile}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Form;
