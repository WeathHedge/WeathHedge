import { useState } from "react";
import Form from "./form";
import styles from '../styles/form.module.css';
import React from "react";

export default function FormComparer() {
    const [activeForms, setForms] = useState([0]);
    const [idCounter, setIdCounter] = useState(1);

    const addSeries = () => {
        setForms([...activeForms, idCounter]);
        setIdCounter(idCounter + 1);
    };

    return (
        <div className={styles.formList}>
            {activeForms.map((i) => {
                return <Form key={i} formId={i} formHook={[activeForms, setForms]} />;
            })}
            <button type="button" onClick={addSeries} className={styles.addButton}>+ Add series</button>
        </div>
    );
}
