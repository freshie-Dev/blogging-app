import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { removeTag, setTags } from "../../slices/editor/editorSlice";
import "../../styles/tagInputStyles.css"

const TagInput = () => {

  const dispatch = useDispatch();
  const { tags } = useSelector(state => state.editor)

  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') return

    const value = e.target.value

    if (!value.trim()) return

    dispatch(setTags(e.target.value))

    e.target.value = ''
  }

  const handleRemoveTag = (index) => {
    dispatch(removeTag(index))
  }
  return (
      <div className="tags-input-container">
        <input onKeyDown={handleKeyDown} type="text" className="tags-input h-[40px] rounded-md border-[1px] border-gray-300 outline-none px-2 text-gray-600" placeholder="Type somthing" />
        {tags.map((tag, index) => {
          return (
            <div className="tag-item" key={index}>
              <span className="text">{tag}</span>
              <span onClick={() => handleRemoveTag(index)} className="close">&times;</span>
            </div>
          )
        })}
      </div>
  );
};

export default TagInput;