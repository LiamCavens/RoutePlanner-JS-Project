import React from 'react';


const Route = ({routes}) =>{
  return(
    <div className= "quote-box" style={{backgroundImage:`url(https://source.unsplash.com/random)`}}>
      <p className="quote">{quote.quote}</p>
      <p className="author">{quote.author}</p>
    </div>
  )

}

export default QuoteBox;
