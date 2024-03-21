import React from 'react'
import Card from './Card'
function Categories(props) {
    const {data,changeCategory}=props;
  return (
    <div >
      <div >
        {data.map((element) => (
          <div key={element._id}>
            <Card
              title={element.category_name}
              changeCategory={changeCategory}
              categoryData={element}
            />
          </div>
        ))}
    </div>
    </div>
  )
}

export default Categories
