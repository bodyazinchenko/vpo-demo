import { Link } from "react-router-dom";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <Link to="/">На головну</Link>
      </header>
      <div className="container content">
        {children}
      </div>
      <footer>
        <div className="container">copyright</div>
      </footer>
    </>
  )
}

export default Layout;