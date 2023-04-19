import Navbar from '../components/Navbar'
import styles from "../styles/Users.module.css"
import Table from '../components/Table'
import { useSelector } from 'react-redux';
import { getUserStatus } from '../redux/userSlice';

export default function Users() {
  
  const userStatus = useSelector(getUserStatus);

  return (userStatus === "succeeded") ? (
    <div className={styles.container}>
        <Navbar/>
        <div className={styles.bodyContainer}>
            <Table/>
        </div>
    </div>
  ) : null ;
}
