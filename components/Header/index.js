import Link from 'next/link'
import styles from '../../styles/Header.module.css'

const Header = () => {
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>
        next<span>xkcd</span>
      </h1>
      <nav>
        <div className={styles.list}>
          <Link href='/'>
            <a>Home</a>
          </Link>
          <Link href='/'>
            <a>About</a>
          </Link>
          <Link href='/'>
            <a>Search</a>
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
