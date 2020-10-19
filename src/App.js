import Axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import FlashcardList from "./Components/FlashcardList";

function App() {
	const [flashcards, setFlashcards] = useState(sample_flashcards);

	useEffect(() => {
		Axios.get("https://opentdb.com/api.php?amount=10").then((res) => {
			setFlashcards(
				res.data.results.map((questionItem, index) => {
					const answer = questionItem.correct_answer;
					const options = [...questionItem.incorrect_answers, answer];
					return {
						id: `${index}-${Date.now()}`,
						question: questionItem.question,
						answer: questionItem.correct_answer,
						options: options.sort(() => Math.random() - 0.5),
					};
				})
			);
			console.log(res.data);
		});
	}, []);

	return (
		<div className="App">
			<FlashcardList flashcards={flashcards} />
		</div>
	);
}
const sample_flashcards = [
	{
		id: 1,
		question: "what is 2+2",
		answer: "4",
		options: ["2", "3", "4", "5"],
	},
	{
		id: 2,
		question: "question 2",
		answer: "answer",
		options: ["answer", "3", "4", "5"],
	},

	{
		id: 3,
		question: "question3",
		answer: "answer3",
		options: ["2", "4", "answer3", "5"],
	},
];

export default App;
