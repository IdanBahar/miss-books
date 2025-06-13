import { eventBusService } from '../services/event-bus.service.js'
const { useState, useEffect } = React
// const demoMsg = {
//   txt: 'lore asd asd as das',
//   type: 'success',
// }

export function UserMsg() {
  const [msg, setMsg] = useState(null)

  useEffect(() => {
    const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
      setMsg(msg)
    })
    return () => unsubscribe()
  }, [])

  function onCloseMsg() {
    setMsg(null)
  }
  if (!msg) return null
  return (
    <section className={`user-msg ${msg.type}`} key={msg.id}>
      <h4>{msg.txt}</h4>
      <button onClick={onCloseMsg} className='close-btn'>
        X
      </button>
    </section>
  )
}
