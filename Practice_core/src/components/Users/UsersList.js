import Card from "../UI/Card";
import styles from "./UsersList.module.css";

const UsersList = (props) => {
  return (
    <Card className={styles.list}>
      <ul>
        {props.usersList.map((item) => {
          return (
            <li key={item.id}>
              {item.userName}, {item.age} years old
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default UsersList;
