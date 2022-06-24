import React, { useEffect, useState } from 'react';
import Help from '../Help/Help';
import TaskForm from '../TaskForm/TaskForm';
import MyButton from '../UI/button/MyButton';
import classes from './List.module.css';

const List = ({data = []}) => {
  const [list,setList] = useState(data);
  const [selectedItem,setSelectedItem] = useState(data.length > 0 ? data[0].id : "");
  const MoveDirectory = {
    UP    : 0,
    DOWN  : 1,
    OUT   : 2,
    IN    : 3, 
  }
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(list));
  });

  const moveItem = (id, moveDirectory) => {
    const inf = searchItemInfo(list, id);
    if(inf) {
      let temp;
      switch(moveDirectory) {
        case MoveDirectory.UP: 
          if(inf.i > 0) {
            temp = inf.list[inf.i - 1];
            inf.list[inf.i - 1] = inf.list[inf.i];
            inf.list[inf.i] = temp;
          }
          break;
          
        case MoveDirectory.DOWN: 
          if(inf.i < inf.list.length - 1) {
            temp = inf.list[inf.i + 1];
            inf.list[inf.i + 1] = inf.list[inf.i];
            inf.list[inf.i] = temp;
          }
          break;

        case MoveDirectory.OUT: 
          if (inf.parentList && inf.parentList.length > 0) {
            temp = inf.list[inf.i];
            inf.list.splice(inf.i, 1);
            inf.parentList.push(temp);
          }
          break;

        case MoveDirectory.IN: 
          if(inf.i > 0) { 
            inf.list[inf.i - 1].children.push(inf.list[inf.i]);
            inf.list.splice(inf.i, 1);
          }
          break;

        default:
          break;
      }
    }
    setList([...list]); 
  }

  const deleteItem = (id) => {
    const inf = searchItemInfo(list,id);
      let temp = inf.list[inf.i];

      inf.list.splice(inf.i, 1);
      
      temp.children.forEach((element, index) => {
        inf.list.splice(inf.i + index , 0, element);
      });

    setList([...list]); 
  }
  const searchItemInfo = (list, id, parentList, parentId) => {
    for(let i = 0; i < list.length; i++) { 
      if (list[i].id === id) {
        return {list, id, parentList, parentId, i};
      }
      else if (list[i].children && list[i].children.length > 0 ) {
        let resultFromSubList = searchItemInfo(list[i].children, id, parentList = list, parentId = i);

        if(resultFromSubList) {
          return resultFromSubList;
        }
      }
    }
  }

  const createItem = (newItem) => {
    const inf = searchItemInfo(list,selectedItem);

    if(inf) {
      inf.list.splice(inf.i + 1, 0, newItem);
      setList([...list]);
    } 
    else {
      setList([...list,newItem]);
      setSelectedItem(newItem.id);
    }
  }

  const Tree = ({data = [], hasParent}) => {
    const TreeNode = ({node}) => {
      
      const hasChild = node.children && node.children.length > 0 ? true : false;
    
      return (
        <li 
          key={node.id} 
          onClick={(e) => { 
          e.stopPropagation();
          setSelectedItem(node.id); 
          }}> 
          <span className={selectedItem === node.id ? classes.taskActive : ""}> {node.title} </span>
          <span className={classes.taskClass} >{node.id}</span> 
          <MyButton onClick={() => (moveItem(node.id, MoveDirectory.UP))}>Up</MyButton>
          <MyButton onClick={() => (moveItem(node.id, MoveDirectory.DOWN))}>Down</MyButton>
            {!hasParent &&
          <MyButton onClick={() => (moveItem(node.id, MoveDirectory.OUT))}>OUT</MyButton>}
          <MyButton onClick={() => (moveItem(node.id, MoveDirectory.IN))}>IN</MyButton>
          <MyButton onClick={() => (deleteItem(node.id))}>Delete</MyButton>
            {hasChild && (  
          <Tree data={node.children} /> )}
        </li>
      );
    };
    return (
      <React.Fragment>
        { data.length > 0 ? 
          <ul>
            {data.map((tree) => (
              <TreeNode node={tree} key={tree.id} hasParent/>
            ))}
          </ul>
          :
          <h3 className={classes.listName}>List was empty</h3>
        }
     </React.Fragment>
    );
  };

  return (
    <div>
      <h2 className={classes.listName}>Todoist</h2>
      <TaskForm create={createItem}/>
      <Tree data={list} hasParent/>
      <Help/>
    </div>
  )
};
export default List;
