import React, { useState } from 'react';
import { IoMdRemoveCircle } from 'react-icons/io';
import { TbChecks } from 'react-icons/tb';

export default function FormPublishingSharing({
  toast,
  setSelectedTopic,
  loading,
  handleSubmit,
  handleChange,
  handleContributorChange,
  handleAddContributor,
  handleRemoveContributor,
  formData,
  colors,
  setFormData
}) {
  const [errors, setErrors] = useState({});

  // Handle adding a new tag
  const handleAddTag = () => {
    if (!formData.tags.includes(tagInput.trim())) {
      if (tagInput.trim() !== '') {
        setFormData({
          ...formData,
          tags: [...formData.tags, tagInput], // Add the new tag to the tags array
        });
        setTagInput(''); // Clear the tag input after adding
      } else {
        toast.error("Blank tag is not accepted.");
      }
    }
    else {
      toast.error("This tag is already included.");
    }
  };

  const handleTagChange = (e) => {
    setTagInput(e.target.value); // Update the tag input state
  };

  // Handle removing a tag
  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  // Handle citation generation
  const handleGenrate = () => {
    const siteTitle = formData.title || 'No title provided';
    const siteContributor = formData.contributors.length > 0 ? formData.contributors.join(', ') : 'No contributors';
    handleChange({
      target: {
        name: 'citation',
        value: `${siteContributor}. (${formData.releaseDate.split('-')[0]}). ${siteTitle}. $link`
      }
    });
  };

  const handleClear = () => {
    handleChange({
      target: {
        name: 'citation',
        value: ''
      }
    });
  };

  const licenseOptions = [
    { value: 'CC BY', label: 'CC BY' },
    { value: 'CC BY-NC', label: 'CC BY-NC' },
    { value: 'CCO', label: 'CCO' },
    { value: 'MIT', label: 'MIT License' },
    { value: 'GPL', label: 'GNU General Public License (GPL)' },
    { value: 'Apache', label: 'Apache License 2.0' },
    { value: 'BSD', label: 'BSD License' }
  ];

  const visibilityOptions = [
    { value: 'Private', label: 'Private' },
    { value: 'Public', label: 'Public' },
  ];


  const [tagInput, setTagInput] = useState('');
  // Validation function
  const validate = () => {
    const newErrors = {};


    if (!formData.visibility) {
      newErrors.visibility = 'Visibility is required';
    }

    if (!formData.author) {
      newErrors.author = 'Author/Institute/Agency is required';
    }

    if (!formData.license) {
      newErrors.license = 'License is required';
    }

    if (!formData.releaseDate) {
      newErrors.releaseDate = 'Release date is required';
    }

    if (!formData.citation) {
      newErrors.citation = 'Citation is required';
    }

    if (formData.tags.length === 0) {
      newErrors.tags = 'At least one tag is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    // if (validate()) {
      // setSelectedTopic('Next Step');
    // } else {
      console.log(formData);
    // }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="gap-6 p-5">

        {/* Author */}
        <div className="mb-4">
          <label htmlFor="author" className="text-sm font-medium text-gray-700 mb-1 flex justify-between">
            <span>Author/Institute/Agency</span>
            {/* {!formData.author && <span className="text-right text-red-600">*This field is required</span>} */}
          </label>
          <input
            type="text"
            id="author"
            name="author"
            placeholder="Enter the name of the author, institute, or agency"
            value={formData.author}
            onChange={handleChange}
            // required
            className={`w-full p-3 border rounded-md focus:outline-none focus:shadow-md ${errors.author ? 'border-red-500' : ''}`}
          />
          {errors.author && <span className="text-red-500 text-sm">{errors.author}</span>}
        </div>

        {/* License */}
        <div className="flex items-center justify-between mb-4 gap-10">
          <div className="flex-1">
            <label htmlFor="license" className="block text-sm font-medium mb-1">License</label>
            <select
              id="license"
              name="license"
              value={formData.license}
              onChange={handleChange}
              // required
              className={`w-full p-3 border rounded-md focus:outline-none focus:shadow-md ${errors.license ? 'border-red-500' : ''}`}
            >
              <option value="" disabled>Select a license</option>
              {licenseOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            {errors.license && <span className="text-red-500 text-sm">{errors.license}</span>}
          </div>
          <div className="flex-1">
            <label htmlFor="visibility" className="block text-sm font-medium mb-1">Visibility</label>
            <select
              id="visibility"
              name="visibility"
              value={formData.visibility}
              onChange={handleChange}
              // required
              className={`w-full p-3 border rounded-md focus:outline-none focus:shadow-md ${errors.visibility ? 'border-red-500' : ''}`}
            >
              <option value="" disabled>Select a Visibility</option>
              {visibilityOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            {errors.visibility && <span className="text-red-500 text-sm">{errors.license}</span>}
          </div>
          <div className="flex-1">
            <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-700 mb-1">Release</label>
            <input
              type="date"
              id="releaseDate"
              name="releaseDate"
              placeholder="Select date"
              value={formData.releaseDate}
              onChange={handleChange}
              // required
              className={`w-full p-3 border rounded-md focus:outline-none focus:shadow-md ${errors.releaseDate ? 'border-red-500' : ''}`}
            />
            {errors.releaseDate && <span className="text-red-500 text-sm">{errors.releaseDate}</span>}
          </div>
        </div>

        {/* Citation */}
        <div className="mb-4">
          <div className=' flex justify-between'>
            <label htmlFor="citation" className="block text-sm font-medium text-gray-700 mb-1">Citation</label>
            <div className=' flex gap-3'>
              <button
                type="button"
                onClick={handleGenrate}
                className="text-blue-600"
              >
                Generate
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="text-red-600"
              >
                Clear
              </button>
            </div>
          </div>
          <textarea
            id="citation"
            name="citation"
            placeholder="Provide a short citation to your model"
            value={formData.citation}
            onChange={handleChange}
            // required
            className={`w-full p-3 border rounded-md focus:outline-none focus:shadow-md ${errors.citation ? 'border-red-500' : ''}`}
          />
          {errors.citation && <span className="text-red-500 text-sm">{errors.citation}</span>}
        </div>

        {/* Tags */}
        <div className="flex-1 mb-4 h-full">
          <label htmlFor="tags" className="block text-sm font-medium mb-1">Tags</label>
          <div className='flex items-center h-full'>
            <input
              type="text"
              value={tagInput}
              onChange={handleTagChange}
              placeholder="Add Tags one by one"
              className="w-3/12 p-3 border mr-2 rounded-md focus:outline-none focus:shadow-md"
            />
            <div className=' bg-green-500 flex h-12 px-1 rounded-md '>
              <TbChecks
                size={26}
                className="cursor-pointer h-full"
                onClick={handleAddTag}
                color='white'
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 py-3">
            {formData.tags.map((option) => (
              <span key={option} className="capitalize bg-gray-200 text-gray-700 text-sm rounded-full px-2 py-2 ml-1 flex items-center">
                {option}
                <IoMdRemoveCircle
                  size={18}
                  className="cursor-pointer "
                  onClick={() => handleRemoveTag(option)}
                />
              </span>
            ))}
          </div>
          {errors.tags && <span className="text-red-500 text-sm">{errors.tags}</span>}
        </div>

        <div className=' flex items-end justify-end'>
          <button
            type="submit"
            className="box cursor-pointer px-4 flex items-center rounded-lg justify-center border-[1px]"
            style={{ height: '38px', width: '30%', backgroundColor: colors.differentColor, color: colors.mainBackgroundColor, borderColor: colors.borderBoxColor }}
            disabled={loading}
            onClick={handleNext}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}