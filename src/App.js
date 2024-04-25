import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import { Resizable } from "re-resizable";
import axios from "axios";

function App() {
  const resizableContainerRef = useRef(null);
  const [addFormData, setAddFormData] = useState({
    name: "",
    description: ""
  });
  const [updateFormData, setUpdateFormData] = useState({
    name: "",
    description: ""
  });
  const [updateCount, setUpdateCount] = useState(0);

  useEffect(() => {
    // Fetch count data from the server
    const fetchCount = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/data/count");
        setUpdateCount(response.data.totalCount);
      } catch (error) {
        console.error("Error fetching count data:", error);
      }
    };

    fetchCount();
  }, []); // Run only once on component mount

  const handleResizeStart = () => {
    resizableContainerRef.current.classList.add("resizing");
  };

  const handleResizeStop = () => {
    resizableContainerRef.current.classList.remove("resizing");
  };

  const handleAddInputChange = (e) => {
    setAddFormData({
      ...addFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateInputChange = (e) => {
    setUpdateFormData({
      ...updateFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddData = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/data", addFormData);
      console.log(response.data);
      setAddFormData({
        name: "",
        description: ""
      });
      // Fetch latest data for update form after adding
      fetchLatestDataForUpdate();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleUpdateData = async () => {
    try {
      const response = await axios.put("http://localhost:3001/api/data/:id", updateFormData);
      console.log(response.data);
      setUpdateCount(updateCount + 1);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const fetchLatestDataForUpdate = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/data/latest");
      const latestData = response.data;
      setUpdateFormData({
        name: latestData.name,
        description: latestData.description
      });
    } catch (error) {
      console.error("Error fetching latest data for update:", error);
    }
  };

  return (
    <div className="App">
      <div className="container" ref={resizableContainerRef}>
        <div className="row">
          <Resizable
            className="resizeable"
            defaultSize={{ width: 200, height: 200 }}
            onResizeStart={handleResizeStart}
            onResizeStop={handleResizeStop}
            enable={{
              top: true,
              right: true,
              bottom: true,
              left: true,
              topRight: true,
              bottomRight: true,
              bottomLeft: true,
              topLeft: true,
            }}
          >
            <div className="resizable-content" style={{ backgroundColor: "lightblue" }}>
              <h2>Resizable Div 1</h2>
              {/* Form for adding new data */}
              <form>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={addFormData.name}
                  onChange={handleAddInputChange}
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={addFormData.description}
                  onChange={handleAddInputChange}
                />
                <button type="button" onClick={handleAddData}>Add</button>
              </form>
            </div>
          </Resizable>
        </div>
        <div className="row">
          <Resizable
            className="resizeable"
            defaultSize={{ width: 200, height: 200 }}
            onResizeStart={handleResizeStart}
            onResizeStop={handleResizeStop}
            enable={{
              top: true,
              right: true,
              bottom: true,
              left: true,
              topRight: true,
              bottomRight: true,
              bottomLeft: true,
              topLeft: true,
            }}
          >
            <div className="resizable-content" style={{ backgroundColor: "lightgreen" }}>
              <h2>Resizable Div 2</h2>
              <form>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={updateFormData.name}
                  onChange={handleUpdateInputChange}
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={updateFormData.description}
                  onChange={handleUpdateInputChange}
                />
                <button type="button" onClick={handleUpdateData}>Update</button>
              </form>
            </div>
          </Resizable>
        </div>
        <div className="row">
          <Resizable
            className="resizeable"
            defaultSize={{ width: 200, height: 200 }}
            onResizeStart={handleResizeStart}
            onResizeStop={handleResizeStop}
            enable={{
              top: true,
              right: true,
              bottom: true,
              left: true,
              topRight: true,
              bottomRight: true,
              bottomLeft: true,
              topLeft: true,
            }}
          >
            <div className="resizable-content" style={{ backgroundColor: "lightcoral" }}>
              <h2>Resizable Div 3</h2>
              <p>Total Count: {updateCount}</p>
            </div>
          </Resizable>
        </div>
      </div>
    </div>
  );
}

export default App;
