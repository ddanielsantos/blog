```jsx
const [bgColor, setBgColor] = useState('initial color here')

useEffect(() => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const { backgroundColor } = getComputedStyle(entry.target)
        setBgColor(backgroundColor)
      }
    })
  }, { root: null, threshold: 0.6 })

  const boxes = document.querySelectorAll('main > *')

  boxes.forEach((box) => {
    observer.observe(box)
  })

  return () => {
    boxes.forEach((box) => {
      observer.unobserve(box)
    })
  }
}, [])

return (
  <main
    style={{
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      display: 'flex',
      backgroundColor: bgColor,
      transition: 'ease-out 0.5s'
    }}
  >
    <div style={{ backgroundColor: 'red', minHeight: '100vh', border: '1px solid yellow', width: '50%' }} />
    <div style={{ backgroundColor: 'blue', minHeight: '100vh', border: '1px solid yellow', width: '50%' }} />
  </main>
)
```