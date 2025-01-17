// import React from 'react';

// // A component that renders a scrollable div
// const ScrollableDiv = ({ id, content }) => {
//   return (
//     <div className="scroll-box" id={id}>
//       {content.map((line, index) => (
//         <p key={index}>{line}</p>
//       ))}
//     </div>
//   );
// };

// const Models = () => {
//   // Content for both divs
//   const content = Array(100).fill('some line'); // Generate 'some line' * 100

//   return (
//     <div className="w-full flex">
//       <div className="w-1/2 h-screen overflow-y-auto">
//         {/* First scrollable div */}
//         <ScrollableDiv id="div1" content={content} />
//       </div>
//       <div className="w-1/2 h-screen  overflow-y-auto">
//         {/* Second scrollable div */}
//         <ScrollableDiv id="div2" content={content} />
//       </div>
//     </div>
//   );
// };

// export default Models;






// States
const states = [
  { name: "Andhra Pradesh" },
  { name: "Arunachal Pradesh" },
  { name: "Assam" },
  { name: "Bihar" },
  { name: "Chhattisgarh" },
  { name: "Goa" },
  { name: "Gujarat" },
  { name: "Haryana" },
  { name: "Himachal Pradesh" },
  { name: "Jharkhand" },
  { name: "Karnataka" },
  { name: "Kerala" },
  { name: "Madhya Pradesh" },
  { name: "Maharashtra" },
  { name: "Manipur" },
  { name: "Meghalaya" },
  { name: "Mizoram" },
  { name: "Nagaland" },
  { name: "Odisha" },
  { name: "Punjab" },
  { name: "Rajasthan" },
  { name: "Sikkim" },
  { name: "Tamil Nadu" },
  { name: "Telangana" },
  { name: "Tripura" },
  { name: "Uttar Pradesh" },
  { name: "West Bengal" }
];

// Geological Ages
const geologicalAges = [
  { name: "Quaternary" },
  { name: "Neogene" },
  { name: "Paleogene" },
  { name: "Cretaceous" },
  { name: "Jurassic" },
  { name: "Triassic" },
  { name: "Permian" },
  { name: "Carboniferous" },
  { name: "Devonian" },
  { name: "Silurian" },
  { name: "Ordovician" },
  { name: "Cambrian" },
  { name: "Holocene" }
];

const ClasticSedimentology = [
  { name: "Fluvial / Alluvial" },
  { name: "Aeolian" },
  { name: "Lacustrine" },
  { name: "Shallow Marine / Paralic" },
  { name: "Shelf" },
  { name: "Slope" },
  { name: "Basin Floor" }
];

const CarbonateAndEvaporiteSedimentology = [
  { name: "Marine" },
  { name: "Ramp" },
  { name: "Reef" },
  { name: "Evaporite Playa" }
];

const Metamorphic = [
  { name: "Slate" },
  { name: "Phyllite" },
  { name: "Schist" },
  { name: "Gneiss" },
  { name: "Marble" },
  { name: "Quartzite" }
];

const ExtrusiveIgneous = [
  { name: "Pyroclastic Flow Deposit" },
  { name: "Lava Flow Deposit" }
];

const IntrusiveIgneous = [
  { name: "Dyke" },
  { name: "Sill" },
  { name: "Lacolith" }
];

const Structure = [
  { name: "Folds" },
  { name: "Extensional Faults" },
  { name: "Strike Slip Faults" },
  { name: "Inversion Structure" },
  { name: "Joints" },
  { name: "Veins" },
  { name: "Reverse / Thrust Faults" }
];

const Fossils = [];

const QuaternaryGeomorphology = [];


import React, { useEffect, useState, useContext } from 'react';
import ModelNavbar from '../component/ModelNavbar';
import { colors } from '../styles/colors';
import './../styles/Style.css';
import Toolbox from '../component/Toolbox';
import { RxCross2 } from 'react-icons/rx';
import FiltersList from '../component/FiltersList';
import Model from '../component/Model';
import ModelList from '../component/ModelList';
import MapComponent from '../component/MapComponent';
import { GlobalStateContext } from '../../Context/GlobalStateContext';
import { API_BASE_URL, GETALLMODELS_ENDPOINT } from '../../Constants/Constants';
import AllModels from '../data/StoredModels.json';

