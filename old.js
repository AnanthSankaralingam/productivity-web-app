import './App.css';
import { useState } from 'react';

function App() {
  const [text, setText] = useState("");
  const [activities, setActivities] = useState([]);//default value is empty array
  const [taskCounter, setTaskCounter] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [showProg, setShowProg] = useState(false);

  const addActivityHandler = () => {
    if (!text)
      return;
    const oldActivities = [...activities]; //make copy of state, don't directly change
    const newActivity = {
      id: Math.floor(Math.random() * 1000),
      activityText: text,
      completed: false,
    };
    const newActivities = oldActivities.concat(newActivity);

    setActivities(newActivities);
    setText("");
    setTaskCounter(taskCounter+1);//inc tasks
  };

  const onDeleteHandler = (id) => {
    setActivities((oldActivities) => {
      const newActivities = oldActivities.map((activity) => {
        if (activity.id === id) {
          return {
            ...activity,
            deleted: true,
          };
        }
  
        return activity;
      });
  
      // Update completed tasks count after setting the state
      const completed = newActivities.filter(activity => activity.completed && !activity.deleted);
      setCompletedTasks(completed.length);
  
      return newActivities.filter(activity => !activity.deleted);
    });
    setTaskCounter((prevCount) => prevCount - 1); // Decrease the total task count

    /*
    const oldActivities = [...activities];

    const newActivities = oldActivities.filter(
      (activity) => activity.id !== id
    );

    setActivities(newActivities);
    setTaskCounter(taskCounter - 1);
    */
  };
  

  const onCompleteHandler = (id) => {
    setActivities((oldActivities) => {
      const newActivities = oldActivities.map((activity) => {
        if (activity.id === id) {
          return {
            ...activity,
            completed: !activity.completed, //toggle
          };
        }
  
        return activity;
      });
  
      //update completed tasks count after setting the state
      const completed = newActivities.filter(activity => activity.completed && !activity.deleted);
      setCompletedTasks(completed.length);
  
      return newActivities;
    });
    /*
    const oldActivities = [...activities];
    const newActivities = oldActivities.map((activity)=>{
      if (activity.id === id){
        return {
          ...activity,
          completed: !activity.completed, //toggle feature
        };
      }
      return activity;
    });

    setActivities(newActivities);
    */
  };

  
  return (
    <div className="App">
      <div className='container'>
        <input
          className='input'
          type="text"
          placeholder='Place an activity!'
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        {/* Add state to box to preserve whatever is typed */}
        <button className='btn-add' onClick={addActivityHandler}>Add activity</button>
  
        {activities.length > 0 ? (<div>
          <button className='btn-show' onClick={() => setShowProg(!showProg)}>
            {showProg ? 'Hide progress': 'Show progress'}</button>
        </div> ) : null}
  
        {!showProg ? (
          activities.map((activity) => (
            <div key={activity.id}>
              <div>
                <h4
                  style={{ textDecoration: activity.completed ? "line-through" : "none" }}>
                  {activity.activityText}
                </h4>
              </div>
              <div>
                <button onClick={() => onCompleteHandler(activity.id)}>Complete</button>
              </div>
              <div>
                <button onClick={() => onDeleteHandler(activity.id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <div className="progress-container">
    <div className="progress-circle" style={{ transform: `rotate(${360 - (completedTasks / taskCounter) * 360}deg)` }}></div>
    <div className="progress-text">
      <h2>Total Tasks: {taskCounter}</h2>
      <h2>Completed Tasks: {completedTasks}</h2>
      <h2>Progress: {taskCounter > 0 ? ((completedTasks / taskCounter) * 100).toFixed(2) : 0}%</h2>
    </div>
  </div>
        )}
      </div>
    </div>
  );
  
}

export default App;
