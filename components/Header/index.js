import { useRef, useState } from 'react'
import Link from 'next/link'
import styles from '../../styles/Header.module.css'

export default function Header() {
  const [results, setResults] = useState([])
  const [isFocused, setIsFocused] = useState(false)
  const searchRef = useRef()
  const q = searchRef?.current?.value

  const handleFocus = e => {
    setTimeout(() => {
      setIsFocused(e)
    }, 200)
  }

  const handleChange = async () => {
    const res = await fetch(`/api/search?q=${q}`)
    const results = await res.json()
    setResults(results)
  }
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>
        <Link href='/'>
          <a>
            next<span>xkcd</span>
          </a>
        </Link>
      </h1>
      <nav>
        <div className={styles.list}>
          <Link href='/'>
            <a>Home</a>
          </Link>
          <div>
            <input
              ref={searchRef}
              type={'search'}
              onChange={handleChange}
              onFocus={() => handleFocus(true)}
              onBlur={() => handleFocus(false)}
            />
          </div>
          {results.length > 0 && searchRef.current.value && isFocused && (
            <div className={styles.results}>
              <ul>
                <Link href={`/search?q=${q}`}>
                  <li className={styles.allResults}>
                    <a>See all results: {results.length}</a>
                  </li>
                </Link>
                {results.map(result => (
                  <Link key={result.id} href={`/comic/${result.id}`}>
                    <li>
                      <a>{result.title}</a>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
