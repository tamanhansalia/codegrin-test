import axios from "axios";
import { useEffect, useState } from "react";
import Form from "./component/Form";

const API_URL = "http://localhost:3000/City";
const API_URL_USER = "http://localhost:3000/Users";

const App = () => {
  const [cityName, setcityName] = useState("");

  useEffect(() => {
    localStorage.setItem("city", JSON.stringify(cityName));
  }, [cityName]);

  const handlecitySubmit = async (e) => {
    e.preventDefault();
    if (cityName.trim() === "") {
      console.log("check");
      alert("no empty please");
      return;
    }
    try {
      await axios.post(API_URL, { city: cityName });
      alert(`City "${cityName}"`);
      console.log(`City "${cityName}"`);
      setcityName("");
      fetchCities();
    } catch (error) {
      console.log("error", error);
    }
  };

  const [formdata, setformData] = useState({
    name: "",
    city: "",
    salary: "",
    mobile: "",
  });

  const [users, setUsers] = useState([]);
  const [fetchcity, setFetchCity] = useState([]);

  useEffect(() => {
    fetchCities();
    fetchUsers();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get(API_URL);
      setFetchCity(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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
      fetchCities();
    } catch (error) {
      console.error(error, "submit error");
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`${API_URL_USER}/${userId}`);
      alert("Deleted successfully");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <div className=" space-x-5">
        <label className="mx-10">City Name</label>
        <input
          className="border-2 border-black"
          value={cityName}
          onChange={(e) => setcityName(e.target.value)}
          type="text"
        />
        <button className="bg-blue-400 px-3" onClick={handlecitySubmit}>
          submit
        </button>
      </div>
      <div>
        <form
          className="p-4 flex flex-col justify-center space-y-4 "
          action=""
          onSubmit={handleSubmit}
        >
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formdata.name}
            onChange={handleInputChange}
            required
          />
          <label>city:</label>
          <select
            name="city"
            value={formdata.city}
            className="border-2 border-black w-36"
            onChange={handleInputChange}
          >
            <option value="">select</option>
            {fetchcity.map((city, index) => (
              <option value={city.city} key={index}>
                {city.city}
              </option>
            ))}
          </select>
          {/* {fetchcity.map((city, index) => (
            <select key={index} name="city">
              <option value="city">{city.city}</option>
            </select>
          ))} */}

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
          <label>
            profile picture
            <input
              type="file"
              name="profilepicture"
              onChange={handleInputChange}
            />
          </label>
          <button className="bg-blue-400 px-3 w-36" type="submit">
            Submit
          </button>
        </form>
        <div>
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th>ID</th>
                <th>Name</th>
                <th>City</th>
                <th>Salary</th>
                <th>Mobile</th>
                <th>Profile Picture</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.city}</td>
                  <td>{user.salary}</td>
                  <td>{user.mobile}</td>
                  <td>{user.profilepicture}</td>
                  <td className=" text-center">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
