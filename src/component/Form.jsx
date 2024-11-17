import React, { useState } from 'react';
import FormModelInfo from './FormModelInfo';
import FormGeoreference from './FormGeoreference';
import Form3DModels from './Form3DModels';
import FormPublishingSharing from './FormPublishingSharing';

const Form = ({ toast, loading, handleSubmit, handleChange, handleContributorChange, handleAddContributor, handleRemoveContributor, formData, colors, setFormData }) => {

  const [selectedTopic, setSelectedTopic] = useState('Model Info');

  return (
    <>
      {/* Topic Selection */}
      <div
        className="flex gap-4 border-b-[1px] p-4"
        style={{
          position: 'sticky', top: '70px', zIndex: 998, backgroundColor: colors.mainBackgroundColor,
        }}
      >
        {['Model Info', 'Georeference', 'Publishing Sharing', '3D Model Files'].map((topic) => (
          <div
            key={topic}
            className={`py-1 px-3 rounded-full cursor-pointer`}
            style={{
              backgroundColor: selectedTopic === topic && colors.differentBackgroundColor,
              borderWidth: 1,
              borderColor: selectedTopic !== topic && 'transparent',
            }}
            onClick={() => setSelectedTopic(topic)}
          >
            {topic}
          </div>
        ))}
      </div>

      {/* Conditional Rendering based on Selected Topic */}
      {selectedTopic === 'Model Info' && (
        <FormModelInfo
          toast={toast}
          setSelectedTopic={setSelectedTopic}
          loading={loading}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleContributorChange={handleContributorChange}
          handleAddContributor={handleAddContributor}
          handleRemoveContributor={handleRemoveContributor}
          formData={formData}
          colors={colors}
        />
      )}

      {selectedTopic === 'Georeference' && (
        <FormGeoreference
        toast={toast}
          setSelectedTopic={setSelectedTopic}
          loading={loading}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          formData={formData}
          colors={colors}
          setFormData={setFormData}
        />
      )}

      {selectedTopic === 'Publishing Sharing' && (
        <FormPublishingSharing
        toast={toast}
          setSelectedTopic={setSelectedTopic}
          loading={loading}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          formData={formData}
          handleContributorChange={handleContributorChange}
          handleAddContributor={handleAddContributor}
          handleRemoveContributor={handleRemoveContributor}
          colors={colors}
          setFormData={setFormData}
        />
      )}

      {selectedTopic === '3D Model Files' && (
        <Form3DModels
        toast={toast}
          setSelectedTopic={setSelectedTopic}
          loading={loading}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          formData={formData}
          colors={colors}
        />
      )}
    </>
  );
};

export default Form;
