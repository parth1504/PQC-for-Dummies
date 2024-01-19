import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

function TextUpdaterNode({ data, isConnectable, updateInputValue }) {
    const onChange = useCallback((evt) => {
        const value = evt.target.value;
    
        // Update the 'inputValue' property within the 'data' object
        updateInputValue({ ...data, inputValue: value });
      }, [data, updateInputValue]);

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <label htmlFor="text">Input Message:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      />
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
    </div>
  );
}

export default TextUpdaterNode;