function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <div className="container">
          <h1>Отримання допомоги для впо</h1>
        </div>
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