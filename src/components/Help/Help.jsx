import React from 'react';
import MyButton from '../UI/button/MyButton';
import classes from './Help.module.css';

const Help = () => {
    return (
        <div className={classes.helpPanel}>
            <b>instruction</b>
            <ul>
                <li>to select an active element, click on this element in the list after it becomes <b>bolder</b></li>
                <li>the <MyButton>add</MyButton> button allows you to add an element to the same branch as the <b>active element</b></li>
                <li>the <MyButton>up</MyButton> button allows you to raise the element one point higher within the current branch</li>
                <li>the <MyButton>down</MyButton> button allows you to move an element down one point within the current branch</li>
                <li>the <MyButton>out</MyButton> button allows you to raise the element one branch above the current branch (first of all, the element must be raised to the head of the current branch)</li>
                <li>the <MyButton>in</MyButton> button allows you to add the <b>active branch</b> to the branch below</li>
                <li>the <MyButton>delete</MyButton> button allows you to remove an item from the list</li>
            </ul>
        </div>
    );
};

export default Help;