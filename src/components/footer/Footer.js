import React from 'react'
import styles from './footer.module.scss'
const Footer = () => {

  const date=new Date();
  const year=date.getFullYear()
  return (
    <>
      <footer className={styles.footer}>
          <span className={styles.year}>&copy;{year}</span> .All RIght Reserved
      </footer>
    </>
  )
}

export default Footer
