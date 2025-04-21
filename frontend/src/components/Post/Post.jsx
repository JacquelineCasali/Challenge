import React from 'react'

export default function Post({username}) {
  return (
    <div className="main-screen">
    <header>
      <h1>CodeLeap Network</h1>
    </header>
    <section>
      <p>Hello <strong>{username}</strong>! You can now create your posts.</p>
      {/* Aqui futuramente entra o formulário de post e listagem */}
    </section>
  </div>

  )
}
