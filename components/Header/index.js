import { Container, Link, Text } from '@nextui-org/react'

const Header = () => {
  return (
    <Container as='heder' responsive display='flex' justify='space-between' alignContent='center'>
      <Text h1>
        next<Text>xkcd</Text>
      </Text>
      <nav>
        <Container as='ul' responsive display='flex' direction='row' style={{ gap: 4 }}>
          <Link href='/'>
            <a>Home</a>
          </Link>
          <Link href='/'>
            <a>Home</a>
          </Link>
          <Link href='/'>
            <a>Home</a>
          </Link>
        </Container>
      </nav>
    </Container>
  )
}
export default Header
