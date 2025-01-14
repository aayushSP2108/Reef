import React, { useState } from 'react';
import { sizeOptions, featureOptions } from '../data/options';

export default function FormModelInfo({
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
}) {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate the form fields
  const validate = () => {
    const newErrors = {};

    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.largeDescription) newErrors.largeDescription = 'Detailed Description is required';
    if (!formData.size) newErrors.size = 'Model Size is required';
    if (!formData.smallestVisibleFeature) newErrors.smallestVisibleFeature = 'Smallest Visible Feature is required';

    // Check if there are any contributors
    if (!formData.contributors.length || formData.contributors.some((contributor) => contributor.trim() === '')) {
      newErrors.contributors = 'At least one contributor is required and all fields must have a name';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes and clear errors dynamically
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(e); // Call the passed handleChange to update formData
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined, // Remove error for the specific field being edited
      }));
    }
  };

  // Handle contributor changes
  const handleContributorInputChange = (e, index) => {
    handleContributorChange(e, index); // Update the formData with new contributor value
    const updatedContributors = [...formData.contributors];
    const contributor = updatedContributors[index];

    // If the user starts typing in a contributor field, remove the error for that field
    if (contributor.trim() !== '') {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.contributors; // Clear the general contributor error
        return newErrors;
      });
    }
  };

  // Handle next button click
  const handleNext = () => {
    setIsSubmitting(true);
    console.log(formData);
    if (validate()) {
      setSelectedTopic('Model Details');
    } else {
      toast.error('Please fill in all required fields');
    }
    setIsSubmitting(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="gap-6 p-5">
        {/* Title Field */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter your model name"
            value={formData.title}
            onChange={handleInputChange}
            required
            className={`w-full p-3 border rounded-md focus:outline-none focus:shadow-md ${errors.title ? 'border-red-500' : ''}`}
          />
          {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1 flex justify-between">
            <span>Introduction</span>
            {/* {!formData.description && <span className="text-right text-red-600">*This field is required</span>} */}
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Provide a short introduction to your model (max 200 characters)"
            value={formData.description}
            onChange={handleInputChange}
            maxLength={200}
            required
            className={`w-full p-3 border rounded-md focus:outline-none focus:shadow-md ${errors.description ? 'border-red-500' : ''}`}
          />
          {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
        </div>

        {/* Detailed Description Field */}
        <div className="mb-4">
          <label htmlFor="largeDescription" className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
          <textarea
            id="largeDescription"
            name="largeDescription"
            placeholder="Input a detailed description of your model (approx 600 characters)"
            value={formData.largeDescription}
            onChange={handleInputChange}
            maxLength={600}
            required
            className={`w-full min-h-44 p-3 border rounded-md focus:outline-none focus:shadow-md ${errors.largeDescription ? 'border-red-500' : ''}`}
          />
          {errors.largeDescription && <span className="text-red-500 text-sm">{errors.largeDescription}</span>}
        </div>

        {/* Model Size and Smallest Visible Feature */}
        <div className="flex items-center justify-between mb-4 gap-10">
          {/* Model Size */}
          <div className="flex-1 relative">
            <label htmlFor="size" className="block text-sm font-medium mb-1">Model Size</label>
            <select
              id="size"
              name="size"
              value={formData.size}
              onChange={handleInputChange}
              required
              className={`w-full p-3 border rounded-md focus:outline-none focus:shadow-md ${errors.size ? 'border-red-500' : ''}`}
            >
              <option value="" disabled>Select your model size</option>
              {sizeOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            {errors.size && <span className="text-red-500 text-sm">{errors.size}</span>}
          </div>

          {/* Smallest Visible Feature */}
          <div className="flex-1">
            <label htmlFor="smallestVisibleFeature" className="block text-sm font-medium mb-1">Smallest Visible Feature</label>
            <select
              id="smallestVisibleFeature"
              name="smallestVisibleFeature"
              value={formData.smallestVisibleFeature}
              onChange={handleInputChange}
              required
              className={`w-full p-3 border rounded-md focus:outline-none focus:shadow-md ${errors.smallestVisibleFeature ? 'border-red-500' : ''}`}
            >
              <option value="" disabled>Select an option</option>
              {featureOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            {errors.smallestVisibleFeature && <span className="text-red-500 text-sm">{errors.smallestVisibleFeature}</span>}
          </div>
        </div>

        {/* Contributors */}
        <div className="mb-4">
          <label htmlFor="contributors" className="block text-sm font-medium text-gray-700 mb-1">Contributor/s</label>
          {formData.contributors.map((contributor, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={contributor}
                onChange={(e) => handleContributorInputChange(e, index)}
                placeholder="Contributor"
                className={`w-full p-3 border rounded-md focus:outline-none focus:shadow-md ${errors.contributors ? 'border-red-500' : ''}`}
              />
              <button
                type="button"
                onClick={() => handleRemoveContributor(index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          {errors.contributors && <span className="text-red-500 text-sm">{errors.contributors}</span>}
          <button
            type="button"
            onClick={handleAddContributor}
            className="text-blue-600 flex"
          >
            Add Contributor
          </button>
        </div>

        {/* Next Button */}
        <div className='flex items-end justify-end'>
          <div
            onClick={handleNext}
            className="box cursor-pointer px-4 flex items-center rounded-lg justify-center border-[1px]"
            style={{
              height: '38px',
              width: '30%',
              backgroundColor: colors.differentColor,
              color: colors.mainBackgroundColor,
              borderColor: colors.borderBoxColor,
            }}
          >
            Next
          </div>
        </div>
      </form>
    </div>
  );
}
