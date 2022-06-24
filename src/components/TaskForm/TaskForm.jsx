import { useState } from 'react';
import MyButton from '../UI/button/MyButton';
import MyInput from '../UI/input/MyInput';
import { v4 as uuid } from 'uuid';
import classes from './TaskForm.module.css';

const TaskForm = ({create}) => {
    const [task,setTask] = useState({title:''})

    const addNewTask = (e) => {
        e.preventDefault();
        create({id: uuid().slice(0,8), title:task.title, children:[]});
    }
   
    return (
        <form className={classes.todoForm}>
            <p>
                <b>Form to add</b>
            </p>
            <MyInput
                value={task.title}
                type="text"
                placeholder="Enter task name..."
                onChange={e => setTask({title: e.target.value})}
            />
            <MyButton onClick={e => addNewTask(e)}>Add</MyButton>
        </form>
    );
};

export default TaskForm;