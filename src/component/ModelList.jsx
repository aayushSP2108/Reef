import React from 'react'
import { useNavigate } from 'react-router-dom';
import { colors } from '../styles/colors';
import { formatDate } from '../Helper/formatDate';

export default function ModelList({ model }) {
    const navigate = useNavigate();

    const handleDetailsClick = (model) => {
        navigate(`/Models/${model.index}`, { state: { model } }); // Pass model data via state
    };    

    return (
        <div onClick={() => handleDetailsClick(model)} className="box rounded-lg overflow-hidden flex p-3">
            <img src={model?.image} alt={model?.title || 'Default Title'} className="w-48 h-48 object-cover rounded-lg" />
            <div className="p-4 flex-1">
                <div
                    style={{
                        color: colors.mainTextColor,
                        fontWeight: 500,
                        fontSize: 16,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                    className=' flex w-full justify-between'
                >
                    <span>{model?.title || 'Untitled'}</span>
                    <span style={{ color: colors.subTextColor }}>{model?.info?.license || 'No License Info'}</span>
                </div>
                 <h3 style={{ color: colors.subTextColor }}>Added on {formatDate('2024-11-13T08:10:07.730Z')}</h3>
                <p className="text-gray-700 text-sm mt-2">{model.description}</p>
                <div className="mt-2">
                    {model?.info?.tags?.map(tag => (
                        <span key={tag} className=" capitalize inline-block bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-1 mr-1">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}