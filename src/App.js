import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import FlashcardList from "./Components/FlashcardList";

function App() {
	const [flashcards, setFlashcards] = useState();
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		Axios.get("https://opentdb.com/api.php?amount=10").then((res) => {
			setFlashcards(
				res.data.results.map((questionItem, index) => {
					const answer = decodeString(questionItem.correct_answer);
					const options = [
						...questionItem.incorrect_answers.map((a) => {
							return decodeString(a);
						}),
						answer,
					];
					return {
						id: `${index}-${Date.now()}`,
						question: decodeString(questionItem.question),
						answer: answer,
						options: options.sort(() => Math.random() - 0.5),
					};
				})
			);
			console.log(res.data);
		});
	}, []);

	const decodeString = (str) => {
		const textArea = document.createElement("textarea");
		textArea.innerHTML = str;
		return textArea.value;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		Axios.get("https://opentdb.com/api.php", {
			params: {
				category: categoryEl.current.value,
				amount: amountEl.current.value,
			},
		}).then((res) => {
			setFlashcards(
				res.data.results.map((questionItem, index) => {
					const answer = decodeString(questionItem.correct_answer);
					const options = [
						...questionItem.incorrect_answers.map((a) => {
							return decodeString(a);
						}),
						answer,
					];
					return {
						id: `${index}-${Date.now()}`,
						question: decodeString(questionItem.question),
						answer: answer,
						options: options.sort(() => Math.random() - 0.5),
					};
				})
			);
			console.log(res.data);
		});
	};

	const amountEl = useRef();

	const categoryEl = useRef();

	useEffect(() => {
		Axios.get("https://opentdb.com/api_category.php").then((res) => {
			console.log(res.data);
			setCategories(res.data.trivia_categories);
		});
	}, []);

	return (
		<>
			<form className="header" onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="category">Category</label>
					<select id="category" ref={categoryEl}>
						{categories.map((category) => {
							return (
								<option value={category.id} key={category.id}>
									{category.name}
								</option>
							);
						})}
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="amount">Number of Questions</label>
					<input
						type="number"
						id="amount"
						step="1"
						defaultValue={10}
						min="1"
						ref={amountEl}
					/>
				</div>
				<div className="form-group">
					<button className="button">Generate</button>
				</div>
			</form>
			<div className="container">
				<FlashcardList flashcards={flashcards} />
			</div>
		</>
	);
}

export default App;
