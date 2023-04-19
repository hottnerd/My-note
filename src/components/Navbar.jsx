import React from 'react'
import styles from "../styles/Navbar.module.css"
import Account from './Account'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className={styles.container}>
        <Link to="/"><h1>My Note</h1></Link>
        <nav className={styles.right}>
            <Account/>
        </nav>
    </div>
  )
}

