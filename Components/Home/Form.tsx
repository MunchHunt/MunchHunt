import React, { useState } from 'react';

interface Props {
  isLoggedIn: boolean;
}

const Form: React.FC<Props> = ({ isLoggedIn }) => {
  const [input1, setInput1] = useState<string>('');
  const [input2, setInput2] = useState<string>('');
  const [input3, setInput3] = useState<string>('');
  const [input4, setInput4] = useState<string>('');
  const [input5, setInput5] = useState<string>('');
  const [input6, setInput6] = useState<string>('');

  return (
    <div>
      <h3>Lets get started!</h3>
      <div>List up to 6 possible cuisines or categories you would want to eat.</div>
      <form>
        <input type="text" placeholder="Enter cuisine/category" />
        <input type="text" placeholder="Enter cuisine/category" />
        <input type="text" placeholder="Enter cuisine/category" />
        <input type="text" placeholder="Enter cuisine/category" />
        <input type="text" placeholder="Enter cuisine/category" />
        <input type="text" placeholder="Enter cuisine/category" />
        <br />
        Dietary Restrictions
        <br />
        <label>
          <input type="checkbox" value="Vegan" />
          Vegan
        </label>
        <label>
          <input type="checkbox" value="Vegetarian" />
          Vegetarian
        </label>
        <label>
          <input type="checkbox" value="Halal" />
          Halal
        </label>
        <label>
          <input type="checkbox" value="Kosher" />
          Kosher
        </label>
        <label>
          <input type="checkbox" value="Dairy-Free" />
          Dairy-Free
        </label>
        <label>
          <input type="checkbox" value="Gluten-Free" />
          Gluten-Free
        </label>
        <br />
        <input type="submit" value="Find!" />
      </form>
    </div>
  );
};

export default Form;