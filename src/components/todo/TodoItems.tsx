import { FC, useState } from "react";
import { TodoType } from "../../types";
import { Button } from "@mui/material";
import axios from "axios";
import scss from "./TodoItems.module.scss"; // Import SCSS module

const url = import.meta.env.VITE_BACKEND_URL;

const TodoItems: FC<{ todos: TodoType[]; getReq: () => void }> = ({
	todos,
	getReq,
}) => {
	const deleteReq = async (_id: number) => {
		await axios.delete(`${url}/${_id}`);
		getReq();
	};

	const [name, setName] = useState("");
	const [img, setImg] = useState("");
	const [price, setPrice] = useState<number>(0);

	const [isEdit, setIsEdit] = useState<number>(0);

	const Edit = (item: TodoType) => {
		setName(item.name);
		setImg(item.img);
		setPrice(item.price);
		setIsEdit(item._id);
	};

	const upData = async (_id: number) => {
		const newData = {
			name,
			img,
			price,
		};
		await axios.patch(`${url}/${_id}`, newData);
		getReq();
		setIsEdit(0);
	};

	return (
		<div className={scss.container}>
			{todos.map((item, index) => (
				<div className={scss.content} key={index}>
					{isEdit === item._id ? (
						<>
							<input
								value={name}
								onChange={(e) => setName(e.target.value)}
								type="text"
							/>
							<input
								value={img}
								onChange={(e) => setImg(e.target.value)}
								type="text"
							/>
							<input
								value={price}
								onChange={(e) => setPrice(+e.target.value)}
								type="number"
							/>
							<button onClick={() => upData(item._id)}>upData</button>
							<button onClick={() => setIsEdit(0)}>concel</button>
						</>
					) : (
						<>
							<h1>name: {item.name}</h1>
							<img src={item.img} alt={item.name} />
							<p>price: {item.price}</p>
							<Button variant="contained" onClick={() => deleteReq(item._id)}>
								delete
							</Button>
							<Button variant="contained" onClick={() => Edit(item)}>
								edit
							</Button>
						</>
					)}
				</div>
			))}
		</div>
	);
};

export default TodoItems;