export default function Models() {
  const { userData, isLogin } = useContext(GlobalStateContext); // Assuming user context is used here
  const [allModels, setAllModels] = useState([]);
  const [storedModels, setStoredModels] = useState([]);
  const [gridMode, setGridMode] = useState('Multi Grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(() => {
    const storedShowFilter = localStorage.getItem('showFilter');
    return storedShowFilter !== null ? JSON.parse(storedShowFilter) : true;
  });
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(null); // Add error state

  const token = localStorage.getItem('token');

  // Fetch all models function
  const fetchAllModels = async () => {
    setLoading(true);
    setError(null);
    try {
      
      const response = await fetch(`${API_BASE_URL}:${GETALLMODELS_ENDPOINT}`, {
        headers: {
          'Authorization': `Bearer ${token}` // Make sure to send token if needed
        }
      });
      const data = await response.json();
      if (response.ok) {
        setAllModels(data.data); // Assuming response contains a 'data' field
      } else {
        setError("Error fetching models: " + data.message);
      }
    } catch (err) {
      setError("Error fetching models");
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if(loading){
      setAllModels(AllModels.StoredModels)
    }
  }, [loading]);


  // Update storedModels whenever allModels changes
  useEffect(() => {
    setStoredModels(allModels);
  }, [allModels]);

  // Fetch models when the component mounts or the token changes
  useEffect(() => {
    fetchAllModels();
  }, [token]);

  useEffect(() => {
    localStorage.setItem('showFilter', JSON.stringify(showFilter));
  }, [showFilter]);

  const toggleFilter = (filter) => {
    setSelectedFilters((prevSelected) => {
      const selectedSet = new Set(prevSelected);
      if (selectedSet.has(filter)) {
        selectedSet.delete(filter);
      } else {
        selectedSet.add(filter);
      }
      return Array.from(selectedSet);
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedFilters([]);
  };

  const filteredModels = storedModels.filter((model) => {
    const stateFilters = selectedFilters.filter(f => f.type === 'states').map(f => f.value);
    const geologicalAgeFilters = selectedFilters.filter(f => f.type === 'geologicalAges').map(f => f.value);
    const clasticSedimentologyFilters = selectedFilters.filter(f => f.type === 'clasticSedimentology').map(f => f.value);
    const carbonateSedimentologyFilters = selectedFilters.filter(f => f.type === 'carbonateAndEvaporiteSedimentology').map(f => f.value);
    const metamorphicFilters = selectedFilters.filter(f => f.type === 'metamorphic').map(f => f.value);

    const stateMatches = stateFilters.length === 0 || stateFilters.includes(model.info.state);
    const geologicalAgeMatches = geologicalAgeFilters.length === 0 || geologicalAgeFilters.includes(model.info.geologicalAge);
    const clasticSedimentologyMatches = clasticSedimentologyFilters.length === 0 || model.info.clasticSedimentology.some(s => clasticSedimentologyFilters.includes(s));
    const carbonateSedimentologyMatches = carbonateSedimentologyFilters.length === 0 || model.info.carbonateAndEvaporiteSedimentology.some(s => carbonateSedimentologyFilters.includes(s));
    const metamorphicMatches = metamorphicFilters.length === 0 || model.info.metamorphic.some(s => metamorphicFilters.includes(s));

    const tagMatches = searchQuery.trim() === '' || model.info.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return stateMatches && geologicalAgeMatches && clasticSedimentologyMatches && carbonateSedimentologyMatches && metamorphicMatches && tagMatches;
  });

  return (
    <div>
      <ModelNavbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {/* <div style={{ marginTop: '70px' }} /> */}
      
      <div style={{ position: 'sticky', top: '70px', zIndex: 9998 }}>
        <Toolbox setShowFilter={setShowFilter} gridMode={gridMode} setGridMode={setGridMode} showFilter={showFilter} />
      </div>

      <div className='flex'>
        {showFilter && (
          <div style={{ borderRightWidth: 1, borderColor: colors.borderMainColor }} className=' hidden md:block sm:w-[24vw] lg:w-[20vw] px-4 pb-32 h-screen overflow-y-auto'>
            {(selectedFilters.length > 0 || searchQuery.length > 0) && (
              <div className='py-4 border-b-2 border-dotted'>
                <div className='flex justify-between items-center'>
                  <span>Applied Filters</span>
                  <span className='cursor-pointer' onClick={clearFilters} style={{ color: colors.subTextColor }}>Clear all</span>
                </div>
                <div className='pt-3 flex flex-wrap gap-2'>
                  {searchQuery.length > 0 && <div
                    style={{
                      color: 'white',
                      borderWidth: 1,
                      borderColor: colors.differentColorBorder,
                      backgroundColor: colors.differentColor,
                    }}
                    className="px-3 py-1 rounded-lg flex items-center"
                  >
                    Search
                    <RxCross2 size={16} className='ml-1 cursor-pointer' onClick={() => setSearchQuery('')} />
                  </div>}
                  {selectedFilters.map((filter, index) => (
                    <div
                      key={index}
                      style={{
                        color: 'white',
                        borderWidth: 1,
                        borderColor: colors.differentColorBorder,
                        backgroundColor: colors.differentColor,
                      }}
                      className="px-3 py-1 rounded-lg flex items-center"
                    >
                      {filter.value}
                      <RxCross2 size={16} className='ml-1 cursor-pointer' onClick={() => toggleFilter(filter)} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <FiltersList title="States" platforms={states} platformstype={'states'} toggleFilter={toggleFilter} selectedFilters={selectedFilters} />
            <FiltersList title="Geological Ages" platforms={geologicalAges} platformstype={'geologicalAges'} toggleFilter={toggleFilter} selectedFilters={selectedFilters} />
            <FiltersList title="Clastic Sedimentology" platforms={ClasticSedimentology} toggleFilter={toggleFilter} selectedFilters={selectedFilters} />
            <FiltersList title="Carbonate And Evaporite Sedimentology" platforms={CarbonateAndEvaporiteSedimentology} toggleFilter={toggleFilter} selectedFilters={selectedFilters} />
            <FiltersList title="Metamorphic" platforms={Metamorphic} toggleFilter={toggleFilter} selectedFilters={selectedFilters} />
          </div>
        )}

        <div className='flex-1 h-screen overflow-y-auto'>

          <div className=' p-4 -z-10 h-96 overflow-hidden'>
            <MapComponent filteredModels={filteredModels} />
          </div>

          <div className={`${gridMode != 'Solo Grid' ? 'p-4' : 'p-8'} flex-grow`}>
          
          {/* Loading Spinner */}
          {loading && <div>Loading models...</div>}
          
          {/* Error Handling */}
          {error && <div className="error">{error}</div>}
            {/* {filteredModels.length === 0 && <span>No models are available with the current settings.</span>} */}

            <div className={`grid grid-cols-1 ${gridMode == 'Multi Grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : ''} gap-4`}>
              {filteredModels.map((model, index) => (
                <div key={index}>
                  {gridMode !== 'Directory' ? (
                    <Model model={model} index={index} gridMode={gridMode} />
                  ) : (
                    <ModelList model={model} index={index} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}