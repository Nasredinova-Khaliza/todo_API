import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import TodoItems from "./TodoItems";
import scss from "./TodoList.module.scss";

const url = import.meta.env.VITE_BACKEND_URL;

const TodoList = () => {
	const [todos, setTodos] = useState([]);
	const [values, setValues] = useState({
		name: "",
		img: "",
		price: "",
	});

	const getRequest = async () => {
		try {
			const response = (await axios.get(url)).data;
			setTodos(response);
		} catch (err) {
			console.log(err);
		}
	};

	const postRequest = async () => {
		if (values.name === "" || values.img === "" || values.price === "") {
			alert("Please fill all fields");
			return;
		} else {
			try {
				const response = (await axios.post(url, values)).data;
				setTodos(response);
			} catch (err) {
				console.log(err);
			}
		}
		setValues({ name: "", img: "", price: "" });
	};

	useEffect(() => {
		getRequest();
	}, []);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleChange = (e: any) => {
		const { id, value } = e.target;
		setValues((prevValues) => ({
			...prevValues,
			[id]: value,
		}));
	};

	return (
		<div className={scss.container}>
			<h1>Todo List</h1>
			<TextField
				id="name"
				label="Name"
				variant="outlined"
				type="text"
				value={values.name}
				onChange={handleChange}
			/>
			<TextField
				id="img"
				label="Image"
				variant="outlined"
				type="url"
				value={values.img}
				onChange={handleChange}
			/>
			<TextField
				id="price"
				label="Price"
				variant="outlined"
				type="number"
				value={values.price}
				onChange={handleChange}
			/>
			<Button variant="outlined" onClick={postRequest}>
				ADD
			</Button>
			<TodoItems getReq={getRequest} todos={todos} />
		</div>
	);
};

export default TodoList;
