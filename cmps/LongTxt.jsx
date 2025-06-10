// const { useState } = React
// export function LongTxt(txt = 'asd', length = 100) {
//   const [isExpanded, setIsExpanded] = useState(false)
//   const toggleExpand = () => {
//     setIsExpanded(!isExpanded)
//   }
//   const isTextLong = txt.length > length
//   const textToShow = isTextLong ? txt : txt.substring(0, length)

//   return (
//     <p>
//       {isExpanded ? textToShow : txt.substring(0, length) + '... '}
//       <span className='expand' onClick={toggleExpand}>
//         {isExpanded ? 'Show Less' : 'Show More'}
//       </span>
//     </p>
//   )
// }
const { useState, useEffect, useRef } = React

export function LongTxt({ txt, limit = 100 }) {
  const [isShowFullTxt, setIsShowFullTxt] = useState(false)

  function onToggleIsShowFullTxt() {
    setIsShowFullTxt((prev) => !prev)
  }

  const isTextTooLong = txt.length > limit
  const textToShow =
    isShowFullTxt || !isTextTooLong ? txt : txt.substring(0, limit) + '...'
  return (
    <section className='long-txt'>
      <p className='txt'>
        {textToShow}{' '}
        {isTextTooLong && (
          <span className='bold-txt' onClick={onToggleIsShowFullTxt}>
            {isShowFullTxt ? 'Show Less' : 'Read More'}
          </span>
        )}
      </p>
    </section>
  )
}
