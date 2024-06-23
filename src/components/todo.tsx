import React, { useState, useEffect } from "react";
import { Input, Button, List, Checkbox, Typography, Modal, Spin } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { ToDoRecordType } from '../types/todoTypes';
import { getTodoList, createTodo, editTodo, deleteTodoService } from '../services/todoService';

const ToDoComponent: React.FC = () => {
  const [todoList, setTodoList] = useState<ToDoRecordType[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<ToDoRecordType | null>(null);

  useEffect(() => {
    const getToDos = async () => {
      setIsLoading(true);
      const todoList = await getTodoList();
      setTodoList(todoList);
      setIsLoading(false);
    }
    getToDos();
  }, []);

  const addTodo = async () => {
    if (newTodo.trim() === '') return;
    setIsLoading(true);
    const newItem = {
      name: newTodo,
      completed: false
    }
    const newTodoRecord = await createTodo(newItem);
    setTodoList([...todoList, newTodoRecord as ToDoRecordType]);
    setNewTodo('');
    setIsLoading(false);
  };

  const toggleTodo = async (id: string) => {
    const todoRecord = todoList.find(todo => todo._id === id);
    if (todoRecord) {
      setIsLoading(true);
      const updatedRecord = await editTodo(id, { completed: !todoRecord.completed });
      setTodoList(todoList.map(todo => todo._id === id ? updatedRecord as ToDoRecordType : todo));
      setIsLoading(false);
    }
  };

  const deleteTodo = async () => {
    if (selectedTodo) {
      setIsLoading(true);
      await deleteTodoService(selectedTodo._id);
      setTodoList(todoList.filter(todo => todo._id !== selectedTodo._id));
      setIsLoading(false);
      handleCancel();
    }
  };

  const openDeleteModel = (todaRecord: ToDoRecordType) => {
    setSelectedTodo(todaRecord);
    setIsModalOpen(true);
  }

  const handleCancel = () => {
    setSelectedTodo(null);
    setIsModalOpen(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* hiding loader right now because the api is in local and the response time is fast. so the loader is displayed for a split second and it looks weird */}
      {/* {isLoading && <Spin size="large" fullscreen />} */}
      <Modal title="Delete Item" open={isModalOpen} okText="Delete" okButtonProps={{ style: { backgroundColor: "red"} }} onOk={deleteTodo} onCancel={handleCancel}>
        <Typography>Are you sure you want to delete &quot;<span style={{ color: "red"}}>{selectedTodo?.name}</span>&quot; ?</Typography>  
      </Modal>
      <div className="bg-white rounded shadow p-6 w-full max-w-lg h-[80vh] overflow-auto">
        <Typography.Title level={3} className="text-center">
            My Todo-s
        </Typography.Title>
        <div className="mb-4 w-full flex justify-between gap-2">
          <Input
            id="new-todo-input"
            placeholder="Add new item..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-2 w-full"
          />
          <Button id="add-button" className="flex-1" type="primary" onClick={addTodo}>ADD</Button>
        </div>
        <List
          dataSource={todoList}
          renderItem={todo => (
            <List.Item
              actions={[
                <DeleteOutlined key="delete" onClick={() => openDeleteModel(todo)} />,
              ]}
            >
              <Checkbox checked={todo.completed} onChange={() => toggleTodo(todo._id)}>
                <span className="break-all">{todo.name}</span>
              </Checkbox>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default ToDoComponent;