import ReactDOM from "react-dom";

import Card from "./Card";
import Button from "./button";
import styles from "./ErrorModal.module.css";

const Backdrop = (props) => {
   return <div className={styles.backdrop} onClick={props.onClick}></div>;
};

const Modal = (props) => {
   return (
      <Card className={styles.modal}>
         <header className={styles.header}>
            <h2>{props.title}</h2>
         </header>
         <div className={styles.content}>
            <p>{props.message}</p>
         </div>
         <footer className={styles.actions}>
            <Button onClick={props.onClick}>Okay</Button>
         </footer>
      </Card>
   );
};

const ErrorModal = (props) => {
   return (
      <>
         {ReactDOM.createPortal(
            <Backdrop onClick={props.onClick} />,
            document.getElementById("backdrop-root")
         )}
         {ReactDOM.createPortal(
            <Modal
               title={props.title}
               message={props.message}
               onClick={props.onClick}
            />,
            document.getElementById("modal-root")
         )}
      </>
   );
};

export default ErrorModal;
