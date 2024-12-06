import PropTypes from 'prop-types';  // Import PropTypes for validation
import ReactQuill from 'react-quill';  // Import React Quill
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const Editor = ({ value, onChange }) => {
  return (
    <div>
      <ReactQuill 
        value={value} 
        onChange={onChange} 
        placeholder="Write your content here..." 
        className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
      />
    </div>
  );
};

// PropTypes validation for the props 'value' and 'onChange'
Editor.propTypes = {
  value: PropTypes.string.isRequired,   // value must be a string and is required
  onChange: PropTypes.func.isRequired,  // onChange must be a function and is required
};

export default Editor;
