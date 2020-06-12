import React , { useState } from 'react';


const ReviewForm = function(props){
    const [input , setInput] = useState(props.review);
    const handleChange = (e)=> {
        const {target: { value } } = e
        setInput(value)
      }
    
     const handleSubmit = (e) => {
        e.preventDefault();
        props.submitHandler(input,props.mode,props.id)
        setInput('')
    }

    
    return (
      <div>
          <form onSubmit={handleSubmit} >
             <div className="form">
                <textarea className="form-control mb-1" id="content" rows="3"
                 onChange={handleChange} value={input} placeholder="review the product..."></textarea>
            </div>
            <div>
            <button className="btn btn-info" type="submit">post review</button>
            </div>
          </form>
      </div>
    )

}


export default ReviewForm;

