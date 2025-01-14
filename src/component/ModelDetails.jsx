import React, { useState } from 'react';
import {
    statesOptions,
    geologicalAgesOptions,
    ClasticSedimentologyOptions,
    CarbonateAndEvaporiteSedimentologyOptions,
    MetamorphicOptions,
    ExtrusiveIgneousOptions,
    IntrusiveIgneousOptions,
    StructureOptions,
    FossilsOptions,
    QuaternaryGeomorphologyOptions,
    allOptions,
} from '../data/options';
import Multiselect from 'multiselect-react-dropdown';
import { IoMdRemoveCircle } from 'react-icons/io';
import { TbChecks } from 'react-icons/tb';
import { BsBorderWidth } from 'react-icons/bs';

export default function ModelDetails({
    toast,
    setSelectedTopic,
    loading,
    handleSubmit,
    handleChange,
    handleContributorChange,
    handleAddContributor,
    handleRemoveContributor,
    formData,
    setFormData,
    selectedOptions, setSelectedOptions,
    colors,
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle input field changes and clear related errors
    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     handleChange(e);
    // };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (!formData[name].includes(value.trim())) {
            setFormData((prevData) => ({
                ...prevData,
                // [name]: [...formData[name], value],
                [name]: [ value],
            }));
        } else {
            toast.error("This tag is already included.");
        }
    };

    // Handle 'Next' button click: validate form and proceed to the next section
    const handleNext = () => {
        setIsSubmitting(true);
        console.log(formData)
        setSelectedTopic('Georeference');
        setIsSubmitting(false);
    };



    // Handle multi-select option changes
    const handleMultiSelectChange = (selectedList) => {
        setSelectedOptions(selectedList);
    };

    // Remove an option from the selected list
    const handleRemoveOption = (option) => {
        setSelectedOptions(prevOptions => prevOptions.filter(item => item.value !== option.value));
    };

    // Map selected option values to their corresponding available options
    const optionMapping = {
        'GeologicalAgesOptions': geologicalAgesOptions,
        'StatesOptions': statesOptions,
        'ClasticSedimentologyOptions': ClasticSedimentologyOptions,
        'CarbonateAndEvaporiteSedimentologyOptions': CarbonateAndEvaporiteSedimentologyOptions,
        'MetamorphicOptions': MetamorphicOptions,
        'ExtrusiveIgneousOptions': ExtrusiveIgneousOptions,
        'IntrusiveIgneousOptions': IntrusiveIgneousOptions,
        'StructureOptions': StructureOptions,
        'FossilsOptions': FossilsOptions,
        'QuaternaryGeomorphologyOptions': QuaternaryGeomorphologyOptions,
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="gap-6 p-5">
                {/* Multi-select dropdown for selecting options */}
                <div className="flex items-center justify-between mb-8 gap-10">
                    <div className="flex-1 relative">
                        <label htmlFor="size" className="block text-sm font-medium mb-1">
                            Select options related to your model and you're familiar with.
                        </label>
                        <Multiselect
                            style={{
                                multiselectContainer: {
                                    width: '100%',
                                    // backgroundColor: 'black',
                                },
                                searchBox: {
                                    borderRadius: '5px',
                                    border: `1px solid #E4E7EB`,
                                    padding: 10,
                                },
                                chips: {
                                    backgroundColor: colors.differentBackgroundColor,
                                    color: colors.mainTextColor,
                                    borderRadius: '25px',
                                    border: '1px solid #E4E7EB',
                                    // padding: '5px 10px',
                                    margin: '5px',
                                },
                                optionContainer: {
                                    border: '2px solid #E4E7EB',
                                    // backgroundColor: 'red',
                                },
                                optionContainerHover: {
                                    backgroundColor: 'red',
                                },
                                option: {
                                    color: colors.mainTextColor,
                                }
                            }}
                            avoidHighlightFirstOption
                            options={allOptions}
                            selectedValues={selectedOptions}
                            onSelect={handleMultiSelectChange}
                            onRemove={handleMultiSelectChange}
                            displayValue="label"
                            placeholder="Select options"
                            showCheckbox
                            closeIcon='circle'
                            closeOnSelect={false}
                        />
                    </div>
                </div>

                {/* Render select inputs for each selected option */}
                <div className='mb-4 gap-4 grid grid-cols-3'>
                    {selectedOptions.map((val, index) => {
                        // Retrieve the available options for each selected value
                        const options = optionMapping[val.value];

                        return (
                            <div key={index} className="relative">
                                <label htmlFor="size" className="block text-sm font-medium mb-1">
                                    {val.label}
                                </label>
                                <select
                                    id="size"
                                    name={val.value}
                                    value={formData[val.value]|| ""}
                                    onChange={handleInputChange}
                                    required
                                    className={`w-full p-3 border rounded-md focus:outline-none focus:shadow-md`}
                                >
                                    {/* Render the options dynamically based on the selected value */}
                                    <option value="" disabled>Select {val.label}</option>
                                    {options && options.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        );
                    })}
                </div>

                {/* 'Next' button to proceed to the next section */}
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
